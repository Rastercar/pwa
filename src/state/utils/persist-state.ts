import { Ref, watch, WatchOptions, WatchStopHandle } from 'vue';

type ObjOrRef = Ref<unknown> | Record<string, unknown>;

const USED_LOCAL_STORAGE_KEYS: string[] = [];

/**
 * Verifies if a localstorage key wasnt previously registered by this module.
 * note that this doesnt verify if the localstorage key is in use or, just if
 * this module already uses it.
 *
 * This is so way we can know if the user will register 2 watchers for the same
 * key, that would result in buggy behaviour since watchers woud overwrite each
 * other.
 */
function isKeyInUse(key: string) {
  return USED_LOCAL_STORAGE_KEYS.includes(key);
}

/**
 * Persits a state in local storage, its expected that state is a object
 * with values that are reactive objects or a Ref so its changes are tracked
 *
 * @return a object containing the watch stop handlers
 */
export function syncWithLS<T extends Record<string, unknown>>(
  state: T
): Record<keyof T, WatchStopHandle> {
  const watchStopHandlers = {} as Record<keyof T, WatchStopHandle>;

  Object.entries(state).forEach(([key, value]) => {
    if (isKeyInUse(key)) {
      throw new Error(
        `[KEY_IN_USE_ERROR] Cannot persist on LocalStorage, key ${key} is already used`
      );
    }

    USED_LOCAL_STORAGE_KEYS.push(key);

    watchStopHandlers[key as keyof T] = persist(value as ObjOrRef, key);
  });

  return watchStopHandlers;
}

/**
 * Loads a value from localstorage, using the default value as fallback
 */
export function loadFromLS<T>(key: string, defaultValue: T): T {
  const item = localStorage.getItem(key);

  if (!item) return defaultValue;

  try {
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Persists a rective value on localstorage by watching its changes
 */
function persist(
  value: ObjOrRef,
  key: string,
  watcherOptions: WatchOptions = { immediate: true }
): WatchStopHandle {
  const onValueChange = (newVal: ObjOrRef) => {
    localStorage.setItem(key, JSON.stringify(newVal));
  };

  const stopWatching = watch(value, onValueChange, watcherOptions);

  // Instead simply return the WatchStopHandle i need to
  // return a function that releases the key when the used key
  return () => {
    const idx = USED_LOCAL_STORAGE_KEYS.indexOf(key);
    if (idx !== -1) USED_LOCAL_STORAGE_KEYS.splice(idx, 1);

    stopWatching();
  };
}

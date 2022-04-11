import { InjectionKey, Ref } from 'vue'

/** Global injection key for the global google map */
export const MapSymbol: InjectionKey<Ref<google.maps.Map | null>> = Symbol('map') // prettier-ignore

/** Indicates the map **and its tiles** have been loaded */
export const MapWasLoadedSymbol: InjectionKey<Ref<boolean>> = Symbol('mapwasloaded') // prettier-ignore

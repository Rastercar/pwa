/**
 * Augmentation of the global object
 */
declare global {
  interface Window {
    rastercar?: true
  }
}

// we need to export something to declare this file as a loadable module
export {}

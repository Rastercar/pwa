/**
 * Tracker models that are supported by the rastercar plataform.
 */
export const TRACKER_MODELS = ['GT06'] as const

/**
 * TODO: CHANGE ME TO A REAL LIST OF HOMOLOGATED TRACKER MODELS
 *
 * Tracker models that are supported by the rastercar plataform.
 */
export type trackerModel = typeof TRACKER_MODELS[number]

export interface TrackerDescription {
  /**
   * The amount of sim card slots for the tracker model, limits
   * how many sim cards can be associated with the tracker
   */
  simCardSlots: number
}

export const HOMOLOGATED_TRACKER: Record<trackerModel, TrackerDescription> = {
  GT06: {
    simCardSlots: 1,
  },
} as const

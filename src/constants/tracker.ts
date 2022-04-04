/**
 * Tracker models that are supported by the rastercar plataform.
 */
export const TRACKER_MODELS = ['ST310U'] as const

/**
 * TODO: CHANGE ME TO A REAL LIST OF HOMOLOGATED TRACKER MODELS
 *
 * Tracker models that are supported by the rastercar plataform.
 */
export type trackerModel = typeof TRACKER_MODELS[number]

interface TrackerDescription {
  /**
   * The amount of sim card slots for the tracker model, limits
   * how many sim cards can be associated with the tracker
   */
  simCardSlots: number
}

export const HOMOLOGATED_TRACKER: Record<trackerModel, TrackerDescription> = {
  /**
   * https://www.sastracker.com.br/manuais/ST310U_Manual_do_Usuario_Rev.1.1.pdf
   */
  ST310U: {
    simCardSlots: 1,
  },
} as const

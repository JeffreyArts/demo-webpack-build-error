export interface PluginTypes {
  /**
   * Enable or disable plugin
   * @default false
   */
  enabled?: boolean
  authCollection: string
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
}

export interface NewCollectionTypes {
  title: string
}

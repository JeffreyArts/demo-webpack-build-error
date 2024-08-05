import type { Config,Plugin } from 'payload/config'
import type { PluginTypes } from './types'
import { webpackBundler } from '@payloadcms/bundler-webpack'

export const samplePlugin =
(pluginOptions: PluginTypes): Plugin =>
  (incomingConfig) => {
  let config = { ...incomingConfig }
    
  if (!pluginOptions?.enabled) {
    return config
  }
  
  config.admin = {
    ...(config.admin || {}),
    // If you extended the webpack config, add it back in here
    // If you did not extend the webpack config, you can remove this line
    bundler: webpackBundler(),
    webpack: (config) => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
          }
        },
      }
    },
  }
  
  return config
}

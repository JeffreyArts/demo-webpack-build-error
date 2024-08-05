import path from "path"
import { payloadCloud } from "@payloadcms/plugin-cloud"
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { webpackBundler } from "@payloadcms/bundler-webpack"
import { slateEditor } from "@payloadcms/richtext-slate"
import { buildConfig } from "payload/config"

import MyFirstPlugin from "./plugins/my-first-plugin/src"

import AdminUsers from "./collections/AdminUsers"

let cors = [] as Array<string> | "*"
if (process.env.CORS) {
    if (process.env.CORS === "*") {
        cors = process.env.CORS
    } else { 
        process.env.CORS.split(",").map(v => {
            if (typeof v === "string" && typeof cors === "object") {
                cors.push(v)
            }
        })
    }
}

export default buildConfig({
    admin: {
        user: AdminUsers.slug,
        bundler: webpackBundler(),
    },
    editor: slateEditor({}),
    collections: [AdminUsers],
    typescript: {
        outputFile: path.resolve(__dirname, "payload-types.ts"),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
    },
    plugins: [
        payloadCloud(),
        MyFirstPlugin({
            enabled: true,
        })
    ],
    db: mongooseAdapter({
        url: process.env.DATABASE_URI,
    }),
})


/**
 * 
 * Split socketAccess object into 
 * {
 *   socketMethods: {
 *     emit: {
 *        self: (arg, req, res) : <res> {},   // Not possible anonymous
 *        public: (arg, req, res) : <res> {}, // Broadcast to all
 *        room: {
 *          roomName:(arg, req, res) : <res> {} // Broadcast tol all within toom
 *        }
 *     }
 *   }
 * }
 * 
 * Create middleware flow for sockets
 * - To authenticate
 * 
 * 
 */

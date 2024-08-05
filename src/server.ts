import express, { text } from "express"
import payload from "payload"
import "dotenv/config"
import { createServer } from "node:http"
const app = express()


app.get("/", (_, res) => {
    res.redirect("/admin")
})

const start = async () => {
    // Initialize Payload
    await payload.init({
        secret: process.env.PAYLOAD_SECRET,
        express: app,
        onInit: async () => {
            payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
        },
    })
    const httpServer = createServer(app)
    httpServer.listen(process.env.HTTP_PORT || 3000)
}

// Add your own express routes here
    

start()

import express from 'express'
import * as http from 'http'
import {Client} from 'pg'
import * as WebSocket from 'ws'
import * as dotenv from 'dotenv'

// load .env file
dotenv.config();

const app = express()
const server = http.createServer(app)

const wss = new WebSocket.Server({server})

if (!process.env.DATABASE_URL) {
    throw Error('DATABASE_URL is not defined in .env file')
}

// make it process env
const client = new Client({
    connectionString: process.env.DATABASE_URL
})

wss.on('connection', (ws) => {
    console.log('Client has been connected')

    client.connect(() => {
        client.on('notification', (msg) => {
            switch (msg.channel) {
                case 'update_quiz_status':
                    ws.send(
                        JSON.stringify({
                            data: JSON.parse(msg.payload || ''),
                            message: 'quizStatusUpdate'
                        })
                    )
                    break
            }
        })

        client.query('LISTEN update_quiz_status')
    })
})

server.listen(5001, () => {
    console.log(' Server listens on 5001')
})

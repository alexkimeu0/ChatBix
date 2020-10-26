import express from 'express'
import path from 'path'
import http from 'http'
import socketio from 'socket.io'



const app = express()
const __dirname = path.resolve();
const server = http.createServer(app)
const io = socketio(server);


// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

const PORT = 3000 || process.env.PORT

// Run when client connects
io.on('connection', socket => {

    // Welcome new user
    socket.emit('message', 'Welcome to ChatBix!')

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat')

    // Run when user disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')
    })

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg)

    })

})

server.listen(PORT, () => {
    console.log(`Running on 127.0.0.1:${PORT}`)
})


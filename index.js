let express = require('express')
let http = require('http')
let logger = require('morgan')


let app = express()
app.set('port', 3000)
app.use(logger('dev'))
app.use(express.static("static"))

let serve = http.createServer(app)
let io = require('socket.io')(serve)

serve.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'))
})


io.on('connection', (socket) => {
    console.log("A user has connected")
    socket.on('disconnect', () => {
        console.log("User disconnected")
    })

    socket.on('message', (data) => {
        console.log(data)
        data.action = 'recive'
        data.timestamp = Math.round((new Date()).getTime() / 1000)
        io.sockets.emit('message', data)
    })
})
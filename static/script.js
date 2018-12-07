new Vue({
    el: '#app',
    data: {
        socket: io(),

        //name: prompt("Vad heter du?"),
        name: "Alvar",
        input: '',
        messages: []
    },
    created() {
        this.socket.on('message', (data) => {
            if (data.action == 'recive') {
                this.messages.push({ message: data.message, 
                                     name: data.name, 
                                     timestamp: data.timestamp, 
                                     //own: Math.random() >= 0.5
                                    own: data.name == this.name })
                console.log(this.messages[this.messages.length-1])

                if (this.name == data.name) {
                    this.scrollBottom()
                }
            }
        })

        this.sendMessage("hi")
        this.sendMessage("hi")
        this.sendMessage("hi")
        this.sendMessage("hi")
        this.sendMessage("hi")
        this.sendMessage("hi")
        this.sendMessage("hi")

    },
    methods: {
        prevent() {

        },
        onEnterClick() {
            this.sendMessage(this.input)
        },
        sendMessage(msg) {
            let data = {
                'action': 'send',
                'name': this.name,
                'message': msg
            }
            this.socket.emit('message', data)
            this.input = ""
        },
        scrollBottom() {
            window.scrollTo(0,document.body.scrollHeight);
        }
      }
})









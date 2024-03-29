import React from "react";
import io from "socket.io-client";


class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: []
        };
        function runScript(e) {
            //See notes about 'which' and 'key'
            if (e.keyCode == 13) {
                var tb = document.getElementById("scriptBox");
                eval(tb.value);
                return false;
            }
        }
        

        this.socket = io('localhost:3000');

        this.socket.on('RECEIVE_MESSAGE', function (data) {
            addMessage(data);
        });

        this.socket.on('TA_MERE', function () {
            petitemere('oui mon fils');
        });
        
        const petitemere = data => {
            console.log(data);
            this.setState({ messages: [...this.state.messages, data] });
            console.log(this.state.messages);
        };


        const addMessage = data => {
            console.log(data);
            this.setState({ messages: [...this.state.messages, data] });
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            this.setState({ message: '' });
            

        }
        _handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                console.log('do validate');
            }
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Général</div>
                                <hr />
                                <div className="messages">
                                    {this.state.messages.map(message => { //
                                        return (
                                            <div>{message.author}: {message.message}</div>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="card-footer">
                                <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })} className="form-control" />
                                <br />
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
                                <br />
                                <button onKeyPress={this.sendMessage(), this._handleKeyDown()} className="btn btn-primary form-control">Envoyer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
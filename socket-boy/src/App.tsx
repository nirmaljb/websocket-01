import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [socket, setSocket] = useState<null | WebSocket>(null);
    const [message, setMessage] = useState<null | string>("");
    const [input, setInput] = useState("");

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = () => {
            console.log('Connection established');
            setSocket(socket);
        }
        socket.onmessage = (message) => {
            console.log('Message recieved : ', message);
            setMessage(message.data);
        }

        return () => {
            socket.close();
        }
    }, [])

    if(!socket) {
        return <h1>Establishing Connection</h1>
    }


    return <div>
        <div>
            <input type="text" onChange={(e) => setInput(e.target.value)} />
            <button onClick={() => {
                socket.send(input);
            }}>Press here</button>
            </div>
        {message}
    </div>
}

export default App

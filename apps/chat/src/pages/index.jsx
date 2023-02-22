import Chatbot from '../components/Chatbot';
import { Meun } from '../components/menu/menu';
import { useEffect } from 'react';
import { io } from "socket.io-client";

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function HomePage() {
    useEffect(() => {
        const sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
            localStorage.setItem('sessionId', guid())
        }

        const uid = localStorage.getItem('uid');
        if (!uid) {
            localStorage.setItem('uid', guid())
        }

        const socketClient = io("/", {
            path: "/api/socketio",
               // transports: ["websocket"],
        });

        socketClient.emit("join", {uid});

        socketClient.on("connect", () => {
            console.log("socket 连接成功");
        });

        socketClient.on("new_topic", (data) => {
            console.log("new_topic", data.text);
        });

    }, [])

    return (
        <>
            <div className='home-container'>
                <Meun/>
                <div className='my-title-container'>
                    <div className='my-title-animate'>ChatGpt Demo</div>
                    <div className='my-title'>ChatGpt Demo</div>
                </div>
                
                <Chatbot />
            </div>
            <div style={{textAlign:"center", color:"#adadad", fontSize:"12px"}}>
                这是一个chatGPT的demo，由于经费有限，连续对话太多或刷新网页可能会导致她忘了您哦~
            </div>
        </>
    );
}

export default HomePage;
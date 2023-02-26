import { Meun } from '../components/menu/menu';
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom'
import Head from 'next/head'



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

        let uid = localStorage.getItem('uid');
        if (!uid) {
            uid = guid();
            localStorage.setItem('uid',uid)
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

    const [isViewTips, setIsViewTips] = useState(false);

    const startPonit = useRef();
    const endPonit = useRef();

    function handleOnTouchMove(e){
       if(startPonit.current - e.changedTouches[0].clientY >= 100){
          setIsViewTips(true);
       }
    }

    function handleOnTouchEnd(e){
        // console.log('handleOnTouchEnd', e.changedTouches[0].clientY);
        endPonit.current = e.changedTouches[0].clientY;
        setIsViewTips(false);
    }

    function handleOnTouchStart(e){
        startPonit.current = e.changedTouches[0].clientY;
        // console.log('handleOnTouchStart', e.changedTouches[0].clientY);
    }

    return (
        <>
           <Head>
           <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
           </Head>
           <div className='clear-message' style={{display: isViewTips? 'block': 'none'}}>Loose will clear message</div>
            <div className='home-container' onTouchStart={handleOnTouchStart} onTouchMove={handleOnTouchMove} onTouchEnd={handleOnTouchEnd}>
                {/* <Meun/> */}
                {/* <div className='my-title-container'>
                    <div className='my-title-animate'>ChatGpt Demo</div>
                    <div className='my-title'>ChatGpt Demo</div>
                </div> */}
            </div>
            <div className='my-tips'>
                这是一个chatGPT的demo，由于经费有限，连续对话太多或刷新网页可能会导致她忘了您哦~
            </div>
        </>
    );
}

export default HomePage;
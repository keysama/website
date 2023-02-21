import Chatbot from '../components/Chatbot';
import { Meun } from '../components/menu/menu';
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
        // const sessionId = localStorage.getItem('sessionId');
        // if (sessionId) {
            localStorage.setItem('sessionId', guid())
        // }
    }, [])

    const [isViewTips, setIsViewTips] = useState(false);

    function handleOnTouchMove(e){
       setIsViewTips(true);
    }

    function handleOnTouchEnd(){
        setIsViewTips(false);
    }

    return (
        <>
           <Head>
           <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
           </Head>
           <div className='clear-message' style={{display: isViewTips? 'block': 'none'}}>Loose will clear message</div>
            <div className='home-container' onTouchMove={handleOnTouchMove} onTouchEnd={handleOnTouchEnd}>
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
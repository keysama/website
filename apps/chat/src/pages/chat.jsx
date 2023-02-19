import Chatbot from '../components/Chatbot';
import { useEffect } from 'react';

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

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <Chatbot />
            </div>
            <div style={{textAlign:"center", color:"#adadad", fontSize:"12px"}}>
                这是一个chatGPT的demo，由于经费有限，连续对话太多或刷新网页可能会导致她忘了您哦~
            </div>
        </>
    );
}

export default HomePage;
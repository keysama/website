import axios from 'axios';

export async function sendMessage(msg){
    const sessionId = localStorage.getItem('sessionId');
    const lastId = localStorage.getItem('lastId')
    const res= await axios.post('/api/chat', {
        text: msg,
        sessionId: sessionId,
        id: lastId
    });
    localStorage.setItem('lastId', res.data.id)

    return res.data.result;
}


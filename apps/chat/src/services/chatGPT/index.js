import axios from 'axios';

export async function sendMessage(message){
    const sessionId = localStorage.getItem('sessionId');
    const messageId = localStorage.getItem('messageId');
    const conversationId = localStorage.getItem('conversationId');
    const uid = localStorage.getItem('uid');
    const res= await axios.post('/api/chat', {
        text: message,
        sessionId: sessionId,
        messageId: messageId,
        conversationId:conversationId,
        uid: uid
    },{ timeout: 5 * 60 * 1000 });

    localStorage.setItem('sessionId', res.data.sessionId)
    localStorage.setItem('messageId', res.data.messageId)
    localStorage.setItem('conversationId', res.data.conversationId)

    return res.data.result;
}


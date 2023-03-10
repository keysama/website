import axios from 'axios';
import { START_SIGN, END_SIGN } from '@keysama/constant';

function defaultHandle(value) {
    console.log("value:", value)
}

class StreamResolver {
    constructor(callback) {
        this.mode = 'before';
        this.before = '';
        this.after = '';
        this.callback = callback;
    }

    changeMode(mode) {
        this.mode = mode;
    }

    appendText(text) {
        this[this.mode] += text;
        this.callback({ type: this.mode, text: text })
    }

    input(text = '') {
        let newText = text;
        if (this[this.mode]) {
            newText = text.replace(this[this.mode], '');
        }

        this.splitSign(newText);
    }

    splitSign(text) {
        if (text.startsWith(START_SIGN)) {
            const [, b] = text.split(START_SIGN);
            this.input(b);
            return;
        } else if (text.includes(END_SIGN) && this.mode !== 'after') {
            const [a, b] = text.split(END_SIGN);
            this.appendText(a);
            this.mode = 'after';
            this.appendText(b);
            return;
        } else {
            this.appendText(text);
        }
    }
}

export async function sendMessage(message, handle = defaultHandle) {
    const sessionId = localStorage.getItem('sessionId');
    const messageId = localStorage.getItem('messageId');
    const conversationId = localStorage.getItem('conversationId');
    const uid = localStorage.getItem('uid');
    let targetMessage = '';
    let reciveString = '';
    const streamResolver = new StreamResolver(({ type, text }) => {
        if (type === 'before') {
            targetMessage += text;
            handle(text)
        } else {
            reciveString += text;
        }
    });

    function onDownloadProgress(progressEvent) {
        const { event } = progressEvent;
        const { currentTarget } = event;
        const chunk = currentTarget.responseText;
        streamResolver.input(chunk);
    }

    let res = null;

    try {
        await axios.post('http://localhost:3000/chat', {
            text: message,
            sessionId: sessionId,
            messageId: messageId,
            conversationId: conversationId,
            uid: uid
        }, { timeout: 5 * 60 * 1000, onDownloadProgress });

        res = JSON.parse(reciveString);
    } catch (e) {
        console.log('err:', e)
    }

    if (res) {
        localStorage.setItem('sessionId', res.sessionId)
        localStorage.setItem('messageId', res.messageId)
        localStorage.setItem('conversationId', res.conversationId)
    }

    return targetMessage;
}


import React from 'react';
import { sendMessage } from '../../services/chatGPT';

function ActionProvider(props) {
    const { createChatBotMessage, setState, children } = props;

    // console.log("props",props)

    function handleMessage(message) {
        setState((prev) => ({
            ...prev,
            loading: true,
        }));
        // const botMessage = createChatBotMessage('Hello. Nice to meet you.');
        (async () => {
            const res = await sendMessage(message);
            // console.log(res)
            const botMessage = createChatBotMessage(res);

            setState((prev) => ({
                ...prev,
                loading: false,
                messages: [...prev.messages, botMessage],
            }));
        })();
    }

    function waiting(message) {
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, '别着急，我还在回复上一句话'],
        }));
    }

    // Put the handleHello function in the actions object to pass to the MessageParser
    return (
        <div>
            {React.Children.map(children, (child) =>
                React.cloneElement(child, {
                    actions: {
                        handleMessage,
                        waiting,
                    },
                }),
            )}
        </div>
    );
}

export default ActionProvider;

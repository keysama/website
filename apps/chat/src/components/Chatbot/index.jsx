import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import Chatbot from 'react-chatbot-kit';
import { useState } from 'react';

function MyChatbot() {

  const [loading, setLoading] = useState(false);

  function wait5sec(){
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }

  // console.log("Chatbot", Chatbot)
  return (
    <Chatbot
      config={config}
      headerText={<div className='message-header'><div>May Queen Nyan-Nyan</div><button className='reset-button'>Reset</button></div>}
      messageParser={MessageParser}
      actionProvider={ActionProvider}
      validator={(props) => {
        if(props && !loading && props.length <= 200){
          wait5sec();
          return true;
        }else{
          return false;
        }
      }}
    />
  );
}

export default MyChatbot

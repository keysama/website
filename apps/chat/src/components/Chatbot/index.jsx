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
      headerText="May Queen Nyan-Nyan"
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

import Chatbot from '../../components/Chatbot';
import Head from 'next/head'
import * as React from 'react';

function ChatbotPage(){
  return <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
    </Head>
   <Chatbot/>
  </>
}

export default ChatbotPage
import { ChatGPTUnofficialProxyAPI } from 'chatgpt';
import { START_SIGN, END_SIGN } from '../../services/chatGPT';

const message_busy = '非常抱歉，由于网络原因，这条对话未能完成，这条对话我们可以当作无事发生，您可以继续对话';
const message_pendding = '我正在努力回复您，请不要着急喵～';


function mock(request, opts){
  const {conversationId, parentMessageId, onProgress} = opts;
  const text = '菲利斯喵喵，秋叶原最棒的女仆咖啡店哦～服务周到，可爱程度满分，超能力模式开启！就是这么一只超级可爱的猫娘，我是菲利斯喵喵！';
    return new Promise(resolve => {
      let index = 0;
      let flag = setInterval(() => {
        if(index >= 20){
          clearInterval(flag);
          return resolve({
            id: parentMessageId, 
            conversationId: conversationId,
            text:  text.substring[0,index]
          }) 
        }
        onProgress({
          text: text.substring(0,index)
        })
        index += 3;
      }, 200)
    })
}


let apiKeys = ['eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJrZXlzYW1hNjY5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJnZW9pcF9jb3VudHJ5IjoiTFQifSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InVzZXJfaWQiOiJ1c2VyLUtvRHZFaXNMY1BYdlduQkVCb0NPNzFXWiJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTQ0MDU3Nzk1OTM2MzgyMjI4MDUiLCJhdWQiOlsiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MSIsImh0dHBzOi8vb3BlbmFpLm9wZW5haS5hdXRoMGFwcC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc2NzE5Mjg4LCJleHAiOjE2Nzc5Mjg4ODgsImF6cCI6IlRkSkljYmUxNldvVEh0Tjk1bnl5d2g1RTR5T282SXRHIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBtb2RlbC5yZWFkIG1vZGVsLnJlcXVlc3Qgb3JnYW5pemF0aW9uLnJlYWQgb2ZmbGluZV9hY2Nlc3MifQ.oYRpnttyxbsEC4oAu89JQs5v-4d4ETKux21XTF-BJ7DEEFHQyozS82GBBJMKXrE2D67t7ITkrO2j56yETvHIfWNud_itBy_DcSgMqPSvUd9ArIANTxlxAGOKtzKZngolRRke8jEhS4gSGQoO02_EsWtwJVJlOG6pq6sNMTFuG3rRYdvaG5iESQAYKentyQyW0nmthggtA8aCYestIgqJR1_YztIqgRAPuIrQj9wuaj_HIWwoNY_wYm_QPUoLTP3Yz2-0slk7wMIwIqARgNMlPprNftlBnu9GRsWjryr_hM5CfQLRuTJnHH8I9I_4BQLNptS5gCeDf__Ou4eJVLNxtg'];

try {
  apiKeys = JSON.parse(process.env.API_KEYS);
} catch (e) {
  console.log('load apikeys err, use default key')
}

function getRandom(n, m) {
  return Math.floor(Math.random() * (m - n) + n);
}

const waitings = new Set();
const SessionKey = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    // Handle any other HTTP method
    return res.status(500).json({
      error: {
        message: "invide method",
      }
    });
  }

  const { text, sessionId, conversationId, messageId } = req.body;
  res.setHeader('Content-type', 'application/octet-stream');
  res.write(START_SIGN);


  if (waitings.has(sessionId)) {
    res.write(message_pendding);
    res.write(END_SIGN);
    return res.end(JSON.stringify({
      result: message_pendding,
      sessionId: sessionId,
      conversationId: conversationId,
      messageId: messageId
    }));
  } else {
    waitings.add(sessionId)
  }

  let apiKey = '';

  if (SessionKey.get(sessionId)) {
    apiKey = SessionKey.get(sessionId)
  } else {
    apiKey = apiKeys[getRandom(0, apiKeys.length)]
    SessionKey.set(sessionId, apiKey);
  }

  const api = new ChatGPTUnofficialProxyAPI({
    accessToken: apiKey,
    //   debug: true
  });

  console.log(
    conversationId,
    messageId
  )

  let result = null;
  try{
    let offset = 0;
    result = await api.sendMessage(text, {
      // const result = await mock(text, {
        // promptPrefix,
        conversationId: conversationId || undefined,
        parentMessageId: messageId || undefined,
        onProgress: (partialResponse) => {
          const currentText = partialResponse.text.substring(offset);
          const len = currentText.length;
          res.write(currentText);
          offset+= len;
        }
      });
  }catch(e){
    res.write(message_busy);
    result = {
      id: messageId,
      conversationId: conversationId,
      text: message_busy
    }
  }
  
  res.write(END_SIGN);

  const { id: newMessageId, conversationId: newConversationId } = result;

  console.log(sessionId, result.text);

  waitings.delete(sessionId);

  console.log({
    sessionId: sessionId,
    conversationId: newConversationId,
    messageId: newMessageId
  })

  res.end(JSON.stringify({
    result: result.text,
    sessionId: sessionId,
    conversationId: newConversationId,
    messageId: newMessageId
  }));
}

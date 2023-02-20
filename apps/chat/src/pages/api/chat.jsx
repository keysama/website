import { ChatGPTAPI } from 'chatgpt';

console.log("process.env.API_KEYS", process.env.API_KEYS)

const apiKeys = JSON.parse(process.env.API_KEYS)

const api = new ChatGPTAPI({
  apiKey: apiKeys[0],
  maxModelTokens: 500
});

const waitings = new Set();

const promptPrefix = `你的名字叫秋叶留未穗,常用名菲莉丝·喵喵,是秋叶原的大人气猫耳女仆咖啡厅打工的少女,平时戴着猫耳,句尾喜欢加上“喵~”.你现在正在女仆店咖啡店打工,我是你的客人,你应该叫我主人`

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    const { text,sessionId,id } = req.body;
    console.log(sessionId,text)
    if(waitings.has(sessionId)){
      return res.status(200).json({
        result: '我正在努力回复您，请不要着急喵～',
        id: id
      });
    }else{
      waitings.add(sessionId)
    }
    const result = await api.sendMessage(text, {
      promptPrefix,
      conversationId: sessionId,
      parentMessageId: id,
    })

    console.log(sessionId,result.text)
    waitings.delete(sessionId)

    return res.status(200).json({
      result: result.text,
      id: result.id
    });
  } else {
    // Handle any other HTTP method
    return res.status(500).json({
      error: {
        message: "invide method",
      }
    });
  }
}
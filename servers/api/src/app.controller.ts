import { Controller, Post, Body, Res, Header} from '@nestjs/common';
import { ChatMessage } from '../typings/types';

// import { START_SIGN, END_SIGN} from 'keysama-constant';
import { AppService } from './app.service';
import { Response } from 'express';

const message_busy = '非常抱歉，由于网络原因，这条对话未能完成，这条对话我们可以当作无事发生，您可以继续对话';
const message_pendding = '我正在努力回复您，请不要着急喵～';

type ChatResponse = {
  result: string,
  sessionId: string,
  conversationId: string,
  messageId: string
}

type ChatRequest = {
  text: string,
  conversationId: string,
  sessionId?: string,
  messageId?: string,
  uid?: string
}

function mock(request, opts):Promise<ChatMessage>{
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
            text:  text.substring[index],
            role: 'assistant'
          }) 
        }
        onProgress({
          text: text.substring(0,index)
        })
        index += 3;
      }, 200)
    })
}


@Controller('chat')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  @Header('Content-type', 'application/octet-stream')
  async index(@Body() body: ChatRequest, @Res() res: Response): Promise<any>{
    const { text,conversationId,messageId,sessionId } = body;
    const keysamaConstant = await import('@keysama/constant');
    // const { ChatGPTUnofficialProxyAPI } =  await import('chatgpt');
    console.log("keysamaConstant", keysamaConstant);

    // console.log("ChatGPTUnofficialProxyAPI", ChatGPTUnofficialProxyAPI)
    let finalResponse: ChatResponse = {
      result: '',
      sessionId,
      conversationId,
      messageId
    }

    
    let result:ChatMessage = null;
    res.write('START_SIGN');
    try{
      let offset = 0;
      result = await mock(text, {
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
        text: message_busy,
        role: 'assistant'
      }
    }

    finalResponse.result = result.text;
    finalResponse.messageId = result.id;
    finalResponse.conversationId = result.conversationId;

    res.write('END_SIGN');
    return res.end(JSON.stringify(finalResponse))
  }
}

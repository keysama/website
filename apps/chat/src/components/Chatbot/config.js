import { createChatBotMessage } from 'react-chatbot-kit';

const botName = '菲利斯 喵喵';
const helloWorld = `菲利斯喵喵，秋叶原最棒的女仆咖啡店哦～服务周到，可爱程度满分，超能力模式开启！就是这么一只超级可爱的猫娘，我是菲利斯喵喵！`;

function ChatbotAvatar(){
  return (
    <img style={{width:"40px", height:"40px", borderRadius:"50%",display:"block",marginRight:"23.5px"}} src="https://sci-adv.cc/images/4/42/%E5%A4%B4%E5%83%8F-%E8%8F%B2%E8%8E%89%E4%B8%9D%E5%96%B5%E5%96%B5.jpg" />
  )
}

const config = {
  initialMessages: [createChatBotMessage(helloWorld)],
  botName: botName,
  headerText: "asd",
  state: {
    loading: false
  },
  customComponents: {
    botAvatar: () => <ChatbotAvatar />
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: '#000000',
    },
    chatButton: {
      backgroundColor: '#66ccff',
      fontSize:'50px'
    },
  },
};
export default config;
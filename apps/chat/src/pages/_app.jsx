import 'react-chatbot-kit/build/main.css'
import '../customCss/customCss.css';
import '@nutui/nutui-react/dist/style.css'
import { Tabbar, TabbarItem } from '@nutui/nutui-react';
import Link from 'next/link'
import { Icon } from '@nutui/nutui-react';



export default function MyApp({ Component, pageProps }) {
    return  <>
        <Component {...pageProps} />
        <Tabbar bottom onSwitch={(child, idx) => {console.log(idx)}} className="tabbar">
           <TabbarItem tabTitle="登录" icon="add" />
           <TabbarItem tabTitle="注册" icon="edit" />
           <Link href="/chatBot" className='nut-tabbar-item'>
              <TabbarItem tabTitle="聊天" icon="dongdong"></TabbarItem>
            </Link>
           <TabbarItem tabTitle="我的" icon="my" />
       </Tabbar>
    </>
}
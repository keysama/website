import 'react-chatbot-kit/build/main.css';
import '../customCss/customCss.css';
import '@nutui/nutui-react/dist/style.css';
import { Tabbar, TabbarItem, Icon } from '@nutui/nutui-react';
import Link from 'next/link';
import * as React from 'react';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }) {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const router = useRouter();

    return (
        <>
            <Component {...pageProps} />
            <Tabbar
                activeVisible={activeIndex}
                bottom
                onSwitch={(child, id) => {
                    if (id === 2) {
                        router.push('/chatBot');
                    }
                    setActiveIndex(id);
                }}
                className="tabbar"
            >
                <TabbarItem
                    tabTitle="登录"
                    icon="add"
                />
                <TabbarItem
                    tabTitle="注册"
                    icon="edit"
                />
                <TabbarItem
                    tabTitle="聊天"
                    icon="dongdong"
                ></TabbarItem>
                {/* <Link href="/chatBot"><TabbarItem tabTitle="聊天" icon="dongdong"></TabbarItem></Link> */}
                <TabbarItem
                    tabTitle="我的"
                    icon="my"
                />
            </Tabbar>
        </>
    );
}

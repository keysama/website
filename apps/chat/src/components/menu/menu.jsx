import * as React from 'react';

export function Meun(){
   
   const [isOpen, setIsOpen] = React.useState(false);
    return <div className='my-menu'>
        <div onClick={() => {
            setIsOpen(!isOpen);
        }}>Meun</div>
        <div className='my-menu-list' style={{display: isOpen? 'block': 'none'}}>
            <div className='my-menu-list-item'>登录</div>
            <div className='my-menu-list-item'>注册</div>
        </div>
    </div>
}

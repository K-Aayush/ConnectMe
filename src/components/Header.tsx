import React from 'react'

import { ChatMenu, Menu } from '.';

const Header = () => {
    return (
        <div className="flex items-center justify-between z-[100] mx-2 mt-2">
                <ChatMenu />

            <img
                className="object-contain h-[50px]"
                src="/Image/connectme logo.png"
                alt='Logo'
            />

            <Menu />
        </div>
    )
}

export default Header
import React from 'react'

import { ChatMenu, Menu } from '.';

const Header = ({ user }: any) => {
    return (
        <div className="flex items-center justify-between z-[100] mx-2">
            <ChatMenu user={user} />

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
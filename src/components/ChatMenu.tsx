"use client"

import { useState } from 'react'
import { LuMessagesSquare } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { MatchesDisplay, ChatDisplay } from '.';

const ChatMenu = () => {
    const [messageMenu, setMessageMenu] = useState<boolean>(false)

    return (
        <div>
            <div onClick={() => setMessageMenu(true)} className="cursor-pointer p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full">
                <LuMessagesSquare size={30} />
            </div>

            <div className={`fixed h-full w-screen bg-black/50 backdrop-blur-sm top-0 right-0 z-10 -translate-x-full transition-all ${messageMenu && "translate-x-0"}`}>
                <div className="bg-white flex-col absolute left-0 top-0 h-screen p-4 gap-8 z-50 sm:w-2/3 md:w-1/3 w-full">
                    <div onClick={() => setMessageMenu(false)} className="mb-6 text-3xl cursor-pointer rounded-full hover:bg-gray-100 w-fit p-3">
                        <RxCross1 />
                    </div>
                    <div className="flex gap-2 mb-2">
                        <img src="\Image\connectme logo.png" alt="" className="rounded-full w-10" />
                        <h3>Username</h3>
                    </div>
                    <div className="flex gap-2 mb-2 text-center items-center">
                        <button>Matches</button>
                        <button>Chat</button>
                    </div>

                    <MatchesDisplay />

                    <ChatDisplay />
                </div>
            </div>
        </div>
    )
}

export default ChatMenu
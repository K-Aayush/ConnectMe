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
                <div className="bg-white flex-col absolute left-0 top-0 h-screen gap-8 z-50 sm:w-2/3 md:w-1/3 w-full">
                    <div className="bg-gradient-to-tr from-[#e90b78] to-[#f06e52] p-4 mb-4 shadow-md">
                        <div onClick={() => setMessageMenu(false)} className="text-3xl cursor-pointer rounded-full hover:bg-gray-100 w-fit p-3 flex justify-end">
                            <RxCross1 />
                        </div>
                        <div className="flex items-center text-center justify-center mb-6 gap-4">
                            <img src="\Image\dating.jpg" alt="" className="rounded-full w-[40px] h-[40px] overflow-hidden" />
                            <h3 className="text-2xl font-semibold">Username</h3>
                        </div>
                    </div>
                    <div className="flex gap-2 mb-2 mx-auto">
                        <button className="border-b-2 border-red-600 text-lg m-[2px] p-[10px] disabled:border-gray-400">Matches</button>
                        <button className="border-b-2 border-red-600 text-lg m-[2px] p-[10px] disabled:border-gray-400">Chat</button>
                    </div>

                    <MatchesDisplay />

                    <ChatDisplay />
                </div>
            </div>
        </div>
    )
}

export default ChatMenu
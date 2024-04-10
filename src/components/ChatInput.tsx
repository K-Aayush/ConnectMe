"use client"

import { useState } from 'react'
import { BiSend } from "react-icons/bi";

const ChatInput = () => {
    const [textArea, setTextArea] = useState()
    return (
        <div className="relative">
            <textarea className="ml-6 px-2 py1 resize-none rounded-md border border-gray-500 w-[90%]" value={textArea} onChange={(e: any) => setTextArea(e.target.value)} />
            <div className="absolute top-3 right-8 text-red-400 hover:text-red-600">
                <button>
                    <BiSend size={25} />
                </button>
            </div>
        </div>
    )
}

export default ChatInput
"use client"

import axios from 'axios';
import { useState } from 'react'
import { BiSend } from "react-icons/bi";

const ChatInput = ({ user, clickedUser, getUserMessages, getClickedUserMessages }: any) => {
    const [textArea, setTextArea] = useState<any>(null)
    const userId = user?.user_id
    const clickUserId = clickedUser?.user_id

    const addMessage = async () => {
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: userId,
            to_userId: clickUserId,
            message: textArea
        }

        try {
            await axios.post('http://localhost:8000/message', { message })
            getUserMessages()
            getClickedUserMessages()
            setTextArea("")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="relative">
            <textarea className="ml-6 px-2 py-auto resize-none rounded-md border border-gray-500 w-[90%]" value={textArea} onChange={(e: any) => setTextArea(e.target.value)} />
            <div className="absolute top-3 right-8 text-red-400 hover:text-red-600">
                <button onClick={addMessage}>
                    <BiSend size={25} />
                </button>
            </div>
        </div>
    )
}

export default ChatInput
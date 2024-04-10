"use client"
import { useEffect, useState } from 'react'
import { Chat, ChatInput } from '.'
import axios from 'axios'

const ChatDisplay = ({ user, clickedUser }: any) => {
    
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id
    const [userMessages, setUserMessages] = useState(null)

    const getUserMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: { userId: userId, correspondingUserId: clickedUserId }
            })
            setUserMessages(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserMessages()
    }, [userMessages])

    console.log(userMessages, "usermessage")

    return (
        <>
            <Chat />
            <ChatInput />
        </>
    )
}

export default ChatDisplay
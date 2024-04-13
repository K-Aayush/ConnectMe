"use client"
import { useEffect, useState } from 'react'
import { Chat, ChatInput } from '.'
import axios from 'axios'
import { ImSpinner2 } from 'react-icons/im'

const ChatDisplay = ({ user, clickedUser }: any) => {

    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id
    const [userMessages, setUserMessages] = useState<any>(null)
    const [clickedUserMessages, setClickedUserMessages] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true);

    const getUserMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: { userId: userId, correspondingUserId: clickedUserId }
            })
            setUserMessages(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const getClickedUserMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: { userId: clickedUserId, correspondingUserId: userId }
            })
            setClickedUserMessages(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserMessages()
        getClickedUserMessages()
    }, [])

    const messages: any = []

    userMessages?.forEach((message: { message: any; timestamp: any }) => {
        const formattedmessage: any = {}
        formattedmessage["name"] = user?.first_name
        formattedmessage["photo"] = user?.photo
        formattedmessage["message"] = message?.message
        formattedmessage["timestamp"] = message?.timestamp
        messages.push(formattedmessage)
    })

    clickedUserMessages?.forEach((message: { message: any; timestamp: any }) => {
        const formattedmessage: any = {}
        formattedmessage["name"] = clickedUser?.first_name
        formattedmessage["photo"] = clickedUser?.photo
        formattedmessage["message"] = message?.message
        formattedmessage["timestamp"] = message?.timestamp
        messages.push(formattedmessage)
    })

    const acendingOrderMessages = messages
        ? messages.slice().sort((a: any, b: any) => b.timestamp.localeCompare(a.timestamp))
        : [];

    return (
        <>
            {loading ? (
                <div className='flex items-center justify-center mt-56'>
                    <ImSpinner2 size={30} className='animate-spin' />
                </div>
            ) : (
                <>
                    <Chat acendingOrderMessages={acendingOrderMessages} />
                    <ChatInput user={user} clickedUser={clickedUser} getUserMessages={getUserMessages} getClickedUserMessages={getClickedUserMessages} />
                </>
            )}
        </>
    )
}

export default ChatDisplay
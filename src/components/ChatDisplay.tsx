// "use client"
// import { useEffect, useState } from 'react'
// import { Chat, ChatInput } from '.'
// import axios from 'axios'
// import { ImSpinner2 } from 'react-icons/im'

// const ChatDisplay = ({ user, clickedUser }: any) => {

//     const userId = user?.user_id
//     const clickedUserId = clickedUser?.user_id
//     const [userMessages, setUserMessages] = useState<any>(null)
//     const [clickedUserMessages, setClickedUserMessages] = useState<any>(null)
//     const [loading, setLoading] = useState<boolean>(true);

//     const getUserMessages = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/messages', {
//                 params: { userId: userId, correspondingUserId: clickedUserId }
//             })
//             setUserMessages(response.data)
//         } catch (error) {
//             console.log(error)
//         } finally {
//             setLoading(false);
//         }
//     }

//     const getClickedUserMessages = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/messages', {
//                 params: { userId: clickedUserId, correspondingUserId: userId }
//             })
//             setClickedUserMessages(response.data)
//         } catch (error) {
//             console.log(error)
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         getUserMessages()
//         getClickedUserMessages()
//     }, [])

//     const handleDeleteMessage = async ( timestamp: string) => {
//         try {
//             await axios.delete(`http://localhost:8000/deleteMessage/${userId}/${timestamp}`);
//             getUserMessages();
//             getClickedUserMessages();
//         } catch (error) {
//             console.error("Error deleting message:", error);
//         }
//     };

//     const messages: any = []

//     userMessages?.forEach((message: { message: any; timestamp: any }) => {
//         const formattedMessage: any = {}
//         formattedMessage["name"] = user?.first_name
//         formattedMessage["photo"] = user?.photo
//         formattedMessage["message"] = message?.message
//         formattedMessage["timestamp"] = message?.timestamp
//         formattedMessage["isUser"] = true
//         messages.push(formattedMessage)
//     })

//     clickedUserMessages?.forEach((message: { message: any; timestamp: any }) => {
//         const formattedMessage: any = {}
//         formattedMessage["name"] = clickedUser?.first_name
//         formattedMessage["photo"] = clickedUser?.photo
//         formattedMessage["message"] = message?.message
//         formattedMessage["timestamp"] = message?.timestamp
//         formattedMessage["isUser"] = false
//         messages.push(formattedMessage)
//     })

//     const ascendingOrderMessages = messages
//         ? messages.slice().sort((a: any, b: any) => b.timestamp.localeCompare(a.timestamp))
//         : [];

//     return (
//         <>
//             {loading ? (
//                 <div className='flex items-center justify-center mt-56'>
//                     <ImSpinner2 size={30} className='animate-spin' />
//                 </div>
//             ) : (
//                 <>
//                     <Chat ascendingOrderMessages={ascendingOrderMessages} handleDeleteMessage={handleDeleteMessage} />
//                     <ChatInput user={user} clickedUser={clickedUser} getUserMessages={getUserMessages} getClickedUserMessages={getClickedUserMessages} />
//                 </>
//             )}
//         </>
//     )
// }

// export default ChatDisplay

"use client"
import { useEffect, useState } from 'react'
import { Chat, ChatInput } from '.'
import axios from 'axios'
import { ImSpinner2 } from 'react-icons/im'

const ChatDisplay = ({ user, clickedUser }: any) => {
    const userId = user?.user_id;
    const clickedUserId = clickedUser?.user_id;
    const [userMessages, setUserMessages] = useState<any>(null);
    const [clickedUserMessages, setClickedUserMessages] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getUserMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: { userId: userId, correspondingUserId: clickedUserId }
            });
            setUserMessages(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getClickedUserMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: { userId: clickedUserId, correspondingUserId: userId }
            });
            setClickedUserMessages(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserMessages();
        getClickedUserMessages();
    }, []);

    const handleDeleteMessage = async (timestamp: any) => {
        try {
            await axios.delete(`http://localhost:8000/deleteMessage/${userId}/${encodeURIComponent(timestamp)}`);
            getUserMessages();
            getClickedUserMessages();
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    };

    const messages: any = [];

    userMessages?.forEach((message: {message: any, timestamp: any}) => {
        const formattedMessage = {
            name: user?.first_name,
            photo: user?.photo,
            message: message?.message,
            timestamp: message?.timestamp,
            from_userId: userId
        };
        messages.push(formattedMessage);
    });

    clickedUserMessages?.forEach((message: {message: any, timestamp: any}) => {
        const formattedMessage = {
            name: clickedUser?.first_name,
            photo: clickedUser?.photo,
            message: message?.message,
            timestamp: message?.timestamp,
            from_userId: clickedUserId
        };
        messages.push(formattedMessage);
    });

    const ascendingOrderMessages = messages
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
                    <Chat acendingOrderMessages={ascendingOrderMessages} handleDeleteMessage={handleDeleteMessage} userId={userId} />
                    <ChatInput user={user} clickedUser={clickedUser} getUserMessages={getUserMessages} getClickedUserMessages={getClickedUserMessages} />
                </>
            )}
        </>
    );
};

export default ChatDisplay;


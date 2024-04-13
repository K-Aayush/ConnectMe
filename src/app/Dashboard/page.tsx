"use client"

import { Header } from '@/components'
import React from 'react'
import { useState, useRef, useMemo, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import { IoHeartOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useRouter } from "next/navigation";
import { ImSpinner2 } from 'react-icons/im'


type Direction = 'left' | 'right' | 'up' | 'down';

const Dashboard: React.FC = () => {

    const [lastDirection, setLastDirection] = useState<string | undefined>();
    const [user, setUser] = useState(null);
    const [genderedUsers, setGenderedUsers] = useState(null);
    const [cookies, setCookie, removeCookie]: any = useCookies(['user']);
    const [loading, setLoading] = useState<boolean>(true);

    let navigate = useRouter();

    const userId = cookies.user_id


    const getGenderedUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/gendered-users", {
                params: { gender: user?.gender_interest }
            });
            setGenderedUsers(response.data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:8000/user", {
                params: { userId }
            });
            setUser(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!userId) {
            navigate.push('/');
        } else {
            getUser();
        }
    }, [userId]);

    useEffect(() => {
        if (user) {
            getGenderedUsers();
        }
    }, [user]);


    const updateMatches = async (matchedUserId: any) => {
        try {
            await axios.put('http://localhost:8000/addmatch', {
                userId,
                matchedUserId
            })
            getUser()
        } catch (error) {
            console.log(error)
        }
    }


    const outOfFrame = (name: string) => {
        console.log(name + ' left the screen!')
    }

    const swiped = (dir: Direction, swipedUserId: string) => {

        if (dir === 'right') {
            updateMatches(swipedUserId)
        }
        setLastDirection(dir);

    };

    const matchedUserIds = (user?.matches || []).map(({ user_id }: any) => user_id).concat(userId);

    const filteredGenderedUsers = genderedUsers?.filter(
        genderedUser => !matchedUserIds.includes(genderedUser.user_id)
    )

    // const swipe = async (dir: Direction) => {
    //     if (currentIndex < genderedUsers.length) {
    //         swiped(dir, genderedUsers[currentIndex].name);
    //     }
    // };


    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-[#e90b76b7] to-[#f06e52]">
                    <ImSpinner2 size={50} className='animate-spin' />
                </div>
            ) : (
                user &&
                <div className='h-screen bg-gradient-to-tr from-[#e90b76b7] to-[#f06e52] pt-2'>
                    <Header user={user} />
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-[400px] max-w-[85vw] h-[50vh] mt-[10vh]">
                            {filteredGenderedUsers?.map((genderedUser: any) =>
                                <TinderCard
                                    className='absolute'
                                    key={genderedUser.user_id}
                                    swipeRequirementType='position'
                                    swipeThreshold={30}
                                    preventSwipe={['up', 'down']}
                                    onSwipe={(dir) => swiped(dir as Direction, genderedUser.user_id)}
                                    onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                                >
                                    <div
                                        style={{ backgroundImage: `url("uploads/${genderedUser.photo}")` }}
                                        className="relative bg-gray-300 max-w-[85vw] w-[400px] h-[50vh] padding-[20px] shadow-2xl rounded-2xl bg-cover bg-center">
                                        <h3 className="absolute bottom-0 m-2 text-black">
                                            {genderedUser.first_name}
                                        </h3>
                                    </div>
                                </TinderCard>
                            )}
                        </div>
                        <div className="w-full flex justify-center text-2xl font-semibold mt-4">
                            {lastDirection ? <p>You Swiped {lastDirection}</p> : <p />}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Dashboard
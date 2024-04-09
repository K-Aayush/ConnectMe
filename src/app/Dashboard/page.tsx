"use client"

import { Header } from '@/components'
import React from 'react'
import { useState, useRef, useMemo, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import { IoHeartOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import axios from 'axios'
import { useCookies } from 'react-cookie'


type Direction = 'left' | 'right' | 'up' | 'down';

const Dashboard: React.FC = () => {

    const [lastDirection, setLastDirection] = useState<string | undefined>();
    const [user, setUser] = useState(null);
    const [genderedUsers, setGenderedUsers] = useState(null);
    const [cookies, setCookie, removeCookie]: any = useCookies(['user']);

    const userId = cookies.user_id


    const getGenderedUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/gendered-users", {
                params: { gender: user?.gender_interest }
            });
            setGenderedUsers(response.data);
            console.log(genderedUsers)
        } catch (error) {
            console.log(error)
        }
    }

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:8000/user", {
                params: { userId }
            });
            setUser(response.data);
            console.log(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        getGenderedUsers();
    }, [user]);



    console.log('genderuser', genderedUsers);

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

    console.log(user)


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
            {user &&
                <div>
                    <Header />
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-[400px] max-w-[85vw] h-[50vh] mt-[10vh]">
                            {filteredGenderedUsers?.map((genderedUser: any) =>
                                <TinderCard
                                    className='absolute'
                                    key={genderedUser.first_name}
                                    swipeRequirementType='position'
                                    swipeThreshold={30}
                                    preventSwipe={['up', 'down']}
                                    onSwipe={(dir) => swiped(dir as Direction, genderedUser.user_id)}
                                    onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                                >
                                    <div
                                        style={{ backgroundImage: 'url(' + genderedUser.url + ')' }}
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
                </div>}
        </>
    )
}

export default Dashboard
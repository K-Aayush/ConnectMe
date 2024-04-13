"use client"

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { FaArrowLeft } from "react-icons/fa";

const Profile = () => {
    const [userData, setUserData] = useState<any>();
    const [cookies, setCookie, removeCookie]: any = useCookies(['user']);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = cookies.user_id
                const response = await axios.get("http://localhost:8000/user", {
                    params: { userId }
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const calculateAge = (dob: Date) => {
        const Dob = new Date(dob);
        const diffMs = Date.now() - Dob.getTime();
        const ageDate = new Date(diffMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-tr from-[#e90b78] to-[#f06e52]">
            <div className="m-auto p-8 items-center text-center justify-center">
                {userData ? (
                    <div className=''>
                        <div className="flex justify-center">
                            <img src={`uploads/${userData.photo}`} alt="Profile" className="w-[300px] h-[300px] rounded-full mb-4 object-cover" />
                        </div>
                        <h1 className="text-5xl font-semibold text-center mb-4">{userData.first_name}</h1>
                        <div className='text-center'>
                            <p className="mb-2 text-xl font-medium">Age: {calculateAge(userData.dob)} Years Old</p>
                            <p className="mb-2 text-xl font-medium">Gender Identity: {userData.gender_identity}</p>
                            <p className="mb-2 text-xl font-medium">Gender Interest: {userData.gender_interest}</p>
                            <p className="mb-2 text-xl font-medium">About: {userData.about}</p>
                        </div>
                        <button className="border-[2px] text-white font-bold py-2 px-4 rounded-full mt-6 hover:bg-gray-300 hover:text-black hover:border-black ease-linear transition-all duration-150">
                            <Link href={"/"} >Edit Profile</Link>
                        </button>
                    </div>
                ) : (
                    <p className="text-center">Loading...</p>
                )}
            </div>

            <Link href="/Dashboard" className="absolute top-0 left-0 m-4 flex gap-2 text-xl items-center p-3 rounded-xl "><FaArrowLeft /> Dashboard</Link>
        </div>

    );
};


export default Profile

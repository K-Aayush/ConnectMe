"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';

type props = {
    params: {
        [key: string]: string | string[] | undefined
    };
}

const Spinner = ({ size }: any) => (
    <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-[#e90b78] to-[#f06e52]">
        <ImSpinner2 size={size} className="animate-spin text-gray-900" />
    </div>
);

const UserProfile = ({ params }: props) => {
    const [userProfile, setUserProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const userId = params?.userId

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:8000/user", {
                    params: { userId }
                });
                setUserProfile(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);


    if (loading) {
        return <Spinner size={50} />;
    }

    const calculateAge = (dob: Date) => {
        const Dob = new Date(dob);
        const diffMs = Date.now() - Dob.getTime();
        const ageDate = new Date(diffMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-tr from-[#e90b78] to-[#f06e52]">
            <div className="m-auto p-8 items-center text-center justify-center w-full">

                <div className=''>
                    <div className="flex justify-center mb-2">

                        <img
                            src={`/uploads/${userProfile.photo}`}
                            alt="Profile"
                            className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full mb-4 object-cover border-[2px]"
                        />

                    </div>
                    <h1 className="md:text-5xl text-3xl font-semibold text-center mb-4">{userProfile.first_name}</h1>
                    <div className='flex flex-col break-words md:max-w-[40%] mx-auto overflow-x-auto md:gap-4 gap-3'>
                        <p className="text-sm md:text-lg font-medium"><span className='font-semibold'>Age:</span> {calculateAge(userProfile.dob)} Years Old</p>
                        <p className="text-sm md:text-lg font-medium"><span className='font-semibold'>Gender Identity:</span> {userProfile.gender_identity}</p>
                        <p className="text-sm md:text-lg font-medium"><span className='font-semibold'>About Me:</span> {userProfile.about}</p>
                    </div>

                    <Link href="/Dashboard" className="absolute top-0 left-0 m-4 flex gap-2 text-xl items-center p-3 rounded-xl "><FaArrowLeft /> Dashboard</Link>
                </div>

            </div>

        </div>

    );


}

export default UserProfile
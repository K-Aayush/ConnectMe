"use client"

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const Profile = () => {
    const [userData, setUserData] = useState<any>();
    const [cookies, setCookie, removeCookie]: any = useCookies(['user']);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useRouter();

    useEffect(() => {
        if (!cookies.user_id) {
            navigate.push('/');
            return;
        }
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
    }, [cookies]);

    const calculateAge = (dob: Date) => {
        const Dob = new Date(dob);
        const diffMs = Date.now() - Dob.getTime();
        const ageDate = new Date(diffMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append('photo', file);

                await axios.put(`http://localhost:8000/upload-image/${cookies.user_id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                window.location.reload();

            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-tr from-[#e90b78] to-[#f06e52]">
            <div className="m-auto p-8 items-center text-center justify-center w-full">
                {userData ? (
                    <div className=''>
                        <div className="flex justify-center relative mb-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <img
                                src={`uploads/${userData.photo}`}
                                alt="Profile"
                                className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full mb-4 object-cover border-[2px]"                                
                            />
                             <button
                                className="absolute bottom-3 border-[2px] font-bold py-1 px-4 rounded-full bg-gray-300 text-black border-black ease-linear transition-all duration-150"
                                onClick={handleImageClick}
                            >
                                Change Profile Picture
                            </button>
                        </div>
                        <h1 className="md:text-5xl text-3xl font-semibold text-center mb-4">{userData.first_name}</h1>
                        <div className='flex flex-col break-words md:max-w-[40%] mx-auto overflow-x-auto md:gap-4 gap-3'>
                            <p className="text-sm md:text-lg font-medium"><span className='font-semibold'>Age:</span> {calculateAge(userData.dob)} Years Old</p>
                            <p className="text-sm md:text-lg font-medium"><span className='font-semibold'>Gender Identity:</span> {userData.gender_identity}</p>
                            <p className="text-sm md:text-lg font-medium"><span className='font-semibold'>About Me:</span> {userData.about}</p>
                        </div>
                        <button className="border-[2px] font-bold py-1 px-4 rounded-full mt-6 bg-gray-300 hover:bg-gray-400 text-black border-black ease-linear transition-all duration-150">
                            <Link href={"/EditProfile"} >Edit Profile</Link>
                        </button>
                        <Link href="/Dashboard" className="absolute top-0 left-0 m-4 flex gap-2 text-xl items-center p-3 rounded-xl "><FaArrowLeft /> Dashboard</Link>
                    </div>
                ) : (
                    <div className='w-full flex justify-center text-2xl font-semibold mt-4'>
                        <ImSpinner2 size={50} className='animate-spin' />
                    </div>
                )}
            </div>

        </div>

    );
};


export default Profile;


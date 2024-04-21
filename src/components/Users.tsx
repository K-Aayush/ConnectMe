"use client"

import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from "next/navigation";
import axios from 'axios';
import Link from 'next/link';

const User = () => {
    const [userData, setUserData] = useState<any[]>([]);
    const [adminData, setAdminData] = useState<any>();
    const [cookies, setCookie, removeCookie]: any = useCookies(['admin']);
    const navigate = useRouter();

    useEffect(() => {
        if (!cookies.admin_id) {
            navigate.push('/AdminDashboard');
            return;
        }
        const fetchUserData = async () => {
            try {
                const userId = cookies.user_id
                const response = await axios.get("http://localhost:8000/users", {
                    params: { userId }
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [cookies]);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const adminId = cookies.admin_id
                const response = await axios.get("http://localhost:8000/admin", {
                    params: { adminId }
                });
                setAdminData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchAdminData();
    }, [cookies]);

    const handleDeleteUser = async (userId: string) => {
        try {
            await axios.delete(`http://localhost:8000/user?userId=${userId}`);
            const updatedUserData = userData.filter(user => user.user_id !== userId);
            setUserData(updatedUserData);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <>
            <div className='flex items-center justify-end h-[70px] shadow-lg px-[25px] border'>
                {adminData ? (<div>
                    <Link href={'/AdminProfile'}>
                        <div className='flex items-center gap-4 text-center'>
                            <p>{adminData.name}</p>
                            <img className='object-cover rounded-full w-12 h-12' src={`/uploads/${adminData.photo}`} alt="" />
                        </div>
                    </Link>
                </div>) : (
                    <div>Loading...</div>
                )}
            </div>
            <div className="pt-[25px] px-[25px] bg-[#F8F9FC] mx-auto">
                <h1 className="text-[#5a5c69] text-[28px] leading-[34px] font-normal cursor-pointer pb-[25px]">Users Profile</h1>
                <div className="grid grid-cols-5 gap-4">
                    {userData && userData.length > 0 ? (
                        userData.map(user => (
                            <div key={user.user_id} className="p-4 border border-gray-300 rounded">
                                <div className='flex items-center justify-center'>
                                    <img src={`/uploads/${user.photo}`} alt={user.first_name} className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-2 object-cover border-2 border-gray-500" />
                                </div>
                                <div className='flex items-center justify-start gap-2'>
                                    <h2 className="font-semibold">First Name:</h2>
                                    <p>{user.first_name}</p>
                                </div>
                                <div className='flex items-center justify-start gap-2'>
                                    <h2 className="font-semibold">Email:</h2>
                                    <p>{user.email}</p>
                                </div>
                                <div className='flex items-center justify-start gap-2'>
                                    <h2 className="font-semibold">Gender:</h2>
                                    <p>{user.gender_identity}</p>
                                </div>
                                <button onClick={() => handleDeleteUser(user.user_id)} className='bg-red-500 py-2 px-3 rounded-md text-white mt-2 hover:bg-red-700'>Delete</button>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-5">No user data available</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default User
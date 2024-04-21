"use client"

import React, { useEffect, useState } from 'react'
import { FaUsers } from 'react-icons/fa6'
import { FaMale, FaFemale } from 'react-icons/fa'
import { BiMaleFemale } from "react-icons/bi";
import Piechart from './PieChart';
import axios from 'axios';
import Link from 'next/link';
import { useCookies } from 'react-cookie';

const DashboardView = () => {
    const [userData, setUserData] = useState([]);
    const [adminData, setAdminData] = useState<any>();
    const [cookies, setCookie, removeCookie]: any = useCookies(['admin']);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/users");
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

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

    const maleCount = userData.filter(user => user.gender_identity === 'man').length;
    const femaleCount = userData.filter(user => user.gender_identity === 'woman').length;
    const otherCount = userData.filter(user => user.gender_identity !== 'man' && user.gender_identity !== 'woman').length;
    const totalUsers = userData.length;

    return (
        <div>
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
            <div className='pt-[25px] px-[25px] bg-[#F8F9FC]'>
                <div className='text-[#5a5c69] text-[28px] leading-[34px] font-normal cursor-pointer'>Dashboard</div>
                <div className='grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]'>
                    <div className='h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                        <div>
                            <h2 className='text-[#B589DF] text-[11px] leading-[17px] font-bold'>Total Users</h2>
                            <h1 className='text-[20px] leading-6 font-bold text-[#5A5C69] mt-[5px]'>{totalUsers}</h1>
                        </div>
                        <FaUsers size={25} />
                    </div>
                    <div className='h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#1CC88A] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                        <div>
                            <h2 className='text-[#1CC88A] text-[11px] leading-[17px] font-bold'>Male</h2>
                            <h1 className='text-[20px] leading-6 font-bold text-[#5A5C69] mt-[5px]'>{maleCount}</h1>
                        </div>
                        <FaMale size={25} />
                    </div>
                    <div className='h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#ff3939] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                        <div>
                            <h2 className='text-[#ff3939] text-[11px] leading-[17px] font-bold'>Female</h2>
                            <h1 className='text-[20px] leading-6 font-bold text-[#5A5C69] mt-[5px]'>{femaleCount}</h1>
                        </div>
                        <FaFemale size={25} />
                    </div>
                    <div className='h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#d1d100] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
                        <div>
                            <h2 className='text-[#d1d100] text-[11px] leading-[17px] font-bold'>Others</h2>
                            <h1 className='text-[20px] leading-6 font-bold text-[#5A5C69] mt-[5px]'>{otherCount}</h1>
                        </div>
                        <BiMaleFemale size={25} />
                    </div>
                </div>
                <div className='flex mt-[22px] w-full'>
                    <div className='w-full border bg-white shadow-md cursor-pointer rounded-[4px]'>
                        <div className='bg-[#F8F9Fc] flex items-center justify-center py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]'>
                            <h2>Users Overview</h2>
                        </div>
                        <div>
                            <Piechart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardView
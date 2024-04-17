"use client"

import React from 'react'
import { FaTachometerAlt, FaUser } from 'react-icons/fa'
import { CiLogout } from "react-icons/ci";
import { TbArrowsExchange } from "react-icons/tb";
import Link from 'next/link';
import { useCookies } from 'react-cookie';


const SideBar = () => {

    const [cookies, setCookie, removeCookie] = useCookies<any>(['admin'])

    const logout = () => {
        removeCookie('admin_id' as 'admin', cookies.adminId)
        removeCookie('AdminAuthToken' as 'admin', cookies.token)
        window.location.reload()
    }

    return (

        <div className='bg-blue-500 h-full px-[25px]'>
            <div className='px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
                <h1 className='text-white text-[20px] leading-[24px] font-extrabold'>Admin Panel</h1>
            </div>

            <Link href={'/AdminDashboard'}>
                <div className='gap-[15px] py-[30px] flex items-center justify-start border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
                    <FaTachometerAlt color='white' />
                    <h1 className='text-white text-[20px] leading-[24px] font-extrabold'>Dashboard</h1>
                </div>
            </Link>

            <Link href={'/Users'}>
                <div className='gap-[15px] py-[30px] flex items-center justify-start border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
                    <FaUser color='white' />
                    <h1 className='text-white text-[20px] leading-[24px] font-extrabold'>Users</h1>
                </div>
            </Link>

            <div className='gap-[15px] py-[30px] flex items-center justify-start border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
                <TbArrowsExchange color='white' />
                <h1 className='text-white text-[20px] leading-[24px] font-extrabold'>Change Password</h1>
            </div>


            <div onClick={logout} className='gap-[15px] py-[30px] flex items-center justify-start border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
                <CiLogout color='white' />
                <h1 className='text-white text-[20px] leading-[24px] font-extrabold'>Log out</h1>
            </div>


        </div>
    )

}

export default SideBar
import React from 'react'
import { FaTachometerAlt, FaUser, FaChartPie, FaPassport } from 'react-icons/fa'
import { CiLogout } from "react-icons/ci";
import { TbArrowsExchange } from "react-icons/tb";


const SideBar = () => {
    return (

        <div className='bg-blue-500 h-screen px-[25px]'>
            <div className='px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
                <h1 className='text-white text-[20px] leading-[24px] font-extrabold'>Admin Panel</h1>
            </div>

            <div className='gap-[15px] py-[30px] flex items-center justify-start border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
                <FaTachometerAlt color='white' />
                <h1 className='text-white text-[20px] leading-[24px] font-extrabold'>Dashboard</h1>
            </div>
            
            <div className='gap-[15px] py-[30px] flex items-center justify-start border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
                <FaUser color='white' />
                <h1 className='text-white text-[20px] leading-[24px] font-extrabold'>Users</h1>
            </div>
            
            <div className='gap-[15px] py-[30px] flex items-center justify-start border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
                <FaChartPie color='white' />
                <h1 className='text-white text-[20px] leading-[24px] font-extrabold'>Charts</h1>
            </div>
            
            <div className='gap-[15px] py-[30px] flex items-center justify-start border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
                <TbArrowsExchange color='white' />
                <h1 className='text-white text-[20px] leading-[24px] font-extrabold'>Change Password</h1>
            </div>
            
            <div className='gap-[15px] py-[30px] flex items-center justify-start border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
                <CiLogout color='white' />
                <h1 className='text-white text-[20px] leading-[24px] font-extrabold'>Log out</h1>
            </div>


        </div>
    )

}

export default SideBar
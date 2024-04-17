"use client"

import { User, SideBar } from '@/components'
import React from 'react'

const Users = () => {
    return (
        <div className='flex'>
            <div className='basis-[20%] h-[100vh] border'>
                <SideBar />
            </div>
            <div className='basis-[80%] border'>
                <User />
            </div>
        </div>
    )
}

export default Users
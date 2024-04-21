"use client"

import { SideBar, DashboardView } from '@/components'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'

const AdminDashboard = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['admin']);
  const router = useRouter();

  const adminId = cookies.admin_id


  useEffect(() => {
    if (!adminId) {
      router.push('/');
    }
  }, [adminId]);

  return (
    <div className='flex'>
      <div className='basis-[20%] h-full border'>
        <SideBar />
      </div>
      <div className='basis-[80%] border'>
        <DashboardView />
      </div>
    </div>
  )
}

export default AdminDashboard
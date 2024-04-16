import { SideBar, DashboardView } from '@/components'
import React from 'react'

const AdminDashboard = () => {
  return (
    <div className='flex'>
      <div className='basis-[20%] h-[100vh] border'>
        <SideBar />
      </div>
      <div className='basis-[80%] border'>
        <DashboardView />
      </div>
    </div>
  )
}

export default AdminDashboard
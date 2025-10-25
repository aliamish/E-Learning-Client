'use client'
import React from 'react'
import AdminSidebar from '@/app/components/Admin/Sidebar/AdminSidebar';
import Heading from '@/app/utils/Heading';
import DashboardHeader from '../../components/Admin/DashboardHeader';
import EditCategories from '../../../components/Admin/Course/EditCategories'


type Props = {}

const page = ({params}:any) => {
  const id = params?.id;
  return (
    <div>
        <Heading
        
          title= "ELearning = Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming, MERN, Redux, Machine Learning"
        />
        <div className='flex'>
            <div className='1500px:w-[16%] w-1/5'>
                     <AdminSidebar/>
            </div>
            <div className='w-[85%]'>
                <DashboardHeader/>

                
                <EditCategories/>
            </div>
        </div>
        
    </div>
  )
}

export default page
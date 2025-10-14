import React, { useState } from 'react'
import Navbar from './ui/shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'

import { useSelector } from 'react-redux'
// import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
     const [open, setOpen] = useState(false);
    // useGetAppliedJobs();
 
    const {user} = useSelector(store=>store.auth);

    return (
        <div>
            <Navbar />
            <div className="border border-gray-300  shadow-md hover:shadow-lg rounded-xl p-4 sm:p-5 transition-all duration-300 my-10">

            <div className='max-w-4xl mx-auto 00 rounded-2xl my-5 p-8 '>
                <div className='flex justify-between '>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-15 w-15 border border-fuchsia-800">
                            <AvatarImage src="https://img.freepik.com/premium-vector/minimalist-logo-design-any-corporate-brand-business-company_1253202-77511.jpg" alt="profile" />
                        </Avatar>
                        <div>
                         <h1 className='font-medium text-2xl'>{user?.fullname}</h1>
                         <p> {user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button title="Edit profile"onClick={() => setOpen(true)} className="text-right text-purple-900 bg-purple-200 rounded-4xl border border-gray-500 cursor-pointer shadow-gray-400 h-12 w-12 hover:bg-fuchsia-200" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail  className='text-fuchsia-700'/>
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact   className='text-fuchsia-700'/>
                        <span>{user?.phonenumber}</span>
                    </div>
                </div>
                 <div className='my-5'>
                   
                    <div className='flex items-center gap-2 '>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge className="bg-white text-gray-600" key={index}>{item} </Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                     {
                        isResume ? <a target='blank' href={user?.profile?.resume}className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    } 
                </div>
            </div>
            <div className='max-w-4xl mx-auto'>
                <h1 className='font-bold text-3xl my-5 text-fuchsia-800'>Applied <span className='text-red-600'>Jobs</span></h1>
               
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
        </div>
    )
}

export default Profile;

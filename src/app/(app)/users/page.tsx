'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

const Page = () => {

    const [userName, setUsername] = useState([]);
    
    const router = useRouter();
    const {toast} = useToast();

    const fetchUsers = useCallback(async (refresh: boolean = false) => {
        try{
            const response = await axios.get(`/api/get-users`)
            setUsername(response.data.users)
            if(refresh){
                toast({
                    title: "Refreshed Users",
                    description: "Showing latest Users",
                  })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occured while getting the users",
                variant: "destructive"
            })
        }
    }, [setUsername, toast])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    // useEffect(() => {
    //     const getUsers = async () => {
    //         try {
    //             const { data } = await axios.get(`/api/get-users`);
    //             setUsername(data.users)
    //         } catch (error) {
    //             console.error("An error occurred while getting users", error)
    //         }
    //     }
    //     getUsers();
    // }, [])

    const handleSendMessage = (n: string) => {
        router.push(`/u/${n}`)
    }

    return (
        <>
            <h1 className='text-4xl p-6 font-semibold'> Our Users</h1>
            <Separator/>
            <Button onClick={(e) => {
                e.preventDefault()
                fetchUsers(true)
            }}>Fetch users</Button>
            <div className="mt-4 mx-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {userName.length > 0 ? (
                    userName.map((name, index) => (
                        <div className='border shadow flex items-center justify-between p-6' key={name}>
                            <div className='font-bold text-lg'>@<i>{name}</i></div>
                            <Button onClick={() => handleSendMessage(name)}>Send Message</Button>
                        </div>
                    ))
                ) : (
                    <p>No Users registered.</p>
                )}
            </div>
            <Separator className="my-6" />
            <div className="text-center mb-6">
                <div className="mb-4">Get Your username</div>
                <Link href={'/sign-up'}>
                <Button>Create Your Account</Button>
                </Link>
            </div>
        </>
    )
}

export default Page
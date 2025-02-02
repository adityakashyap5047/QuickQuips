'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ApiResponse } from '@/types/ApiResponse'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

const Page = () => {

    const [userName, setUsername] = useState<string[]>([]);
    
    const router = useRouter();

    const fetchUsers = useCallback( async () => {
        try {
            const { data } = await axios.get<ApiResponse>(`/api/get-users`);
            setUsername(data.users || [])
        } catch (error) {
            console.error("An error occurred while getting users", error)
        }
    }
    , [setUsername])

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers])

    const handleSendMessage = (n: string) => {
        router.push(`/u/${n}`)
    }

    return (
        <>
            <h1 className='text-4xl p-6 font-semibold'> Our Users</h1>
            <Separator/>
            <div className="mt-4 mx-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {userName?.length > 0 ? (
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
            <div className="text-center">
                <div className="mb-4">Get Your username</div>
                <Link href={'/sign-up'}>
                <Button>Create Your Account</Button>
                </Link>
            </div>
        </>
    )
}

export default Page
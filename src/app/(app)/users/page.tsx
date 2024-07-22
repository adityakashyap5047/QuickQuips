'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [userName, setUsername] = useState([]);
    
    const router = useRouter();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const {data} = await axios.get(`/api/get-users`)
                setUsername(data.users)
            } catch (error) {
                console.error("An error occurred while getting users", error)
            }
        }
        getUsers();
    }, [])

    const handleSendMessage = (n: string) => {
        router.push(`/u/${n}`)
    }

    return (
        <>
            <h1 className='text-4xl p-6 font-semibold'> Our Users</h1>
            <Separator/>
            <div className="mt-4 mx-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {userName.length > 0 ? (
                    userName.map((name, index) => (
                        <Card className="card-bordered">
                            <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>@<i>{name}</i></CardTitle>
                                <Button onClick={() => handleSendMessage(name)}>Send Message</Button>
                            </div>
                            </CardHeader>
                        </Card>
                    ))
                ) : (
                    <p>No Users registered.</p>
                )}
            </div>
        </>
    )
}

export default page
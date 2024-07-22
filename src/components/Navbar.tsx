"use client";

import React from 'react'
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import {User} from 'next-auth'
import { Button } from './ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation';

const Navbar = () => {

    const router = useRouter();

    const {data: session} = useSession();
    
    const user: User = session?.user as User;

    const handleDashboardClick = () => {
        router.push("/dashboard");
    }
    const handleUserClick = () => {
        router.push("/users");
    }
    const handleSignin = () => {
        router.push("/sign-in");
    }
    const handleSignup = () => {
        router.push("/sign-up");
    }
    const handleSignout = () => {
        signOut();
    }

    const avtarName = user?.username || user?.email || "QuickQuips";

  return (
    <nav className='p-4 md:p-6 shadow-md'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
            <a className='text-xl font-bold mb-4 md:mb-0' href="/">QuickQuips</a>
            {
                session ? (
                    <>
                        <span className='mr-4'>Welcome, {user?.username || user?.email}</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className='border cursor-pointer bg-sky-500 flex justify-center items-center text-lg'>{avtarName[0].toUpperCase()}</Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup>
                                    <DropdownMenuRadioItem className='cursor-pointer' value='#' onClick={handleDashboardClick}>Dashboard</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem className='cursor-pointer' value="#" onClick={handleUserClick}>Our Users</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem className='cursor-pointer' value="#" onClick={handleSignout}>Sign Out</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                ): (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className='border cursor-pointer bg-gray-500 flex justify-center items-center text-xl'>?</Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup>
                                <DropdownMenuRadioItem className='cursor-pointer' value="#" onClick={handleUserClick}>Our Users</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem className='cursor-pointer' value="#" onClick={handleSignin}>Sign in</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem className='cursor-pointer' value="#" onClick={handleSignup}>Sign Up</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        </div>
    </nav>
  )
}

export default Navbar
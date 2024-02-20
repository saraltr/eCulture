"use client"

import Image from "next/image";
import { LogoutButton } from "@/app/components/connection";
import React from 'react';
import userIcon from "../../../public/images/blank-profile-picture.png"
import { NewPostForm } from "../components/posts"
import { useSession } from "next-auth/react"
import { CheckConnection } from "@/app/components/connection";
import UserProfile from "./profile";

export const User = () => {

    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <>
                <div className="
                m-4">
                    <h2>Loading...</h2>
                </div>
                
            </>
        )
    } if (status === "unauthenticated"){
        return (
            <section className="m-4 text-center">
                <h2>You need to login to view your profile</h2>
                <div className="flex justify-center my-2">
                    <div className="btn bg-primary hover:bg-secondary text-white py-2 px-4 rounded-md">
                    <CheckConnection></CheckConnection>
                    </div>
                </div>
                
            </section>
        );
    } else {

    if (!session?.user) {
        return null;
    }

    const username = session.user.name ?? "eculture_user"
    const userImage = session.user.image ?? userIcon; 

    return (
        <>
        <section className="m-5 flex items-center gap-10">

            <div className="avatar online flex-none ">
                <div className="w-26 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                    <Image
                    src={userImage}
                    alt="user avatar"
                    width={100}
                    height={100}
                    /> 
                </div>
            </div>

            <div className="">
                <h2 >@{session.user.name}</h2>
                
                <p className="text-accent">{session.user.email}</p>
                <div className=" my-3 btn bg-secondary hover:bg-primary text-white py-2 px-6 rounded-md">
                    <LogoutButton />
                </div>
            </div>

        </section>

        <section className="m-5">
            <UserProfile username={username}></UserProfile>
        </section>

        <section>
            <NewPostForm userId={username}></NewPostForm>
        </section>
        </>
    );
    }
};

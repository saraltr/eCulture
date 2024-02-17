import { getServerSession } from "next-auth";
import Image from "next/image";
import { LogoutButton } from "@/app/components/connection";
import React from 'react';
import { authConfig } from "../../../pages/api/auth/[...nextauth]";
import userIcon from "../../../public/images/blank-profile-picture.png"
import { NewPostForm } from "../components/posts"


export const User = async () => {
    const session = await getServerSession(authConfig);

    if (!session?.user) {
        return null;
    }

    const username = session.user.name ?? "anonyme"
    const userIdentifier = session.user.email ?? ""
    const userImage = session.user.image ?? userIcon; 

    return (
        <>
        <section>
            <Image
                src={userImage}
                alt="user avatar"
                width={100}
                height={100}
            />
            <div>
                <h2>{session.user.name}</h2>
                <p>{session.user.email}</p>
                <LogoutButton />
            </div>
        </section>
        <div>
            <NewPostForm userId={username}></NewPostForm>
        </div>
        </>
    );
};

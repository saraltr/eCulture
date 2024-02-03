import { getServerSession } from "next-auth";
import Image from "next/image";
import { LogoutButton } from "./LogoutButton";
import React from 'react';
import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { UserIcon } from '@heroicons/react/24/solid';

export const User = async () => {
    const session = await getServerSession(authConfig);

    if (!session?.user) {
        return null;
    }

    const userImage = session.user.image ?? UserIcon; 

    return (
        <div>
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
        </div>
    );
};

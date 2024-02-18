"use client"

import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useEffect } from "react";
import { redirect } from "next/navigation";

export function Connection() {
  return (
    <SessionProvider>
      <ConnectionContent />
    </SessionProvider>
  );
}

function ConnectionContent() {
  const { data: session } = useSession();

  useEffect(() => {
    const handleSignIn = async () => {
      await signIn(undefined, { callbackUrl: "/profile" });
    };

    const handleClick = () => {
      handleSignIn();
    };

    const loginBtn = document.getElementById('loginBtn');

    if (loginBtn) {
      loginBtn.addEventListener('click', handleClick);

      return () => {
        loginBtn.removeEventListener('click', handleClick);
      };
    }

  }, []);

  if (session) {
    const userName = session.user?.name ?? "User";

    return (
      <div>
        <p>Signed in as {userName}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button id="loginBtn">
        Login Now <ArrowRightIcon className="arrowIcon" />
      </button>
    </div>
  );
}

export function CheckConnection() {
  return (
    <SessionProvider>
      <ConnectionBtn />
    </SessionProvider>
  );
}

function ConnectionBtn() {
  const { data: session } = useSession();

  useEffect(() => {
    const handleSignIn = async () => {
      await signIn(undefined, { callbackUrl: "/profile" });
    };

    const handleClick = () => {
      handleSignIn();
    };

    const loginBtn = document.getElementById('loginBtn');

    if (loginBtn) {
      loginBtn.addEventListener('click', handleClick);

      return () => {
        loginBtn.removeEventListener('click', handleClick);
      };
    }

  }, []);

    const handleLogin = () => {
      if (session) {
        signOut(
          redirect("/")
        );
      } else {
        signIn(undefined, { callbackUrl: "/profile" });
      }
    };

  return (
    <div>
      <button className="text-2xl" id="loginBtn" onClick={handleLogin}>
        {session ? "Logout" : "Login"}
      </button>
    </div>
  );
}

export const LogoutButton = () => {
    return(
        <button onClick={
            async () => {
                await signOut({ callbackUrl: "/" })
            }
        } >Logout </button>
    )
}
import React from 'react';
import Link from 'next/link';
import { CheckConnection } from './connection';
import Image from 'next/image';
import logo from '../../../public/images/eculture_logo_white.png'
import { Bars3BottomRightIcon } from '@heroicons/react/24/solid';

function Nav() {
  return (
    <nav>
      <ul className="topnav flex items-center justify-between p-5 ">
        <li className="btn btn-ghost text-xl">
          <Link href="/">Home</Link>
        </li>
        <li className="btn btn-ghost text-xl"><Link href="/discover">Discover</Link></li>
        <li>
          <Image
            src={logo}
            alt='eculture logo'
            width={100}
            height={100}
            style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}

          ></Image>
        </li>
        <li className="btn btn-ghost text-xl"><Link href="/profile">Profile</Link></li>
        <li className="btn btn-ghost text-xl"><Link href="/community">Community</Link></li>
      </ul>
    </nav>
  );
}

function SmallerNav() {
  return (
    <div className="navbar flex items-center justify-between">
      <div className="flex items-center justify-center" >
        <Link className="btn btn-ghost text-xl" href="/">Home</Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-9 rounded-full">
              <Bars3BottomRightIcon />
            </div>
          </div>
          <ul className="bg-primary mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52">
            <li>
              <Link className="justify-between" href="/profile">Profile</Link>
            </li>
            <li><Link href="/discover">Discover</Link></li>
            <li><Link href="/community">Community</Link></li>
            <li className="bg-secondary rounded-md"><CheckConnection /></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <header className="bg-primary text-neutral font-headline">
      <div className="sm:hidden">
        <SmallerNav />
      </div>
      <div className="hidden sm:block">
        <Nav />
      </div>
    </header>
  );
};
import React from 'react';
import Link from 'next/link';
import { CheckConnection } from './connection';
import Image from 'next/image';
import logo from '../../../public/images/eculture_logo_white.png'
import smallLogo from '../../../public/images/simplelogo.png'
import { Bars3BottomRightIcon } from '@heroicons/react/24/solid';

function Nav() {
  return (
    <nav className='bg-secondary'>
      <ul className="flex items-center justify-between p-2 mx-2">
        <li className=''>
          <Link href="/">
            <Image
            src={logo}
            alt='eculture logo'
            width={100}
            height={100}
            style={{ maxWidth: '100px', maxHeight: '100%', width: '100%', height: 'auto' }}>
            </Image>
          </Link>
        </li>
          <li className='btn text-2xl btn-ghost'>
          <Link href="/">Home</Link>
          </li>
          <li className='btn text-2xl btn-ghost'><Link href="/discover">Discover</Link></li>
          <li className='btn text-2xl btn-ghost'><Link href="/profile">Profile</Link></li>
          <li className='btn text-2xl btn-ghost'><Link href="/community">Community</Link></li>
          <li className='p-2 mx-1 border rounded-lg bg-primary hover:scale-110 transform'><CheckConnection /></li>
      </ul>
    </nav>
  );
}

function SmallerNav() {
  return (
    <nav className='bg-secondary'>
    <div className="navbar flex items-center justify-between">
      <div className="flex items-center justify-center" >
        <Link className="btn btn-ghost text-2xl" href="/">
          <Image
            src={smallLogo}
            alt='eculture logo'
            width={150}
              height={150}
              style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}>
            </Image> Eculture
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-9 rounded-full">
              <Bars3BottomRightIcon />
            </div>
          </div>
          <ul className="bg-primary mt-3 z-20 p-2 shadow menu menu-sm dropdown-content rounded-box w-52">
            <li>
              <Link className=" text-2xl justify-between" href="/profile">Profile</Link>
            </li>
            <li><Link className='text-2xl' href="/discover">Discover</Link></li>
            <li><Link className='text-2xl' href="/community">Community</Link></li>
            <li className="bg-secondary rounded-md "><CheckConnection /></li>
          </ul>
        </div>
      </div>
    </div>
    </nav>
  );
}

export default function Header() {
  return (
    <header className="text-neutral font-headline">
      <div className="lg:hidden">
        <SmallerNav />
      </div>
      <div className="hidden lg:block">
        <Nav />
      </div>
    </header>
  );
};
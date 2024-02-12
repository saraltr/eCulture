// Header.tsx
import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';

export default async function Header() {
  return (
    <header>
      <nav className="topnav">
        <Link href="/">Home</Link>
        <Link href="/discover">Discover</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/profile">Profile</Link>
      </nav>
    </header>
  );
};
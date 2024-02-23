import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Not Found",
    description: "Eculture not found page",
};
 
export default function NotFound() {
  return (
    <section className="flex m-4 h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the corresponding event.</p>
      <Link
        href="/discover"
        className="btn bg-secondary hover:bg-primary text-white py-2 px-4 rounded-md"
      >
        Go Back
      </Link>
    </section>
  );
}
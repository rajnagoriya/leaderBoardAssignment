// app/components/Navbar/NavLinks.js
import Link from 'next/link';

export default function NavLinks() {
  return (
    <div className="flex space-x-4">
      <Link href="/" className="hover:text-blue-400">
        Home
      </Link>
      <Link href="/leaderboard" className="hover:text-blue-400">
        Leaderboard
      </Link>
    </div>
  );
}

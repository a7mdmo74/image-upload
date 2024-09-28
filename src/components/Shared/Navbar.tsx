import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import { Button } from '../ui/button';
import { getImages } from '@/lib/actions';

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const session = await getUser();
  const album = await getImages(session.id);

  return (
    <header className="sticky top-0 w-full p-2 bg-white/90 shadow-sm">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-12">
          <Link href="/">Home</Link>
          <Link href="/album" className="relative">
            {album.length > 0 && (
              <div className="absolute -top-3 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                <span>{album.length}</span>
              </div>
            )}
            <span>My Album</span>
          </Link>
        </div>
        <div>
          {session ? (
            <LogoutLink>
              <Button>Logout</Button>
            </LogoutLink>
          ) : (
            <div className="flex gap-4">
              <LoginLink>
                <Button>Login</Button>
              </LoginLink>
              <RegisterLink>
                <Button>Register</Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import { Button } from './button';

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const session = await getUser();
  return (
    <header className="sticky top-0 w-full p-2">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <div>
          <Link href="/">Logo</Link>
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

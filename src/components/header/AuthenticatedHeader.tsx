import { Session } from 'next-auth';
import { AuthButton } from '../buttons/AuthButton';
import { NavItems } from './NavItems';

export const AuthenticatedHeader = ({ session }: { session: Session }) => {
  return (
    <div className="flex flex-row justify-between bg-blend-hue">
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className="flex flex-row">
        {session.user?.image && (
          <span
            style={{
              backgroundImage: `url('${session.user.image}')`,
            }}
            className="bg-primary float-left mr-4 h-[2.8rem] w-[2.8rem] rounded-md bg-cover bg-no-repeat"
          />
        )}
        <span className="">
          <small>Signed in as</small>
          <br />
          <p className="font-bold">
            {session.user?.email ??
              session.user?.name ??
              'Could not find a username for the current session...'}
          </p>
        </span>
      </div>
      <NavItems />
      <AuthButton />
    </div>
  );
};

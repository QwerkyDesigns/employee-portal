import React from 'react';

export function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className="flex min-h-full justify-center px-0">
        <div className="z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow-2xl">
          <div className="mx-auto w-full max-w-md">{children}</div>
        </div>
        <div className="hidden flex-1 md:block lg:block">
          <div className="h-full w-full bg-gradient-to-br from-indigo-500 to-pink-500 object-cover" />
        </div>
      </div>
    </>
  );
}

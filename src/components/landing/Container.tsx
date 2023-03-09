import clsx from 'clsx';
import React, { FC, HTMLProps } from 'react';

interface ContainerProps extends HTMLProps<HTMLDivElement> {
  className?: string
}

const Container: FC<ContainerProps> = ({ className, ...props }) => {
  return (
    <div
      className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  );
};

export default Container;

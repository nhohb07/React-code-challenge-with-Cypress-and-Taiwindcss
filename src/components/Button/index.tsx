import React from 'react';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  label: string;
  icon?: React.ReactElement;
};

export function Button(props: Props) {
  const { icon, label, ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
    >
      {icon}
      {label}
    </button>
  );
}

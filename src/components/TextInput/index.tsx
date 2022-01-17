import React from 'react';

export const TextInput = React.forwardRef(
  (
    props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    ref: any,
  ) => {
    return (
      <input
        ref={ref}
        {...props}
        className='appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
      />
    );
  },
);

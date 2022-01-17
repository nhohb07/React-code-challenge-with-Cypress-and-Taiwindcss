import React from 'react';
import { Button } from 'src/components/Button';
import { InputGroup } from 'src/components/InputGroup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(20),
  })
  .required();

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
            alt='Workflow'
          />

          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign in to your account
          </h2>

          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
              start your 14-day free trial 1
            </a>
          </p>
        </div>

        <form className='mt-8 space-y-6' onSubmit={onSubmit} data-testid='login-form'>
          <div data-testid='email'>
            <InputGroup label='Email address' type='text' {...register('email')} />
            <div className='text-red-500 text-xs'>{errors.email?.message}</div>
          </div>

          <div data-testid='password'>
            <InputGroup label='Password' type='password' {...register('password')} />
            <p className='text-red-500 text-xs'>{errors.password?.message}</p>
          </div>

          <Button type='submit' label='Sign in' id='login-btn' />
        </form>
      </div>
    </div>
  );
}

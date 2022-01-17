import React from 'react';
import { TextInput } from '../TextInput';
import clsx from 'clsx';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
};

export const InputGroup = React.forwardRef((props: Props, ref: any) => {
  const { label, ...inputProps } = props;

  return (
    <div>
      <label htmlFor={props.id} className={clsx('sr-only', props.className)}>
        {label}
      </label>

      <TextInput ref={ref} {...inputProps} placeholder={label} />
    </div>
  );
});

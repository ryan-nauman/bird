import React, { useEffect, useRef } from 'react';
import { InputHTMLAttributes } from 'react';

type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'checked'
> & {
  indeterminate?: boolean;
  checked: boolean;
};

export function Checkbox({ indeterminate = false, ...props }: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return <input {...props} type="checkbox" ref={inputRef} />;
}

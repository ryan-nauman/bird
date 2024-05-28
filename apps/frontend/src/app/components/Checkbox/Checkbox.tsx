import React, { useEffect, useId, useRef } from 'react';
import { InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.scss';

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'checked' | 'id'
> & {
  indeterminate?: boolean;
  checked: boolean;
  screenReaderLabel?: string;
};

export function Checkbox(props: CheckboxProps) {
  const { indeterminate = false, screenReaderLabel, ...rest } = props;
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <>
      <input
        id={id}
        {...rest}
        type="checkbox"
        ref={inputRef}
        aria-checked={indeterminate ? 'mixed' : rest.checked}
      />
      {screenReaderLabel && (
        <label className={styles.srOnly} htmlFor={id}>
          {screenReaderLabel}
        </label>
      )}
    </>
  );
}

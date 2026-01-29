import React, { useState } from 'react';

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FloatingLabelInput = ({ label, error, ...props }: FloatingLabelInputProps) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

  return (
    <div className="relative">
      <input
        {...props}
        className={`
          input input-bordered w-full pt-6 pb-2 px-4 h-14 transition-all duration-200
          ${error ? 'input-error' : ''}
          ${focused ? 'ring-2 ring-primary ring-opacity-50' : ''}
          placeholder-transparent
        `}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        onChange={(e) => {
          setHasValue(!!e.target.value);
          props.onChange?.(e);
        }}
        placeholder={label}
      />
      <label
        className={`
          absolute left-4 transition-all duration-200 pointer-events-none
          ${focused || hasValue
            ? 'top-2 text-xs text-primary font-bold'
            : 'top-1/2 transform -translate-y-1/2 text-base-content/50 text-base'
          }
        `}
      >
        {label}
      </label>
      {error && (
        <div className="text-error text-xs mt-1 font-medium">{error}</div>
      )}
    </div>
  );
};

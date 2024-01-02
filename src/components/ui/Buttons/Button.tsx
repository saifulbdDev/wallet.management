import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'white';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isSubmitting?: boolean;
  disabled?: boolean;
}

const classes = {
  base: 'focus:outline-none transition ease-in-out duration-300',
  disabled: 'opacity-50 cursor-not-allowed',

  variant: {
    primary:
      'bg-indigo-500 hover:bg-indigo-300 focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 text-white',
    secondary:
      'bg-gray-200 hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-gray-900 dark:text-white hover:text-white',
    danger:
      'bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white',
    white: 'bg-white text-indigo-400 hover:bg-indigo-300 hover:text-white',
  },
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      type = 'button',
      className,
      variant = 'primary',
      isSubmitting = false,
      disabled = false,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      disabled={disabled}
      type={type}
      className={classnames(`
        ${classes.base}             
        ${classes.variant[variant]}              
        ${disabled ? classes.disabled : ''}
        ${className}
        ${isSubmitting ? 'flex items-center justify-center' : ''}  `)}
      {...props}
    >
      {isSubmitting ? (
        <>
          <span className="mr-2"> {variant === 'white' ? 'Searching' : 'Submitting..'} </span>
          <svg
            className="w-6 h-6 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </>
      ) : (
        children
      )}
    </button>
  ),
);

Button.displayName = 'Button';

export default Button;

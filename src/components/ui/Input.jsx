
import { useState } from 'react';
import classnames from 'classnames';
import { Field } from 'formik';

import EyeSlash from '@/assets/icons/EyeSlash';
import Eye from '@/assets/icons/Eye';

const Input = (props) => {
  const {
    id,
    containerClass = '',
    labelClass = '',
    inputClass = '',
    placeholder = '',
    label = '',
    type = 'text',
    error = false,
    errorText = '',
    errorColor = 'text-red-600 ',
    required = false,
    ...rest
  } = props;

  const [isPassword, setIsPassword] = useState(false);
  const inputClasses = classnames(
    `w-full focus:border-neutral-200 focus:outline-none rounded-md ${
      errorText && error
        ? 'text-red-700 focus:border-red-900 border-red-400 border-solid focus:ring-red-200'
        : 'border-[#4FAFA8]  focus:ring-[#4FAFA8] hover:border-[#4FAFA8] border-solid bg-white placeholder:text-[#808080]'
    } border  outline-none text-base font-light  ${inputClass}`,
  );
  return (
    <div className={containerClass}>
      {label ? (
        <label
          htmlFor={id}
          className={`block mb-[5px] text-sm font-medium capitalize text-gray-700  ${labelClass}`}
        >
          {label} {required && <span className="text-red">*</span>}
        </label>
      ) : (
        ''
      )}
      {type === 'password' ? (
        <div className="relative">
          <Field
            type={isPassword ? 'text' : type}
            className={inputClasses}
            id={id}
            placeholder={placeholder}
            {...rest}
          />
          {isPassword ? (
            <button
              type="button"
              onClick={(e) => setIsPassword(false)}
              className="absolute flex items-center leading-5 inset-y-3 right-2"
            >
              <Eye className="text-blue-600 stroke-[#222222] " />
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => setIsPassword(true)}
              className="absolute flex items-center leading-5 inset-y-3 right-2"
            >
              <EyeSlash className="stroke-[#222222]   " />
            </button>
          )}
        </div>
      ) : (
        <Field type={type} className={inputClasses} id={id} placeholder={placeholder} {...rest} />
      )}

      {errorText && error ? <p className={`my-2 text-xs ${errorColor}`}>{errorText}</p> : ''}
    </div>
  );
};

export default Input;

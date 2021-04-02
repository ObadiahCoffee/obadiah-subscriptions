import React from 'react';
import './styles.scss';

const FormField = ({
  name,
  type,
  label,
  options,
  placeholder,
  defaultValue,
  autoFocus,
  handleChange,
  register,
  validation,
}) => {
  if (type === 'textarea') {
    return (
      <textarea
        ref={register(validation)}
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoFocus={autoFocus}
      />
    );
  }
  if (type === 'select') {
    return (
      <select name={name} ref={register(validation)}>
        {options.map((option) => (
          <option value={option} defaultValue={defaultValue} key={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (type === 'radio' || type === 'checkbox') {
    return (
      <div className={`${type}-buttons`}>
        {options.map((option) => (
          <div key={option} className={`${type}-button`}>
            <input
              ref={register(validation)}
              type={type}
              id={option}
              name={name}
              value={option}
              defaultValue={defaultValue}
              onChange={handleChange}
            />
            {type === 'checkbox' && (
              <svg viewBox="0 0 21 21">
                <polyline points="5 10.75 8.5 14.25 16 6" />
              </svg>
            )}
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
    );
  }
  return (
    <input
      ref={register(validation)}
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      autoFocus={autoFocus}
    />
  );
};

export default FormField;

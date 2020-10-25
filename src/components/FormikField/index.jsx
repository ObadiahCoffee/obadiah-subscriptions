import React from 'react';
import { Field } from 'formik';
import './styles.scss';

const FormikField = ({
  name,
  type,
  label,
  options,
  placeholder,
  autoFocus,
  className,
  index,
  setFieldValue,
  handleChange,
}) => {
  if (type === 'textarea') {
    return <Field component="textarea" name={name} id={name} placeholder={placeholder} autoFocus={index === 0} />;
  }
  if (type === 'select') {
    return (
      <Field as="select" name={name}>
        {options.map(option => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </Field>
    );
  }

  if (type === 'radio' || type === 'checkbox') {
    return (
      <div className="radio-buttons">
        {options.map(option => (
          <Field
            name={name}
            render={() => (
              <div key={option} className={`${type}-button`}>
                <input type={type} id={option} name={name} value={option} onChange={handleChange} />
                <label htmlFor={option}>{option}</label>
              </div>
            )}
          />
        ))}
      </div>
    );
  }

  return <Field type={type} name={name} id={name} placeholder={placeholder} label={label} autoFocus={autoFocus} />;
};

export default FormikField;

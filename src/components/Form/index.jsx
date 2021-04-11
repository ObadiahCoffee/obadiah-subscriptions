import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { useForm } from 'react-hook-form';
import { FormField } from 'components';
import * as styles from './styles.module.scss';

const Form = ({ content, location, prefilledEmail }) => {
  const { register, handleSubmit, formState, errors } = useForm({ mode: 'onChange' });

  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  const { dirtyFields } = formState;

  useEffect(
    () =>
      // Set submitting to false in clean up function
      () => {
        setSubmitting(false);
      },
    []
  );

  const fields = [
    {
      type: 'text',
      name: 'firstName',
      placeholder: 'Pepe',
      label: 'First name',
      className: 'split-left',
      autoFocus: true,
      defaultValue: '',
      validation: { required: true },
      validationMessage: 'Please enter your first name',
    },
    {
      type: 'text',
      name: 'lastName',
      placeholder: 'Silvia',
      label: 'Last name',
      className: 'split-right',
      defaultValue: '',
      validation: { required: true },
      validationMessage: 'Please enter your last name',
    },
    {
      type: 'tel',
      name: 'phone',
      placeholder: '0422 123 456',
      label: 'Best Phone number',
      defaultValue: '',
      validation: { required: true, minLength: 8 },
      validationMessage: 'Please enter a valid number',
    },
    {
      type: 'email',
      name: 'email',
      placeholder: 'carol@hr.com',
      label: 'Email address',
      defaultValue: prefilledEmail || '',
      validation: { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i },
      validationMessage: 'Please enter a valid email',
    },
    {
      type: 'textarea',
      name: 'message',
      placeholder: "What's on your mind?",
      label: 'Enter a message',
      defaultValue: '',
    },
  ];

  const encode = (formData) =>
    Object.keys(formData)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`)
      .join('&');

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const url = 'Enter form submission endpoint';
      const config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encode({
          ...values,
          _to: 'Enter encrypted email recipient',
          _sender: 'Woolly Mammoth',
          _formname: 'New form submission',
          _replyTo: values.email,
        }),
      };
      const response = await fetch(url, config);
      // const json = await response.json()
      if (response.ok) {
        // return json
        return navigate('/thank-you');
      }
      //
    } catch (error) {
      console.error('Error submitting form', error);
      setSubmissionError('Opps something went wrong, please try again');
      setSubmitting(false);
    }
  };

  return (
    <section>
      {submissionError && <p>{submissionError}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <button type="submit" disabled aria-hidden="true" style={{ display: 'none' }} />
        {fields.map((field) => {
          const hasError = dirtyFields[field.name] && errors[field.name];
          return (
            <div key={field.label} className={`${styles.field} ${field.className || ''}`}>
              <span className={styles.label}>{field.label}</span>
              <FormField {...field} register={register} />
              <div className={`${styles.fieldError} ${hasError ? 'active' : 'inactive'}`}>
                {hasError && <span>{field.validationMessage || 'This field is required'}</span>}
              </div>
            </div>
          );
        })}
        <button type="submit" className={`button ${styles.formButton}`} disabled={submitting}>
          {submitting ? 'Submitting' : 'Submit'}
        </button>
      </form>
    </section>
  );
};

export default Form;

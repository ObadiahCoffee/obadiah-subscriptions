import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import axios from 'axios';
import { Formik, Form, ErrorMessage } from 'formik';
import { FormikField } from 'components';
import './styles.scss';

const FormikForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  useEffect(() => {
    // Set submitting to false in clean up function
    return () => {
      setSubmitting(false);
    };
  }, []);

  const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  };

  const fields = [
    {
      type: 'text',
      name: 'firstName',
      placeholder: 'First name',
      label: 'What is your first name?',
      className: 'split-left',
      autoFocus: true,
    },
    {
      type: 'text',
      name: 'lastName',
      placeholder: 'Last name',
      label: 'What is your last name?',
      className: 'split-right',
    },
    {
      type: 'text',
      name: 'phone',
      placeholder: 'Enter your Phone number',
      label: 'What is your contact number?',
      className: 'split-left',
    },
    {
      type: 'email',
      name: 'email',
      placeholder: 'Enter your email',
      label: 'What is your email address?',
      className: 'split-right',
    },
    {
      type: 'textarea',
      name: 'message',
      placeholder: 'Enter a message',
      label: 'Enter a message',
    },
  ];

  const validation = values => {
    const errors = {};

    // First page validation
    if (!values.firstName) {
      errors.firstName = 'First name is required';
    } else if (!values.lastName) {
      errors.lastName = 'Last name is required';
    } else if (!values.phone) {
      errors.phone = 'Invalid phone number';
    } else if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  const encode = formData =>
    Object.keys(formData)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`)
      .join('&');

  const onSubmit = async values => {
    setSubmitting(true);
    try {
      await axios.post(
        'https://a5w3o6c2j1.execute-api.ap-southeast-2.amazonaws.com/dev?format=json',
        encode({
          ...values,
          _to: '8f9e3f8299ac1e0d7cc814d27bbf923936163d13', // Sam
          // _bcc: '8f9e3f8299ac1e0d7cc814d27bbf923936163d13' // Add before release for ongoing testing,
          _sender: 'Woolly Mammoth',
          _formname: 'Contact lead from Woolly Mammoth',
          _replyTo: values.email,
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting form', error);
      setSubmissionError('Opps something went wrong, please try again');
      setSubmitting(false);
    }
  };

  return (
    <section className="form">
      {submissionError && <p>{submissionError}</p>}
      <Formik initialValues={initialValues} validate={validation} onSubmit={onSubmit}>
        {({ errors, handleChange, setFieldValue }) => (
          <Form>
            <button type="submit" disabled aria-hidden="true" style={{ display: 'none' }} />
            {fields.map(field => {
              const hasError = errors[field.name] && submitted;
              return (
                <div className={`form-field ${field.className || ''}`}>
                  <span className="form-field-label">{field.label}</span>
                  <FormikField {...field} setFieldValue={setFieldValue} handleChange={handleChange} />
                  <div className={`validation-error ${hasError ? 'active' : 'inactive'}`}>
                    {submitted && <ErrorMessage name={field.name} component="div" />}
                  </div>
                </div>
              );
            })}
            <button type="submit" className="button" disabled={submitting} onClick={() => setSubmitted(true)}>
              {submitting ? 'Submitting' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default FormikForm;

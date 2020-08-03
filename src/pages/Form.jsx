import React, { useState } from 'react';

// Components
import Input from '../components/Input';
import Button from '../components/Button';

const Form = () => {
  const [form, setForm] = useState({});

  const formInputs = [
    { label: 'Input 1', placeholder: '' },
    { label: 'Input 2', placeholder: '' },
    { label: 'Input 3', placeholder: '' },
    { label: 'Input 4', placeholder: '' },
    { label: 'Input 5', placeholder: '' },
    { label: 'Input 6', placeholder: '' },
  ];

  const handleOnChange = (e) => {
    const name = e.target.getAttribute('name');
    const value = e.target.value;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleOnSubmit = (e) => {
    console.log(form);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      FORM
      {formInputs.map(({ label, placeholder }) => (
        <Input
          key={label}
          name={label}
          label={label}
          placeholder={placeholder}
          handleOnChange={handleOnChange}
        />
      ))}
      <Button text={'submit'} />
    </form>
  );
};

export default Form;

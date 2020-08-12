import React, { useState, useEffect, useRef } from 'react';

import styles from './Home.module.css';

// Components
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

// Constants
import { auth, firestore } from '../../firebase/firebase.utils';

const Home = () => {
  const title = 'Learning Management System Match';
  // const fields = [
  //   {
  //     label: 'Input 1',
  //     type: 'text',
  //     placeholder: '',
  //     errorMessage: 'Input 1 is a required field',
  //   },
  //   {
  //     label: 'Input 2',
  //     type: 'text',
  //     placeholder: '',
  //     errorMessage: 'Input 2 is a required field',
  //   },
  //   {
  //     label: 'Input 3',
  //     type: 'text',
  //     placeholder: '',
  //     errorMessage: 'Input 3 is a required field',
  //   },
  //   {
  //     label: 'Input 4',
  //     type: 'text',
  //     placeholder: '',
  //     errorMessage: 'Input 4 is a required field',
  //   },
  //   {
  //     label: 'Input 5',
  //     type: 'text',
  //     placeholder: '',
  //     errorMessage: 'Input 5 is a required field',
  //   },
  //   {
  //     label: 'Input 6',
  //     type: 'text',
  //     placeholder: '',
  //     errorMessage: 'Input 6 is a required field',
  //   },
  // ];
  const [form, setForm] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [fields, setFields] = useState([]);
  const _isMounted = useRef(true);
  const _isFirstRun = useRef(true);

  const handleOnChange = (e) => {
    const name = e.target.getAttribute('name');
    const value = e.target.value;
    _isMounted.current &&
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < fields.length; i += 1) {
      const { label, errorMessage } = fields[i];
      if (form[label].length === 0) {
        _isMounted.current && setErrorMessage(errorMessage);
        return;
      }
    }
    console.log(form);
  };

  const getFields = async () => {
    let allSubfields = [];
    let fields = [];
    firestore
      .collection(`discovery`)
      .get()
      .then((snap) => {
        // Create array of all subfields
        snap.forEach((doc) => {
          const data = doc.data();
          if (data.category) {
            allSubfields.push(doc.data());
          }
        });

        // Create final array of fields
        snap.forEach((doc) => {
          const data = doc.data();
          // Build the subfield array
          let subfields = [];
          if (!data.category) {
            allSubfields.forEach((subfield) => {
              if (data.label === subfield.category) {
                subfields.push(subfield);
              }
            });
            fields.push({ ...data, subfields });
            subfields = [];
          }
        });
        console.log(fields);
        setFields(fields);
      });
  };

  useEffect(() => {
    if (_isFirstRun.current) {
      _isFirstRun.current = false;
    }
    getFields();
    return () => (_isMounted.current = false);
  }, []);

  return (
    <>
      <Header />
      <div>{auth.currentUser.firstName}</div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleOnSubmit}>
          <h1 className={styles.title}>{title}</h1>
          {errorMessage && (
            <div className={styles.errorMessage}>*{errorMessage}</div>
          )}
          {fields.map(({ label, subfields }) => {
            return (
              <div key={label}>
                <Input
                  name={label}
                  label={label}
                  // placeholder={label}
                  onChange={handleOnChange}
                />
                {subfields.map(({ label }) => (
                  <Input
                    key={label}
                    name={label}
                    label={label}
                    // placeholder={label}
                    onChange={handleOnChange}
                  />
                ))}
              </div>
            );
          })}
          <Button type="submit" text="Submit" />
        </form>
      </div>
    </>
  );
};

export default Home;

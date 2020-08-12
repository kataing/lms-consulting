import React, { useState, useEffect, useRef } from 'react';

import styles from './Home.module.css';

// Components
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';

// Constants
import { auth, firestore } from '../../firebase/firebase.utils';
import DISCOVERY_DATA from '../../firebase/discoverydata';
// import DISCOVERY_DATA from '../../firebase/discoverydata;
// import seed from '../../firebase/seed';

const Home = () => {
  const title = 'Learning Management System Match';

  const [form, setForm] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [fields, setFields] = useState([]);
  const _isMounted = useRef(true);
  const _isFirstRun = useRef(true);

  const handleOnChange = (e) => {
    console.log('click');
    const name = e.target.getAttribute('name');
    const checked = e.target.checked;
    _isMounted.current &&
      setForm((prevForm) => ({ ...prevForm, [name]: checked }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  const getFields = async () => {
    let allSubfields = [];
    let allFields = [];
    let fields = [];

    // Accessing Sample Data

    // Create array of all subfields
    DISCOVERY_DATA.forEach((item) => {
      if (!item.category) {
        allFields.push(item);
      } else {
        allSubfields.push(item);
      }
    });

    // Create final array of fields
    allFields.forEach((item) => {
      // Build the subfield array
      let subfields = [];
      allSubfields.forEach((subfield) => {
        if (item.label === subfield.category) {
          subfields.push(subfield);
        }
      });
      fields.push({ ...item, subfields });
      subfields = [];
    });
    console.log(fields);
    setFields(fields);

    // // Accessing Firestore
    // firestore
    //   .collection(`discovery`)
    //   .get()
    //   .then((snap) => {
    //     // Create array of all subfields
    //     snap.forEach((doc) => {
    //       const item = doc.data();
    //       if (!item.category) {
    //         allFields.push(item);
    //       } else {
    //         allSubfields.push(item);
    //       }
    //     });

    //     // Create final array of fields
    //     allFields.forEach((item) => {
    //       // Build the subfield array
    //       let subfields = [];
    //       allSubfields.forEach((subfield) => {
    //         if (item.label === subfield.category) {
    //           subfields.push(subfield);
    //         }
    //       });
    //       fields.push({ ...item, subfields });
    //       subfields = [];
    //     });
    //     console.log(fields);
    //     setFields(fields);
    //   });
  };

  useEffect(() => {
    if (_isFirstRun.current) {
      _isFirstRun.current = false;
    }
    getFields();
    // seed();
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
                <ToggleSwitch
                  name={label}
                  style="category"
                  label={label}
                  handleOnChange={handleOnChange}
                />
                {subfields.map(({ label }) => (
                  <ToggleSwitch
                    key={label}
                    name={label}
                    style="subcategory"
                    label={label}
                    handleOnChange={handleOnChange}
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

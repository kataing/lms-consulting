import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase/firebase.utils';

import styles from './FormSettings.module.css';

// Components
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';

// Constants
import DISCOVERY_DATA from '../../firebase/discoverydata';
// import LMS_DATA from '../../firebase/lmsdata';

const FormSettings = () => {
  const [discoveryData, setDiscoveryData] = useState([]);
  // const [lmsData, setLmsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [displayEditAll, setDisplayEditAll] = useState(false);

  const getDiscoveryData = async () => {
    let fields = [];
    let categories = [];

    // Accessing Sample Data
    const getSampleData = () => {
      DISCOVERY_DATA.forEach((item) => {
        if (!item.categoryId) {
          categories.push(item);
        }
        fields.push(item);
      });
    };

    // Accessing Firestore
    const getFirestoreData = () => {
      firestore
        .collection(`discovery`)
        .get()
        .then((snap) => {
          // Create array of all subfields
          snap.forEach((doc) => {
            const item = doc.data();
            if (!item.categoryId) {
              categories.push(item);
            }
            fields.push(item);
          });
        });
    };

    // getFirestoreData();
    getSampleData();
    setDiscoveryData(fields);
    console.log(categories);
    setCategories(categories);
  };

  const handleSelectOnChange = () => {
    console.log('select changing');
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setDisplayEditAll(false);
    console.log('click');
  };

  useEffect(() => {
    getDiscoveryData();
  }, []);

  return (
    <>
      <Header />
      <section className={styles.rowContainer}>
        <div className={styles.displayContainer}>
          <h1 className={styles.title}>Discovery Form Settings</h1>

          {/* Display Static Form */}
          {!displayEditAll && (
            <>
              {discoveryData.map(({ formId, label, categoryLabel }) => {
                return (
                  <div key={formId} className={styles.fieldContainer}>
                    <label>Field {formId}</label>
                    <label>{label}</label>
                    <label>Category</label>
                    <label>{categoryLabel}</label>
                  </div>
                );
              })}
            </>
          )}
          {/* Display Editable Form */}
          {displayEditAll && (
            <form className={styles.form} onSubmit={handleOnSubmit}>
              {discoveryData.map(({ formId, label, categoryId }) => {
                return (
                  <div key={formId} className={styles.fieldContainer}>
                    <Input label={`Field ${formId}`} defaultValue={label} />
                    <Select
                      options={categories}
                      categoryId={categoryId}
                      label="Category"
                      onChange={handleSelectOnChange}
                    />
                  </div>
                );
              })}
              <Button
                text="Save Changes"
                type="submit"
                onClick={() => window.scrollTo(0, 0)}
              />
              <Button
                text="Cancel"
                type="button"
                onClick={() => {
                  setDisplayEditAll(false);
                  window.scrollTo(0, 0);
                }}
              />
            </form>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <Button text="Add New Form Field" type="button" />
          <Button
            text="Edit All Form Fields"
            type="button"
            onClick={() => setDisplayEditAll(true)}
          />
        </div>
      </section>
    </>
  );
};

export default FormSettings;

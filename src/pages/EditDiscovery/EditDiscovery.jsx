import React, { useState } from 'react';
import { firestore } from '../../firebase/firebase.utils';

import styles from './EditDiscovery.module.css';

// Components
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';

// Constants
import DISCOVERY_DATA from '../../firebase/discoverydata';
import { useEffect } from 'react';
// import LMS_DATA from '../../firebase/lmsdata';

const EditDiscovery = () => {
  const [discoveryData, setDiscoveryData] = useState([]);
  // const [lmsData, setLmsData] = useState([]);
  const [categories, setCategories] = useState([]);

  const getDiscoveryData = async () => {
    let allSubfields = [];
    let allFields = [];
    let fields = [];

    // Accessing Sample Data
    const getSampleData = () => {
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
    };

    // // Accessing Firestore
    const getFirestoreData = () => {
      firestore
        .collection(`discovery`)
        .get()
        .then((snap) => {
          // Create array of all subfields
          snap.forEach((doc) => {
            const item = doc.data();
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
        });
    };

    getSampleData();
    // getFirestoreData();
    console.log(fields);
    setCategories(allFields);
    setDiscoveryData(fields);
  };

  const handleOnSubmit = () => {
    console.log('click');
  };

  useEffect(() => {
    getDiscoveryData();
  }, []);

  return (
    <>
      <Header />
      <section className={styles.rowContainer}>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleOnSubmit}>
            <h1 className={styles.title}>Discovery Form Settings</h1>
            {discoveryData.map(({ id, label, subfields }) => {
              const currentCategory = id;
              return (
                <div key={id} className={styles.fieldContainer}>
                  <h2 className={styles.subTitle}>Form Field {id}</h2>
                  <Input label={`Category Name`} defaultValue={label} />
                  {subfields.map(({ id, label }, i) => {
                    return (
                      <div key={id} className={styles.subCategory}>
                        <Input
                          label={`Subcategory Name ${i + 1}`}
                          defaultValue={label}
                        />
                        <Select
                          options={categories}
                          currentCategory={currentCategory}
                          label={`Associated Category`}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </form>
        </div>
      </section>
    </>
  );
};

export default EditDiscovery;

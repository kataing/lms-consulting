import React, { useState, useEffect, useRef } from 'react';

import styles from './Discovery.module.css';

// Components
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Radio from '../../components/Radio/Radio';

// Constants
import { auth, firestore } from '../../firebase/firebase.utils';
import DISCOVERY_DATA from '../../firebase/discoverydata';
import LMS_DATA from '../../firebase/lmsdata';
// import { seedDiscoveryData, seedLmsData } from '../../firebase/seed';

const Discovery = () => {
  const options = [
    {
      label: 'Required',
      value: 1,
      tier: 1,
    },
    {
      label: 'Want to have',
      value: 2,
      tier: 2,
    },
    {
      label: 'Optional',
      value: 0,
      tier: 3,
    },
  ];

  const [form, setForm] = useState({});
  const [discoveryData, setDiscoveryData] = useState([]);
  const [lmsData, setLmsData] = useState([]);
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const _isMounted = useRef(true);
  const _isFirstRun = useRef(true);

  const getLmsData = async () => {
    setLmsData(LMS_DATA);
  };

  const getDiscoveryData = async () => {
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
    setDiscoveryData(fields);

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
    //     setDiscoveryData(fields);
    //   });
  };

  const handleOnChange = (e) => {
    const parse = e.target.getAttribute('name').split(' | ');
    const name = parse[1];
    const id = parse[0];
    const value = Number(e.target.value);
    _isMounted.current &&
      setForm((prevForm) => ({ ...prevForm, [id]: { name, value } }));
    console.log(form);
  };

  const checkForSubmissionErrors = () => {
    let success = true;
    let errorMessage = 'Please fill out all required fields';
    discoveryData.forEach((field) => {
      if (!form[field.id]) {
        field.errorMessage = `${field.label} is a required field.`;
        success = false;
      } else {
        // Reset error message on resubmit
        field.errorMessage = null;
      }
      field.subfields.forEach((subfield) => {
        if (!form[subfield.id]) {
          subfield.errorMessage = `${subfield.label} is a required field.`;
          success = false;
        } else {
          // Reset error message on resubmit
          subfield.errorMessage = null;
        }
      });
    });
    setDiscoveryData([...discoveryData]);
    setErrorMessage(success ? null : errorMessage);
    return { success, errorMessage };
  };

  const sortLms = () => {
    let tier1Count = 0;
    let tier2Count = 0;
    let lmsCount = 0;
    const tier1FieldIds = [];
    const tier2FieldIds = [];
    const tier1FieldNames = [];
    const tier2FieldNames = [];
    const tier3FieldNames = [];
    const tier1 = [];
    const tier2 = [];
    const tier3 = [];

    // Create an array of all selected fields
    Object.keys(form).forEach((fieldId) => {
      // Grab all Tier 1  & Tier 2 fields
      if (form[fieldId].value === 1) {
        tier1Count += 1;
        tier2Count += 1;
        tier1FieldIds.push(fieldId);
        tier2FieldIds.push(fieldId);
        tier1FieldNames.push(form[fieldId].name);
      }
      if (form[fieldId].value === 2) {
        tier2Count += 1;
        tier2FieldIds.push(fieldId);
        tier2FieldNames.push(form[fieldId].name);
      }
      if (form[fieldId].value === 0) tier3FieldNames.push(form[fieldId].name);
    });

    // Search through all LMS's for selected fields
    lmsData.forEach((lms) => {
      // Track if LMS has been categorized
      let pushed = false;
      // For a single LMS, check for all Tier 1 fields
      tier1FieldIds.forEach((fieldId) => {
        if (Boolean(lms[fieldId])) {
          lmsCount += 1;
        }
      });

      // If all Tier 1 fields match, then push to Tier 1
      if (lmsCount === tier1Count) {
        // If no Tier 2 fields were selected then push to Tier 1
        if (tier1FieldIds.length === tier2FieldIds.length) {
          tier1.push(lms);
          pushed = true;
        }
        // If Tier 2 fields were selected, check for all Tier 1 & Tier 2 fields
        if (tier1FieldIds.length < tier2FieldIds.length) {
          // Reset Counter
          lmsCount = 0;

          // Check for all Tier 1 & 2 fields
          tier2FieldIds.forEach((fieldId) => {
            if (Boolean(lms[fieldId])) {
              lmsCount += 1;
            }
          });
          // If all Tier 2 fields match, then push to Tier 2 otherwise push Tier 1
          if (lmsCount === tier2Count) {
            tier2.push(lms);
            pushed = true;
          } else {
            tier1.push(lms);
            pushed = true;
          }
        }
      }
      // If the LMS hasn't been pushed, pushed to Tier 3
      if (!pushed) {
        tier3.push(lms);
      }
      // Reset Counter
      lmsCount = 0;
    });

    setResults([
      {
        name: 'Tier 1 - Required',
        fields: tier1FieldNames,
        items: tier1, // array of tier 1 lms
      },
      {
        name: 'Tier 2 - Preferred',
        fields: tier2FieldNames,
        items: tier2, // array of tier 2 lms
      },
      {
        name: 'Tier 3 - Optional',
        fields: tier3FieldNames,
        items: tier3, // array of tier 3 lms
      },
    ]);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const result = checkForSubmissionErrors();
    if (result.success) {
      sortLms();
    }

    // Set scroll to top of page
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    // seedDiscoveryData();
    // seedLmsData();
  }, []);

  useEffect(() => {
    if (_isFirstRun.current) {
      _isFirstRun.current = false;
    }
    getDiscoveryData();
    getLmsData();
    return () => (_isMounted.current = false);
  }, []);

  return (
    <>
      <Header />
      <section className={styles.rowContainer}>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleOnSubmit}>
            <h1 className={styles.title}>Learning Management System Match</h1>
            {errorMessage && (
              <div className={styles.errorMessage}>*{errorMessage}</div>
            )}
            {discoveryData.map(({ id, label, subfields, errorMessage }) => {
              return (
                <div key={id}>
                  <Radio
                    id={id}
                    name={label}
                    styleType="category"
                    label={label}
                    options={options}
                    errorMessage={errorMessage}
                    handleOnChange={handleOnChange}
                  />
                  {subfields.map(({ id, label, errorMessage }) => (
                    <Radio
                      key={id}
                      id={id}
                      name={label}
                      styleType="subcategory"
                      label={label}
                      options={options}
                      errorMessage={errorMessage}
                      handleOnChange={handleOnChange}
                    />
                  ))}
                </div>
              );
            })}
            <Button type="submit" text="Submit" />
          </form>
        </div>
        {!!results.length && (
          <div className={styles.resultsDisplay}>
            <h1 className={styles.title}>Results</h1>
            <div className={styles.resultsContainer}>
              {results.map((result) => (
                <div className={styles.result} key={result.name}>
                  <h2 className={styles.subTitle}>{result.name}</h2>
                  {/* Fields */}
                  <div className={styles.fieldContainer}>
                    <h3 className={styles.header}>Selected Fields</h3>
                    {result.fields.map((field) => (
                      <div key={field} className={styles.item}>
                        {field}
                      </div>
                    ))}
                  </div>
                  {/* Results */}
                  <div className={styles.resultContainer}>
                    <h3 className={styles.header}>Results</h3>
                    {result.items.map((item) => (
                      <div key={item.lms} className={styles.item}>
                        {item.lms}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Discovery;

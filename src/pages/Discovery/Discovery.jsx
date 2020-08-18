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
// import seed from '../../firebase/seed';

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

  const checkForSubmissionErrors = () => {
    console.log(discoveryData);
    let success = true;
    discoveryData.forEach((field) => {
      if (!form[field.label]) {
        field.errorMessage = `${field.label} is a required field.`;
        success = false;
      }
      field.subfields.forEach((subfield) => {
        if (!form[subfield.label]) {
          subfield.errorMessage = `${subfield.label} is a required field.`;
          success = false;
        }
      });
    });
    setDiscoveryData(discoveryData);
    return success;
  };

  const sortLms = () => {
    let tier1Count = 0;
    let tier2Count = 0;
    let lmsCount = 0;
    const tier1Fields = [];
    const tier2Fields = [];
    const tier3Fields = [];
    const tier1 = [];
    const tier2 = [];
    const tier3 = [];

    // Create an array of all selected fields
    Object.keys(form).forEach((key) => {
      // Grab all Tier 1  & Tier 2 fields
      if (form[key] === 1) {
        tier1Count += 1;
        tier2Count += 1;
        tier1Fields.push(key);
        tier2Fields.push(key);
      }
      if (form[key] === 2) {
        tier2Count += 1;
        tier2Fields.push(key);
      }
      if (form[key] === 0) tier3Fields.push(key);
    });

    // Search through all LMS's for selected fields
    lmsData.forEach((lms) => {
      // Track if LMS has been categorized
      let pushed = false;
      // For a single LMS, check for all Tier 1 fields
      tier1Fields.forEach((key) => {
        if (Boolean(lms[key])) {
          lmsCount += 1;
        }
      });

      // If all Tier 1 fields match, then push to Tier 1
      if (lmsCount === tier1Count) {
        // If no Tier 2 fields were selected then push to Tier 1
        if (tier1Fields.length === tier2Fields.length) {
          tier1.push(lms);
          pushed = true;
        }
        // If Tier 2 fields were selected, check for all Tier 1 & Tier 2 fields
        if (tier1Fields.length < tier2Fields.length) {
          // Reset Counter
          lmsCount = 0;

          // Check for all Tier 1 & 2 fields
          tier2Fields.forEach((key) => {
            if (Boolean(lms[key])) {
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
        fields: tier1Fields,
        items: tier1,
      },
      {
        name: 'Tier 2 - Preferred',
        fields: tier2Fields.slice(tier1Fields.length),
        items: tier2,
      },
      {
        name: 'Tier 3 - Optional',
        fields: tier3Fields,
        items: tier3,
      },
    ]);
  };

  const handleOnChange = (e) => {
    const name = e.target.getAttribute('name');
    const value = Number(e.target.value);
    _isMounted.current &&
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const success = checkForSubmissionErrors();
    if (success) {
    }
    sortLms();

    // Set scroll to top of page
    window.scrollTo(0, 0);
  };

  // useEffect(seed, [])

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
            {discoveryData.map(({ label, subfields, errorMessage }) => {
              return (
                <div key={label}>
                  <Radio
                    name={label}
                    styleType="category"
                    label={label}
                    options={options}
                    errorMessage={errorMessage}
                    handleOnChange={handleOnChange}
                  />
                  {subfields.map(({ label, errorMessage }) => (
                    <Radio
                      key={label}
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

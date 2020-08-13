import React, { useState, useEffect, useRef } from 'react';

import styles from './Discovery.module.css';

// Components
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import ToggleSwitch from '../../components/Radio/Radio';

// Constants
import { auth, firestore } from '../../firebase/firebase.utils';
import DISCOVERY_DATA from '../../firebase/discoverydata';
import LMS_DATA from '../../firebase/lmsdata';
// import seed from '../../firebase/seed';

const Discovery = () => {
  const options = [
    {
      label: 'Need',
      value: 1,
    },
    {
      label: 'Want',
      value: 2,
    },
    {
      label: 'Optional',
      value: 0,
    },
  ];

  const [form, setForm] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [discoveryData, setDiscoveryData] = useState([]);
  const [lmsData, setLmsData] = useState([]);
  const [tier1Results, setTier1Results] = useState([]);
  const [tier2Results, setTier2Results] = useState([]);
  const [tier3Results, setTier3Results] = useState([]);
  const _isMounted = useRef(true);
  const _isFirstRun = useRef(true);

  const handleOnChange = (e) => {
    const name = e.target.getAttribute('name');
    const value = Number(e.target.value);
    _isMounted.current &&
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let tier1Count = 0;
    let tier2Count = 0;
    let lmsCount = 0;
    const tier1Fields = [];
    const tier2Fields = [];
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
    });

    // Search through all LMS's for selected fields
    lmsData.forEach((lms) => {
      // Check for all Tier 1 fields
      tier1Fields.forEach((key) => {
        // Check if LMS has requested field
        console.log(lms.lms);
        console.log(lms[key]);
        if (Boolean(lms[key])) {
          lmsCount += 1;
        }
      });
      // If all Tier 1 fields match, then push to Tier 1
      if (lmsCount === tier1Count) {
        // Check if Tier 2 Fields were selected, otherwise push Tier 1
        if (tier2Fields.length !== tier1Fields.length) {
          // Reset Counter
          lmsCount = 0;

          // Check for all Tier 2 fields
          tier2Fields.forEach((key) => {
            // Check if LMS has requested field
            if (Boolean(lms[key])) {
              lmsCount += 1;
            }
          });
          // If all Tier 2 fields match, then push to Tier 2 otherwise push Tier 1
          if (lmsCount === tier2Count) {
            tier2.push(lms);
          } else {
            tier1.push(lms);
          }
        } else {
          tier1.push(lms);
        }
      } else {
        tier3.push(lms);
      }
      // Reset Counter
      lmsCount = 0;
    });
    console.log('form', form);
    console.log('tier1', tier1);
    console.log('tier2', tier2);
    console.log('tier3', tier3);
    setTier1Results(tier1);
    setTier2Results(tier2);
    setTier3Results(tier3);
  };

  const getLmsData = async () => {
    setLmsData(LMS_DATA);
    console.log(LMS_DATA);
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
    console.log(fields);
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

  useEffect(() => {
    if (_isFirstRun.current) {
      _isFirstRun.current = false;
    }
    getDiscoveryData();
    getLmsData();
    // seed();
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
            {discoveryData.map(({ label, subfields }) => {
              return (
                <div key={label}>
                  <ToggleSwitch
                    name={label}
                    styleType="category"
                    label={label}
                    options={options}
                    handleOnChange={handleOnChange}
                  />
                  {subfields.map(({ label }) => (
                    <ToggleSwitch
                      key={label}
                      name={label}
                      styleType="subcategory"
                      label={label}
                      options={options}
                      handleOnChange={handleOnChange}
                    />
                  ))}
                </div>
              );
            })}
            <Button type="submit" text="Submit" />
          </form>
        </div>
        <div className={styles.resultContainer}>
          <h1 className={styles.title}>Results</h1>
          <div className={styles.subTitle}>Tier 1</div>
          {tier1Results.map((result) => (
            <div key={result.lms}>{result.lms}</div>
          ))}
          <div className={styles.subTitle}>Tier 2</div>
          {tier2Results.map((result) => (
            <div key={result.lms}>{result.lms}</div>
          ))}
          <div className={styles.subTitle}>
            Other Systems You May Be Interested In
          </div>
          {tier3Results.map((result) => (
            <div key={result.lms}>{result.lms}</div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Discovery;

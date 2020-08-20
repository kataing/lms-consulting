import { firestore } from './firebase.utils';
import DISCOVERY_DATA from './discoverydata';
import LMS_DATA from './lmsdata';

const seedDiscoveryData = async () => {
  const data = DISCOVERY_DATA;
  for (let i = 0; i < data.length; i++) {
    await firestore.collection('discovery').doc(data[i].id).set(data[i]);
  }
};

const seedLmsData = async () => {
  const data = LMS_DATA;
  for (let i = 0; i < data.length; i++) {
    await firestore.collection('lms').doc(data[i].id).set(data[i]);
  }
};

export { seedDiscoveryData, seedLmsData };

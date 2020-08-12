import { firestore } from './firebase.utils';
import DISCOVERY_DATA from './discoverydata';

const data = DISCOVERY_DATA;

const seed = async () => {
  for (let i = 0; i < data.length; i++) {
    await firestore.collection('discovery').doc(data[i].label).set(data[i]);
  }
};

export default seed;

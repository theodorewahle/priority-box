import firebase from 'firebase';

import { GET_PRIORITIES_SUCCESS, POST_PRIORITY_SUCCESS } from './Actions';

export const getPriorities = () => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    console.log('attempting to get priorities');
    firebase
      .database()
      .ref(`users/${currentUser.uid}/priorities`)
      .orderByChild('rank')
      .on(
        'value',
        snapshot => {
          console.log(snapshot.val());
          if (snapshot.val()) {
            dispatch({ type: GET_PRIORITIES_SUCCESS, payload: snapshot.val() });
          }
        },
        function(errorObject) {
          console.log(errorObject);
        }
      );
  };
};

export const postPriority = ({ text, rank }) => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/priorities`)
      .push({ text, rank })
      .then(() => {
        dispatch({ type: POST_PRIORITY_SUCCESS });
      })
      .catch(error => console.log(error));
  };
};

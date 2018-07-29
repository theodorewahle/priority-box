import firebase from 'firebase';

import { GET_PRIORITIES_SUCCESS, POST_PRIORITY_SUCCESS, DELETE_PRIORITY_SUCCESS } from './Actions';

export const getPriorities = () => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase
      .database()
      .ref(`users/${currentUser.uid}/priorities`)
      .orderByChild('rank')
      .on(
        'value',
        snapshot => {
          if (snapshot.val()) {
            dispatch({ type: GET_PRIORITIES_SUCCESS, payload: snapshot.val() });
          } else if (snapshot.val() === null) {
            dispatch({ type: GET_PRIORITIES_SUCCESS, payload: {} });
          }
        },
        errorObject => {
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

export const deletePriority = key => {
  firebase
    .database()
    .ref(`users/${firebase.auth().currentUser.uid}/priorities/${key}`)
    .remove();
};

export const updatePriorities = priorities => {
  firebase
    .database()
    .ref(`users/${firebase.auth().currentUser.uid}/priorities`)
    .set(priorities);
};

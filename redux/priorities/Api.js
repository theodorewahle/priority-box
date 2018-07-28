import firebase from 'firebase';

import { GET_PRIORITIES_SUCCESS, POST_PRIORITY_SUCCESS, DELETE_PRIORITY_SUCCESS } from './Actions';

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

export const deletePriority = ({ rank }) => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    const priorityRef = firebase.database().ref(`users/${currentUser.uid}/priorities`);
    root.on('value', snapshot => {
      Object.keys(snapshot.val()).map(priority => {
        const obj = snapshot.val();
        if (obj[priority].rank === rank) {
          priorityRef
            .child(priority)
            .remove()
            .then(() => {
              dispatch({ type: DELETE_PRIORITY_SUCCESS });
            });
        }
      });
    });
  };
};

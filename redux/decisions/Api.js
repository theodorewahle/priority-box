import firebase from 'firebase';
import { GET_DECISIONS_SUCCESS, POST_DECISION_SUCCESS } from './Actions';

export const getDecisions = () => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase
      .database()
      .ref(`users/${currentUser.uid}/decisions`)
      .orderByChild('score')
      .on(
        'value',
        snapshot => {
          if (snapshot.val()) {
            dispatch({ type: GET_DECISIONS_SUCCESS, payload: snapshot.val() });
          } else if (snapshot.val() === null) {
            dispatch({ type: GET_DECISIONS_SUCCESS, payload: {} });
          }
        },
        function(errorObject) {
          console.log(errorObject);
        }
      );
  };
};

export const postDecision = decision => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/decisions`)
      .push(decision)
      .then(() => {
        dispatch({ type: POST_DECISION_SUCCESS });
      })
      .catch(error => console.log(error));
  };
};

export const deleteDecision = key => {
  firebase
    .database()
    .ref(`users/${firebase.auth().currentUser.uid}/decisions/${key}`)
    .remove();
};

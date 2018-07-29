import firebase from 'firebase';
import { GET_DECISIONS_SUCCESS, POST_DECISION_SUCCESS } from './Actions';

export const getDecisions = () => {
  const { currentUser } = firebase.auth();
  console.log('getting decisions');
  return dispatch => {
    firebase
      .database()
      .ref(`users/${currentUser.uid}/decisions`)
      .orderByChild('score')
      .on(
        'value',
        snapshot => {
          console.log(snapshot.val());
          if (snapshot.val()) {
            dispatch({ type: GET_DECISIONS_SUCCESS, payload: snapshot.val() });
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
  console.log(decision);
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

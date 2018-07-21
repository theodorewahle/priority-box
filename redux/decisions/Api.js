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

export const postPriority = ({ text, rank }) => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/decisions`)
      .push({ text, score })
      .then(() => {
        dispatch({ type: POST_DECISION_SUCCESS });
      })
      .catch(error => console.log(error));
  };
};

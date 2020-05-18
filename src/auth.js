import firebase from "./firebase";

export const LoginWithGoogle = async () => {
  return firebase
    .auth()
    .signInWithPopup(
      new firebase.auth.GoogleAuthProvider().addScope(
        "https://www.googleapis.com/auth/drive"
      )
    );
};

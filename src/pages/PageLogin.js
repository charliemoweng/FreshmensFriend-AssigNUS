import { Button } from "@material-ui/core";
import { FirebaseAuthConsumer } from "@react-firebase/auth";

function PageLogin() {
  //console.log("page login called");
  const handleGoogleSignIn = (firebase) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  };

  return (
    <>
      <div className="PageLogin">
        <h1>Login to AssigNUS v0.9.3</h1>
        <FirebaseAuthConsumer>
          {({ firebase }) => (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleGoogleSignIn(firebase)}
            >
              Sign in with Google
            </Button>
          )}
        </FirebaseAuthConsumer>
      </div>
    </>
  );
}

export default PageLogin;

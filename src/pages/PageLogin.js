import { Button } from "@material-ui/core";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import assigNUSPoster from "./assigNUSPoster.jpg";
import styles from "./PageLogin.module.css";

function PageLogin() {
  //console.log("page login called");
  const handleGoogleSignIn = (firebase) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  };

  return (
    <div className="PageLogin">
      <h1>Login to AssigNUS v1.1.0</h1>
      <div className={styles.pageChild}>
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
      <div className={styles.pageChild}>
        <img src={assigNUSPoster} alt="poster" style={{ marginTop: "2rem" }} />
      </div>
    </div>
  );
}

export default PageLogin;

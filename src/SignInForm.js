import { Typography, FormGroup, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import { useState } from 'react';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui'
function SignInForm(){
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

function signIn(email, password){
  console.log("I'm here")
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    console.log("Signed in")
    // Signed in
    var user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}
  return <FormGroup>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" value={email} onChange={(event) => setEmail(event.target.value)}></Input>
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
  <InputLabel htmlFor="my-input">Password</InputLabel>  
  <Input id="my-input" aria-describedby="my-helper-text" value={password} onChange={(event) => setPassword(event.target.value)}/>
  <Button type="submit" label="submit" onClick={() => signIn(email, password)}>Submit</Button>
  </FormGroup>

}

export default SignInForm
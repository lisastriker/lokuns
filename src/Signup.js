import { Typography, FormGroup, InputLabel as InputLabel1, Input as Input1, FormHelperText, Button as Button1} from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import firebase from '@firebase/app';
require('firebase/auth');
var firebaseui = require('firebaseui');
require('firebase/auth')
const Button = styled(Button1)`
  width:80%;
  background-color:#1B203C;
  border-radius:10px;
  color:white;
  :hover{
    background-color:grey;
  }
`
const InputLabel = styled(InputLabel1)`
  font-family: roboto;
  font-size: 1.5em;
  font-weight: 400;
  width: 100%;
  text-align:center;
  margin-top:10px;
  margin-bottom:40px;

`


const Input = styled(Input1)`
  padding-left:10px;  
  background:white;
  width:100%;
  border:solid black 0.5px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  margin-bottom:10px;
  border-radius:5px;
`

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

`
const Container = styled.div`
  border-radius:10px;
  height: 100%;
  width: 100%;
  background-color:white;
  display:flex;
  justify-content: center;
  align-items: center;
  
`

const FormGroupStyled = styled(FormGroup)`
  padding: 50px;
  border: 2px solid black;
  display:flex
  justify-content:start;
  align-items:start;
`
function SignUp(){
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [name, setName] = useState("")
const [address, setAddress] = useState("")
const [medical, setMedical] = useState("")

function signUp(email, password){
  console.log("Here")
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    console.log(userCredential.user)
    var user = userCredential.user;
    
    // ...
  })
  .catch((error) => {
    console.log(error.code)
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
}

  return <MainContainer ><Container><FormGroupStyled>
  <InputLabel htmlFor="my-input">Sign Up</InputLabel>  
  <Input placeholder="Name" id="my-input" aria-describedby="my-helper-text" value={name} onChange={(event) => setName(event.target.value)}/>
  <Input placeholder="Address" id="my-input" aria-describedby="my-helper-text" value={address} onChange={(event) => setAddress(event.target.value)}/>
  <Input placeholder="Email" id="my-input" aria-describedby="my-helper-text" value={email} onChange={(event) => setEmail(event.target.value)}></Input>
  <Input placeholder="Password" id="my-input" aria-describedby="my-helper-text" value={password} onChange={(event) => setPassword(event.target.value)}/>
  <Input placeholder="Medical License Number"id="my-input" aria-describedby="my-helper-text" value={medical} onChange={(event) => setMedical(event.target.value)}/>
  <Button type="submit" label="submit" onClick={() => signUp(email, password)}>Submit</Button>
  </FormGroupStyled>
  </Container>
  </MainContainer>

}

export default SignUp
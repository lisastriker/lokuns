import { Typography, FormGroup, InputLabel as InputLabel1, Input as Input1, FormHelperText, Button } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
var firebase = require('firebase');
var firebaseui = require('firebaseui');

const InputLabel = styled(InputLabel1)`
  margin-top:10px;
  margin-bottom:5px;
`


const Input = styled(Input1)`
  background:white;
  width:80%;
  border:solid black 0.5px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  margin-bottom:5px;
  border-radius:5px;
`

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

`
const Container = styled.div`
  padding:20px;
  width:50%;
  background-color:white;
  display:flex;
  justify-content: center;
  align-items: center;
  
`

const FormGroupStyled = styled(FormGroup)`
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

function signUp(){
  firebase.auth().createUserWithEmailAndPassword(email, password, name, address, medical)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
}

  return <MainContainer ><Container><FormGroupStyled>
  <InputLabel htmlFor="my-input">Name</InputLabel>  
  <Input id="my-input" aria-describedby="my-helper-text" value={name} onChange={(event) => setName(event.target.value)}/>
  <InputLabel htmlFor="my-input">Address</InputLabel>  
  <Input id="my-input" aria-describedby="my-helper-text" value={address} onChange={(event) => setAddress(event.target.value)}/>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" value={email} onChange={(event) => setEmail(event.target.value)}></Input>
  <InputLabel htmlFor="my-input">Password</InputLabel>  
  <Input id="my-input" aria-describedby="my-helper-text" value={password} onChange={(event) => setPassword(event.target.value)}/>
  <Button type="submit" label="submit" onClick={() => signUp(email, password, name, address, medical)}>Submit</Button>
  <InputLabel htmlFor="my-input">Medical License Number</InputLabel>  
  <Input id="my-input" aria-describedby="my-helper-text" value={medical} onChange={(event) => setMedical(event.target.value)}/>
  </FormGroupStyled>
  </Container>
  </MainContainer>

}

export default SignUp
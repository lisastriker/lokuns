import SignInForm from './SignInForm'
import Signup from './SignUp'
const { Typography } = require('@material-ui/core');
var firebase = require('firebase');
var firebaseui = require('firebaseui');



function User(){
  return <Signup></Signup>
}

export default User
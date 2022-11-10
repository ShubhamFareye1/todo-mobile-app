import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {login,addUserDetail} from '../api/LoginApi'

function LoginForm({navigation}, props) {
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValidationColor, setEmailValidationColor] = useState('');
  const [passwordValidationColor, setPasswordValidationColor] = useState('');

  const onChangeEmail = email => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    console.log(!reg.test(email));
    return reg.test(email) ? true : false;
  };

  const onChangePassword = password => {
    let reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return reg.test(password) ? true : false;
  };

  useEffect(() => {
    if (onChangePassword(password)) {
      setPasswordValidationColor('green');
    } else {
      setPasswordValidationColor('red');
    }
    console.log('onchange');
  }, [password]);

  useEffect(() => {
    if (onChangeEmail(email)) {
      setEmailValidationColor('green');
    } else {
      setEmailValidationColor('red');
    }
    console.log('onchange',email);
  }, [email]);

  const userLogin = async() => {
    console.log('Email - Password',email,password);
    if (email === '' && password === '') { 
      alert('Empty Email & password');
    } else {
       const loginStatus =await login({email,password});
       console.log('res = ' ,loginStatus);
       if(loginStatus==200){
        addUserDetail();
        navigation.navigate('User');      
       }
   }
  };

  return (
    <SafeAreaView
      style={{
        flex: 2,
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          marginTop: 7,
          color: 'black',
          fontWeight: 'bold',
        }}>
        Log In                        
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        borderBottomColor={emailValidationColor}
        placeholderTextColor="gray"
        placeholder="Your email Id"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        borderBottomColor={passwordValidationColor}
        placeholderTextColor="gray"
        placeholder="Password"
        keyboardType="default"
      />
      <TouchableOpacity style={styles.button} onPress={userLogin}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
          Log-In
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          textAlign: 'center',
          color: 'black',
          marginTop: 5,
        }}>
        Don't have an account?&nbsp;
        <Text
          style={{fontWeight: 'bold'}}
          onPress={() => {
            console.log(props.loginForm);
            props.setLoginForm(props.loginForm ? false : true);
          }}>
          Sign-up
        </Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomWidth: 1,
    margin: 22,
    padding: 10,
    color: 'gray',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#841584',
    padding: 10,
    marginLeft: 25,
    marginTop: 8,
    marginRight: 25,
  },
});

export default LoginForm;

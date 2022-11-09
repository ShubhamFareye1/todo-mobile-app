import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteAll, deleteAllvalue } from '../Database/realm';

function LoginForm({navigation}, props) {
  const [email,setEmail] = useState();
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

  const addUserDetail = async(userMail) =>{
     fetch('http://172.16.33.228:8080/todo/list')  // FarEye IP - 172.16.33.228
    //fetch(`http://192.168.1.57:8080/user?username=${userMail}`)      // Hostel IP
      .then(response => response.json())
      .then(async json => {
        console.log(json);
        await AsyncStorage.setItem('userDetails', JSON.stringify(json));
      })
      .catch(error => {
        console.error(error);
      });
  }

  const userLogin = async() => {
   // if (email === '' && password === '') {
    addUserDetail(email);
            navigation.navigate('User');
            return;
    if(false){
      alert('Empty Email & password');
    } else {
      
      const data = await AsyncStorage.getItem('userDetails');
      console.log('user data',JSON.parse(data));
      fetch(
         'http://172.16.33.228:8080/api/login?username=' +   // Fareye IP
      //  'http://192.168.1.57:8080/api/login?username=' +       // Hostel IP
          encodeURIComponent('shubhampatidar@gmail.com') +
          '&password=' +
          encodeURIComponent('@Shubh123'),
        {
          method: 'POST',
        },
      )
        .then(res => {
          console.log(res.status);
          console.log(res.status === 200);
        //  if (res.status === 200) {
          if(true){
            console.log('data called');
            addUserDetail(email);
            navigation.navigate('User');
          } else {
            alert('Invalid Credentials');
          }
        })
        .catch(error => {
          console.error(error);
        });
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

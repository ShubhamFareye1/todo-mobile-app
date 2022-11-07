import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const user = [
  {
    email: 'shubh@gmail.com',
    password: '@Far123',
  },
];

function LoginForm({navigation}, props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [borderColorEmail, setBorderColorEmail] = useState('');
  const [borderColorPassword, setBorderColorPassword] = useState('');

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
    if (onChangeEmail(email)) {
      setBorderColorEmail('green');
    } else {
      setBorderColorEmail('red');
    }
    console.log('onchange');
  }, [email]);

  useEffect(() => {
    if (onChangePassword(password)) {
      setBorderColorPassword('green');
    } else {
      setBorderColorPassword('red');
    }
    console.log('onchange');
  }, [password]);

  const addUserDetail = async() =>{
    //await AsyncStorage.setItem('user', JSON.stringify(email));
    fetch('http://172.16.33.228:8080/todo/list')
      .then(response => response.json())
      .then(async (json) => {
        console.log('todo',json);
        await AsyncStorage.setItem('todos',JSON.stringify(json));
      })
      .catch(error => {
        console.error(error);
      });

  }

  const addNewTodo = async() => {
    if (email === '' && password === '') {
      alert('Empty Email & password');
    } else {
      console.log('hello');
      fetch(
        'http://172.16.33.228:8080/api/login?username=' +
          encodeURIComponent(email) +
          '&password=' +
          encodeURIComponent(password),
        {
          method: 'POST',
        },
      )
        .then(res => {
          console.log(res.status);
          console.log(res.status === 200);
          if (res.status === 200) {
            //AsyncStorage.setItem('userMail', email);
            addUserDetail();
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
        borderBottomColor={borderColorEmail}
        placeholderTextColor="gray"
        placeholder="Your email Id"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        borderBottomColor={borderColorPassword}
        placeholderTextColor="gray"
        placeholder="Password"
        keyboardType="default"
      />
      <TouchableOpacity style={styles.button} onPress={addNewTodo}>
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

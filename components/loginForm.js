import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

function loginForm(props) {
  const [text1, onChangeText1] = React.useState(null);
  const [text2, onChangeText2] = React.useState(null);

  const onPressLearnMore = () => {
    if (text1 === '' && text2 === '') {
      alert('empty user and password');
    } else {
      console.log('user email = ', text1);
      console.log('user Password = ', text2);
    }
  };

  return (
    <SafeAreaView style={{flex: 2, backgroundColor:'white', borderTopRightRadius: 20, borderTopLeftRadius: 20}}>
      <Text
        style={{
        textAlign:'center',
        fontSize:20,
        color:'black',
        fontWeight:'bold'
        }}
       >
        Log In
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText1}
        value={text1}
        placeholderTextColor="gray"
        placeholder="Your email Id"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText2}
        value={text2}
        placeholderTextColor="gray"
        placeholder="Password"
        keyboardType="default"
      />
      <TouchableOpacity style={styles.button} onPress={onPressLearnMore}>
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
            props.setLoginForm(props.loginForm?false:true)}
            }>
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

export default loginForm;

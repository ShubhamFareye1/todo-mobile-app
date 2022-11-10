import React ,{useState} from 'react'
import { View } from 'react-native'
import LoginForm from './src/Components/LoginForm'
import Home from './src/Components/Home'
import SignUpForm from './src/Components/SignUp'
import User from './src/Components/UserItem'
import TodoForm from './src/Components/AddTodo'
import AddTodo from './src/Components/AddTodo'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();


function App(){
 
  return (
    <NavigationContainer>
      
    <Stack.Navigator 
    screenOptions={{headerShown:false}}
    >
      <Stack.Screen
         name="LoginForm"
         component={LoginForm} 
         options={{title:'ToDo App'}}
      />
      <Stack.Screen
         name="Home1"
         component={Home}
      />
        <Stack.Screen
          name="User"
          component={User}
          //options={{ title: 'Welcome' }}
        />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      <Stack.Screen
         name="TodoForm"
         component={TodoForm}
      />
      
      <Stack.Screen
         name="SignUp"
         component={SignUpForm}
      />
      <Stack.Screen
         name="AddTodo"
         component={AddTodo}
      />
      {/* {isLogin?
        <LoginForm loginForm = {isLogin} setLoginForm = {setIsLogin} login={login} setLogin={setLogin}/>:
        <LogoutForm loginForm = {isLogin} setLoginForm = {setIsLogin} />
      } */}
    </Stack.Navigator>
   {/* </View> */}
   </NavigationContainer>
  )
}

export default App
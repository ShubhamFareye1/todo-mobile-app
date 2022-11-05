import React ,{useState} from 'react'
import { View } from 'react-native'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import SignUpForm from './components/SignUp'
import User from './components/UserItem'
import TodoForm from './components/AddTodo'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();


function App() {
  const [isLogin,setIsLogin] = useState(true);
  const [login,setLogin] = useState();
  return (
    <NavigationContainer>
    <View style={{ flex:1 ,backgroundColor:'grey'}}>
      
    <Stack.Navigator>
        <Stack.Screen
          name="User"
          component={User}
          options={{ title: 'Welcome' }}
        />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      <Stack.Screen
         name="TodoForm"
         component={TodoForm}
      />
      <Stack.Screen
         name="Home"
         component={Home}
         options={{title:'ToDo App'}}
      />
      <Stack.Screen
         name="LoginForm"
         component={LoginForm}
      />
      <Stack.Screen
         name="SignUp"
         component={SignUpForm}
      />
      {/* {isLogin?
        <LoginForm loginForm = {isLogin} setLoginForm = {setIsLogin} login={login} setLogin={setLogin}/>:
        <LogoutForm loginForm = {isLogin} setLoginForm = {setIsLogin} />
      } */}
    </Stack.Navigator>
   </View>
   </NavigationContainer>
  )
}

export default App
import React ,{useState} from 'react'
import { Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import LoginForm from './components/loginForm'
import Home from './components/home'
import LogoutForm from './components/logoutForm'
function App() {
  const [isLogin,setIsLogin] = useState(true);

  return (
    <View style={{ flex:1 ,backgroundColor:'grey'}}>

      <Home/>
      {isLogin?
        <LoginForm loginForm = {isLogin} setLoginForm = {setIsLogin}/>:
        <LogoutForm loginForm = {isLogin} setLoginForm = {setIsLogin} />
      }
   </View>
  )
}

export default App
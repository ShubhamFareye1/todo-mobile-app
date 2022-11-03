import React from 'react'
import { Text, View } from 'react-native';

function home() {
  return (
    <View style={{flex:1,justifyContent:'space-between',backgroundColor:'gray'}}>
    <Text style={{fontSize:50,textAlign:'center' ,marginTop:50 , color:'black'}}>ToDo App</Text>
    </View>
  )
}

export default home
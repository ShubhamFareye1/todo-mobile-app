import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity,Image} from 'react-native';
import { style } from '../css/style';

const Item = props => {
  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
          <TouchableOpacity style = {style.AddUserButton} onPress = {() => props.deleteTask(props.task)}>
                <Image style={{height:30,width:30,alignSelf:'center'}} source={require('/home/shubham/Documents/todo_mobile_app/src/static/persional.png')} />
          </TouchableOpacity>
        <Text style={styles.task}>{props.task}</Text>
        <View style={{flexDirection:'row'}}>
        
            <TouchableOpacity style = {style.AddUserButton} onPress = {() => props.deleteTask(props.task)}>
                <Image style={{height:30,width:30,alignSelf:'center'}} source={require('/home/shubham/Documents/todo_mobile_app/src/static/delete.png')} />
            </TouchableOpacity>
            <TouchableOpacity style = {style.AddUserButton} onPress = {() => props.updateStatus(props.task)}>
                <Image style={{height:30,width:30,borderRadius: 50}} source={require('/home/shubham/Documents/todo_mobile_app/src/static/select.png')} />
            </TouchableOpacity>
         </View>
      </View>
      </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
 
  },
  taskContainer: {
    backgroundColor: 'gray',
    minHeight:60,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    // paddingHorizontal: 50,
    paddingLeft:20,
    paddingRight:80,
    paddingVertical: 5,
    marginTop: 5,
  },
  task: {
    color: '#fff',
    width: '90%',
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
});

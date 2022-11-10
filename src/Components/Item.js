import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {style} from '../css/style';

const Item = ({task , deleteTask , updateStatus}) => {
  return (
    <View style={style.ItemContainer}>
      <View style={style.taskContainer}>
        {task.type?
          <TouchableOpacity
          style={style.AddUserButton}
          onPress={() => deleteTask(task)}>
          <Image
            style={{height: 30, width: 30, alignSelf: 'center'}}
            source={require('/home/shubham/Documents/todo_mobile_app/src/static/profesional.png')}
          />
          </TouchableOpacity>
          :
          <TouchableOpacity
          style={style.AddUserButton}
          onPress={() => deleteTask(task)}>
          <Image
            style={{height: 30, width: 30, alignSelf: 'center'}}
            source={require('/home/shubham/Documents/todo_mobile_app/src/static/persional.png')}
          />
        </TouchableOpacity>
       }
        
        <Text style={style.task}>{task.title}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={style.AddUserButton}
            onPress={() => deleteTask(task)}>
            <Image
              style={{height: 30, width: 30, alignSelf: 'center'}}
              source={require('/home/shubham/Documents/todo_mobile_app/src/static/delete.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.AddUserButton}
            onPress={() => updateStatus(task)}>
            <Image
              style={{height: 30, width: 30, borderRadius: 50}}
              source={require('/home/shubham/Documents/todo_mobile_app/src/static/select.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Item;

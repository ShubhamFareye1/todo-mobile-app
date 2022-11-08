import React, {useState} from 'react';
import { NavigationContainer, useIsFocused} from '@react-navigation/native';
import {StatusBar,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image} from 'react-native';
import Item from './Item';
// import AddTodo from './AddTodo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteObject, fetchObject} from '../Database/realm';
import {style} from '../css/style';

function UserItem({navigation}) {
  const [addTodo, setAddTodo] = React.useState(false);
  const [todoList, setTodoList] = React.useState([]);
  const [isSelected, setIsSelected] = useState("ToDo");
  const [todoUpdate,setTodoUpdate] = useState(1);

  const deleteTask = task => {
    for (let i = 0; i < todoList.length; i++) {
      if (task === todoList[i].title) {
        console.log(todoList[i]);
        deleteObject(todoList[i]);
        console.log('data deleted', todoList[i]);
        setTodoUpdate(todoUpdate+1);
        break;
      }
    }
    console.log('props key', task);
  };

  React.useEffect(() => {
    const fetchData = async() => {
      console.log('table data fetch');
      console.log(await fetchObject('todo1'),'fdgycdfgchjvvfghjvgf');
      setTodoList(await fetchObject('todo1'));
    };
    fetchData();
  }, [useIsFocused()],todoUpdate);

  return (
    <View style={style.container}>
      <View style={{flex: 1, backgroundColor: '#000080'}}>
        {addTodo ? (
          // <AddTodo addTodo={addTodo} setAddTodo={setAddTodo} />
          navigation.navigate('AddTodo')
        ) : (
          <View style={{flexDirection: 'row'}}>
            <Text style={style.ListHeader}>
              Hello, Shubham
            </Text>
          </View>
        )}
      </View>
      {!addTodo && (
        <View style={style.ListContainer}>
          <View style={{ alignItems:'center',justifyContent:'center'}}>
          <View  elevation = {5} style={style.show}>
            <Text style={{color:(isSelected=="ToDo"?"#000080":"black") ,fontWeight:'bold',fontSize:15}} onPress = {()=>setIsSelected("ToDo")} >ToDo</Text> 
            <Text style={{color:(isSelected=="Doing"?"#000080":"black"),fontWeight:'bold',fontSize:15}} onPress = {()=>setIsSelected("Doing")}>Doing</Text> 
            <Text style={{color:(isSelected=="Done"?"#000080":"black"),fontWeight:'bold',fontSize:15}} onPress = {()=>setIsSelected("Done")}>Done</Text>
          </View>
          </View>
          <ScrollView style={{marginTop: 20}}>
            {todoList &&
              todoList.map((data, id) => (
                <Item key={id} task={data.title} deleteTask={deleteTask} />
              ))}
          </ScrollView>
          <TouchableOpacity style = {style.AddUserButton} onPress = {() => navigation.navigate('AddTodo')}>
             <Image source={require('/home/shubham/Documents/todo_mobile_app/src/static/addIcon.png')} />
         </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default UserItem;

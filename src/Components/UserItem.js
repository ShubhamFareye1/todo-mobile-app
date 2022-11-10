import React, {useState} from 'react';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Item from './Item';
// import AddTodo from './AddTodo';

import {
  deleteObject,
  fetchObject,
  getTodosByStatus,
  updateObject,
} from '../Database/realm';
import {style} from '../css/style';

function UserItem({navigation}) {
  const [addTodo, setAddTodo] = React.useState(false);
  const [todoList, setTodoList] = React.useState([]);
  const [isSelected, setIsSelected] = useState('ToDo');
  const [todoUpdate, setTodoUpdate] = useState(1);

  const deleteTask = async task => {
   // console.log(task, 'delete task called');
    for (let i = 0; i < todoList.length; i++) {
      if (task.id === todoList[i].id) {
        console.log('delete task', todoList[i]);
        await deleteObject(todoList[i]);
        console.log('data deleted', todoList[i]);
        setTodoUpdate(todoUpdate + 1);
        break;
      }
    }
    console.log('props key', task);
  };

  const updateStatus = async task => {
    console.log('update is called-----------------------------------');
    for (let i = 0; i < todoList.length; i++) {
      if (task.id === todoList[i].id) {
        await updateObject(todoList[i].id);
        setTodoUpdate(todoUpdate + 1);
        break;
      }
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      if (isSelected === 'ToDo') setTodoList(await fetchObject('todo'));
      else setTodoList(await getTodosByStatus(isSelected));
    };
    fetchData();
  }, [isSelected]);

  React.useEffect(() => {
    const fetchData = async () => {
      console.log('table data fetch');
      if(isSelected==='ToDo') setTodoList(await fetchObject('todo'));
      else setTodoList(await getTodosByStatus(isSelected)); 
    };
    fetchData();
  }, [useIsFocused(), todoUpdate]);

  return (
    <View style={style.container}>
      <View style={{flex: 1, backgroundColor: '#000080'}}>
        {/* <AddTodo addTodo={addTodo} setAddTodo={setAddTodo} /> */}
        <View style={{flexDirection: 'row'}}>
          <Text style={style.ListHeader}>Hello, Shubham</Text>
        </View>
      </View>
      <View style={style.ListContainer}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View elevation={5} style={style.show}>
            <Text
              style={{
                color: isSelected == 'ToDo' ? '#9A2617' : 'black',
                fontWeight: 'bold',
                fontSize: 18,
              }}
              onPress={() => setIsSelected('ToDo')}>
              ToDo
            </Text>
            <Text
              style={{
                color: isSelected == 'Doing' ? '#9A2617' : 'black',
                fontWeight: 'bold',
                fontSize: 18,
              }}
              onPress={() => setIsSelected('Doing')}>
              Doing
            </Text>
            <Text
              style={{
                color: isSelected == 'Done' ? '#9A2617' : 'black',
                fontWeight: 'bold',
                fontSize: 18,
              }}
              onPress={() => setIsSelected('Done')}>
              Done
            </Text>
          </View>
        </View>
        <FlatList
          data={todoList}
          renderItem={data => (
            <Item
              key={data.id}
              task={data.item}
              deleteTask={deleteTask}
              updateStatus={updateStatus}
            />
          )}
        />
        <TouchableOpacity
          style={style.AddUserButton}
          onPress={() => navigation.navigate('AddTodo')}>
          <Image
            source={require('/home/shubham/Documents/todo_mobile_app/src/static/addIcon.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default UserItem;

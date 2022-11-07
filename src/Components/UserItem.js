import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import Item from './Item';
import AddTodo from './AddTodo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useIsFocused} from '@react-navigation/native';


function UserItem() {

  const [todos,setTodos] = React.useState([]);
  const [addTodo, setAddTodo] = React.useState(false);
  const [todoList,setTodoList] = React.useState([]);
  
  const userDetails = userMail => {
    fetch(`http://172.16.33.228:8080/user?username=${userMail}`)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        AsyncStorage.setItem('userDetails', JSON.stringify(json));
        printData();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const usermail = async () => {
    const value = await AsyncStorage.getItem('user');
    const userMail = JSON.parse(value);
    console.log(userMail);
    userDetails(userMail);
    // await AsyncStorage.setItem('userDetails',userData);
    // printData();
  };

  const printData = async () => {
    const value = await AsyncStorage.getItem('userDetails');
    console.log(JSON.stringify(value));
  };

  // const getTodo = async() =>{
  //   const value = await AsyncStorage.getItem('todos');
  //   let todo = JSON.parse(value);
  //   console.log(JSON.stringify(todo));
  //   todos.push('todo data',JSON.stringify(todo));
  // }

  const deleteTask = async task => {
    console.log('props key',task);
    for(let i=0;i<todoList.length;i++){
        if(task===todoList[i].title){
          //setTodos(todos.remove(i));
          var filtered = todoList.filter(function(value, index, arr){ 
            return index !== i;
          });
          setTodoList(filtered);
          await AsyncStorage.setItem('todos',JSON.stringify(todoList));
          break;
        }
        console.log(todoList);
    }

  };

  React.useEffect(()=>{
      const fetchData = async() =>{
      const data = await AsyncStorage.getItem('todos');
      console.log("%^%^%^%%^",data);
      const todo = JSON.parse(data);
      console.log("88888888888888888",data);
      setTodoList(todo);
      }
    fetchData();
  },[useIsFocused()])

  return (
    <ScrollView style={{flex: 1}}>
      {addTodo ? (
        <AddTodo
          addTodo={addTodo}
          setAddTodo={setAddTodo}
        />
      ) : (
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginLeft: 25,
              marginBottom: 25,
              marginTop: 15,
            }}>
            Hello, 
            {/* {todos[0].user}{''} */}
            {/* {console.log('hello shubham',(AsyncStorage.getItem('user')))} */}
            {AsyncStorage.getItem('user').userMail}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Text
              onPress={() => setAddTodo(true)}
              style={{fontSize: 30, fontWeight: 'bold', margin: 20}}>
              +
            </Text>
          </Text>
          {todoList.map((data) => (
            <Item task={data.title} deleteTask={deleteTask} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

export default UserItem;

import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import Item from './Item';
import AddTodo from './AddTodo';
const todo = [
  {
    user: 'Shubham',
    title: 'React native day 1',
    status: 'work done',
  },
  {
    title: 'React native day 2',
    status: 'work done',
  },
  {
    title: 'React native day 3',
    status: 'work done',
  },
  {
    title: 'React native day 4',
    status: 'work done',
  },
  {
    title: 'React native day 5',
    status: 'work done',
  },
];
function UserItem() {
  const [addTodo, setAddTodo] = React.useState(true);

  const appendTodo = todoData => {
    todo.push(todoData);
  };

  const deleteTask = task => {
    console.log(task);
  };

  return (
    <ScrollView style={{flex: 1}}>
      {addTodo ? (
        <AddTodo
          addTodo={addTodo}
          appendTodo={appendTodo}
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
            Hello, {todo[0].user}{' '}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Text
              onPress={() => setAddTodo(true)}
              style={{fontSize: 30, fontWeight: 'bold', margin: 20}}>
              +
            </Text>
          </Text>

          {todo.map(data => (
            <Item task={data.title} deleteTask={deleteTask} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

export default UserItem;

import React , {useState} from 'react'
import { SafeAreaView, StyleSheet, TextInput ,  TouchableOpacity ,Text} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddTodo(props) {
    const [title, onChangeTitle] = useState('');
    const [body, onChangeBody] = useState('');
    const [status, onChangeStatus] = useState('');

    const onPressAddTodo = async() =>{
        if(title==='' && body==='' && status===''){
            alert('empty user and password');
        }
        else{
            // props.appendTodo({title:title,body:title,status:status});
            // console.log(props);
            // 
            const data = await AsyncStorage.getItem('todos');
            const todos = JSON.parse(data);
            todos.push({
              title: title,
              type: todoType,
              status:status
            });
            await AsyncStorage.setItem('todos', JSON.stringify(todos));
            console.log(todos);
            props.setAddTodo(false);
        }
    }
    const changeTodoState = () =>{
        console.log('props',props);
        props.setAddTodo(false);
    }
    
  return (
    <SafeAreaView style={{backgroundColor:'white', borderTopRightRadius: 20, borderTopLeftRadius: 20}}>
        <Text
          style={{
            textAlign:'center',
            fontSize:25,
            color:'black',
            fontWeight:'bold',
            marginTop:20,
            
          }}
        >
            Add Todo
            
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTitle}
          value={title}
          placeholderTextColor='gray'
          placeholder="Todo Title"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeBody}
          value={body}
          placeholderTextColor='gray'
          placeholder="Body"
          keyboardType="default"
        />
         {/* <TextInput
          style={styles.input}
          onChangeText={onChangeStatus}
          value={status}
          placeholderTextColor='gray'
          placeholder="Status"
          keyboardType="default"
        /> */}
        <TouchableOpacity
            style={styles.button}
            onPress={onPressAddTodo}
        >
          <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Add Todo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
            style={styles.button}
            onPress={changeTodoState}
        >
          <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    input: {
      height: 40,
      borderBottomWidth:1,
      margin: 22,
      padding: 10,
      color:'gray'
    },
    button: {
        alignItems: "center",
        backgroundColor: "#841584",
        padding: 10,
        marginLeft:25,
        marginTop:8,
        marginRight:25,
        borderRadius:15,
      },
  });

export default AddTodo
import React , {useState} from 'react'
import { SafeAreaView, StyleSheet, TextInput ,  TouchableOpacity ,Text} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveObject } from '../Database/realm';
import DateTimePicker from '@react-native-community/datetimepicker';
import { style } from '../css/style';

//import Realm from '../Database/Realm'

function AddTodo({navigation}) {
    const [title, onChangeTitle] = useState('');
    const [body, onChangeBody] = useState('');
    const [date , setDate] = useState("");
    const [todoStatus, setTodoStatus] = useState("");
    const [TodoType, setTodoType] = useState(true);
    const [showDatePicker,setShowDatePicker] = useState(false);
    //const [status, onChangeStatus] = useState('');

    const onPressAddTodo = () =>{
        if(title==='' && body===''){
            alert('empty user and password');
        }
        else{
            saveObject('todo',{
              title:title,
              body:body,
            })
         //   props.setAddTodo(false);
         navigation.navigate('User');
        }
    }
    const changeTodoState = () =>{
        console.log('props',props);
        props.setAddTodo(false);
    }
    const setDatePickerTrue = () =>{
      setShowDatePicker(true);
    }
    
  return (
    <SafeAreaView style={{backgroundColor:'white', borderTopRightRadius: 20, borderTopLeftRadius: 20,zIndex:10}}>
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
        
        <TouchableOpacity style ={styles.button} onPress= {setDatePickerTrue}>
            <Text style = {{color:'white',fontWeight:'bold',fontSize:15}}>Select Date</Text>
        </TouchableOpacity>

        {showDatePicker && 
        <Text>Hello Called</Text>
        // <DateTimePicker
        //   testID="dateTimePicker"
        //   value={new Date()}
        //   is24Hour={true}
        //   minimumDate={new Date()}
        //   onChange = { (event, selectedDate) => {setDate(selectedDate); setShowDatePicker(false);}}
        // />
        }

         <Text>Selected Date: {date.toLocaleString()}</Text> 
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

export default AddTodo;
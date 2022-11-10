import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Switch,
  Image,
} from 'react-native';
import {saveObject} from '../Database/realm';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import {style} from '../css/style';

function AddTodo({navigation}) {
  const [title, onChangeTitle] = useState('');
  const [body, onChangeBody] = useState('');
  const [date, setDate] = useState('');
  const [time,setTime] = useState(new Date(Date.now()));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  const onTimeSelected = (event,value) =>{
    setTime(value);
    setShowTimePicker(false);
  }

  const onPressAddTodo = () => {
    if (title === '' && body === '') {
      alert('empty user and password');
    } else {
      saveObject('todo', {
        title: title,
        body: body,
        dueDate: date,
        type:isEnabled,
        status: 'Doing',
        dueTime:time,
        dueTime: '',
      });
      //   props.setAddTodo(false);
      navigation.navigate('User');
    }
   };
  
  
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 10,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 25,
          color: 'black',
          fontWeight: 'bold',
          marginTop: 20,
        }}>
        Add Todo
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeTitle}
        value={title}
        placeholderTextColor="gray"
        placeholder="Todo Title"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeBody}
        value={body}
        placeholderTextColor="gray"
        placeholder="Body"
        keyboardType="default"
      />

      {/* <TouchableOpacity style ={style.DateButton} onPress= {setDatePickerTrue}>
            <Text style = {{color:'white',fontWeight:'bold',fontSize:15}}>Select Date</Text>

        </TouchableOpacity> */}
      <View style={style.DateTimeIcon}>
        <TouchableOpacity
          style={style.AddUserButton}
          onPress={()=>setShowDatePicker(true)}>
          <Image
            source={require('/home/shubham/Documents/todo_mobile_app/src/static/dateDark.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.AddUserButton}
          onPress={()=>setShowTimePicker(true)}>
          <Image
            source={require('/home/shubham/Documents/todo_mobile_app/src/static/time1.png')}
          />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          is24Hour={false}
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            setDate(selectedDate.toLocaleString());
            setShowDatePicker(false);
          }}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
        value={time}
        mode={'time'}
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        is24Hour={false}
        minimumDate={new Date()}
        onChange={onTimeSelected}
       />
      )}

      <View style={style.RadioButton}>
        <Text
          style={{
            color: isEnabled ? 'gray' : 'blue',
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Personal
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{textAlign: 'center'}}
        />
        <Text
          style={{
            color: isEnabled ? 'blue' : 'gray',
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Work
        </Text>
      </View>

      <Text style={{textAlign: 'center'}}>Selected Date: {date}</Text>
      <TouchableOpacity style={styles.button} onPress={onPressAddTodo}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
          Add Todo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('User')}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
          Go Back
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomWidth: 1,
    margin: 22,
    padding: 10,
    color: 'gray',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#841584',
    padding: 10,
    marginLeft: 25,
    marginTop: 8,
    marginRight: 25,
    borderRadius: 15,
  },
});

export default AddTodo;

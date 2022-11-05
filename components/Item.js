import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Item = props => {
  return (
    <View style={styles.container}>
      <View style={styles.taskContainer} key={props.task}>
        <Text style={styles.task}>{props.task}</Text>
        <Text
          style={{
            backgroundColor: 'gray',
            fontWeight: 'bold',
            borderRadius: 50,
            fontSize: 20,
            marginRight: 10,
          }}
          onPress={()=>props.deleteTask(console.log('delete item'))}
          >
          {' '}
          X{' '}
        </Text>
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
    backgroundColor: '#3E3364',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 50,
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

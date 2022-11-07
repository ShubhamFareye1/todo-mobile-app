import React from 'react';
import {Text, View , ScrollView} from 'react-native';
function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'gray',
      }}>
      <Text
        style={{
          fontSize: 50,
          textAlign: 'center',
          marginTop: 50,
          color: 'black',
        }}>
        ToDo App
      </Text>
    </View>
  );
}

export default Home;

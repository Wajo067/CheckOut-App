import React from 'react';
import {View, Button, Pressable, Text} from 'react-native';

const HomeScreen = ({navigation}: {navigation:any}) => {
  return (
    <View>
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'powderblue',
        }}
      />
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'skyblue',
        }}
      />
      <View
        style={{
          width: 150,
          height: 150,
          backgroundColor: 'steelblue',
        }}
      />

      <View>
          <Button
            onPress={() => {navigation.navigate("loading_page");
            }}
            title="Go To Loading Page"
            color= 'purple'
            />
      </View>
    </View>

  );
};

export default HomeScreen;
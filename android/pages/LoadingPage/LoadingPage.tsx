import React from 'react';
import {StyleSheet, Text, View, Button, Image, Pressable} from 'react-native';

const LoadingScreen = ({navigation}: {navigation:any}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.red}>This will be then App info screen</Text>
      <Text style={styles.bigBlue}>just bigBlue</Text>
      <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
      <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>


      <Image source={require('./favicon.png')} style={{width: 100, height: 100}} />
      <Image source={require('../../assets/ICONbg.png')} style={{width: 100, height: 100}} />
      <Image source={{uri: 'https://miro.medium.com/v2/resize:fit:640/format:webp/1*OohqW5DGh9CQS4hLY5FXzA.png'}}
             style={{width: 100, height: 100}} />

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}
          onPress={() => navigation.navigate('home_page')}>
          <Text style={styles.buttonText}>Go To HomePage</Text>
        </Pressable>
      </View>


      <View style={styles.buttonContainer}>
          <Pressable style={styles.button}
            onPress={() => navigation.navigate('camera_page')}>
            <Text style={styles.buttonText}>Go to Camera</Text>
          </Pressable>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}
          onPress={() => navigation.navigate('scan_page')}>
          <Text style={styles.buttonText}>Scan</Text>
        </Pressable>
      </View>
    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    margin: 50,
  },
  buttonContainer:{
  alignItems: 'center',
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
   button: {
      marginTop: 30,
      align: 'right',
      width: 150,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 2,
      borderRadius: 9,
      elevation: 3,
      backgroundColor: 'black',
    },
    buttonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },

});

export default LoadingScreen;
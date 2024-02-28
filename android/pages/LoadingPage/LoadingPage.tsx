import React from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';

const LoadingScreen = ({navigation}: {navigation:any}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.red}>just red</Text>
      <Text style={styles.bigBlue}>just bigBlue</Text>
      <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
      <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>


      <Image source={require('./favicon.png')} style={{width: 100, height: 100}} />
      <Image source={require('../../assets/ICONbg.png')} style={{width: 100, height: 100}} />
      <Image source={{uri: 'https://miro.medium.com/v2/resize:fit:640/format:webp/1*OohqW5DGh9CQS4hLY5FXzA.png'}}
             style={{width: 100, height: 100}} />

      <View style={styles.button}>
        <Button
          onPress={() => navigation.navigate('home_page')}
          title="Go To HomePage"
          />
      </View>


      <View style={styles.button}>
              <Button
                onPress={() => navigation.navigate('camera_page')}
                title="Go To Camera Page"
                />
              </View>

      <View style={styles.button}>
                    <Button
                      onPress={() => navigation.navigate('scan_page')}
                      title="Scan"
                      />
                    </View>
    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginLeft: 50,
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
      marginBottom: 30,
      width: 260,
      alignItems: 'center',
      backgroundColor: 'purple',
    },
    buttonText: {
      textAlign: 'center',
      padding: 20,
      color: 'white',
    },

});

export default LoadingScreen;
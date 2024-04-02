import React, {useState} from 'react';
import {View, Button, Pressable, Text, StyleSheet} from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const SignScreen = ({navigation}: {navigation:any}) => {
  const [loggedIn, setLoggedIn] = useState(false);

GoogleSignin.configure();

async function onGoogleButtonPress() {
    console.log("clicked!")

    try{
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      console.log(idToken)

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    }catch(error){
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
           // user cancelled the login flow
           console.log("cancelled")
         } else if (error.code === statusCodes.IN_PROGRESS) {
           // operation (e.g. sign in) is in progress already
           console.log("in progress")
         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
           // play services not available or outdated
           console.log("google play services")
         } else {
           // some other error happened
           console.log(error.message, error.name)
         }
    }

}

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

      <View
        style={{
          alignItems: 'center',
        }}>
         <GoogleSigninButton
           size={GoogleSigninButton.Size.Wide}
           color={GoogleSigninButton.Color.Dark}
           onPress={onGoogleButtonPress}
        />

        <Pressable style={styles.button}
          onPress={() => navigation.navigate('signup_page')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>

        <Pressable style={styles.button}
          onPress={() => navigation.navigate('login_page')}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

      </View>
    </View>

  );
};

const styles = StyleSheet.create({
    button: {
        width: 90,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        backgroundColor: 'black',
      },
      buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      }

})

export default SignScreen;
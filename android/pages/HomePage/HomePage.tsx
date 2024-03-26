import React from 'react';
import {View, Button, Pressable, Text} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const SignScreen = ({navigation}: {navigation:any}) => {

GoogleSignin.configure({
  webClientId: '507583809412-fhn0c21t9l0fua1ekr59avmsdbo8nkab.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const userInformation = await GoogleSignin.signIn();
  console.log(userInformation)

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
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

      <View>
         <GoogleSigninButton
           size={GoogleSigninButton.Size.Wide}
           color={GoogleSigninButton.Color.Dark}
           onPress={onGoogleButtonPress}
        />

      </View>
    </View>

  );
};

export default SignScreen;
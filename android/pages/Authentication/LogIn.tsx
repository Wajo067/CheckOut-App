import React, {useState} from 'react';
import {View, ActivityIndicator, Pressable, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';

const LogIn = ({navigation}: {navigation:any}) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')

    function signIn(){
      auth().signInWithEmailAndPassword(user.email , user.password)
      .then(()=> {
          console.log("User account logged in..");
          setLoading(false);
          navigation.navigate('loading_page')
      })
      .catch(error => {
          if (error.code === 'auth/invalid-credential') {
            setError('Email/Password is incorrect!');
          }
          if (error.code === 'auth/too-many-requests') {
              setError('Too many login attempts! Try again later.');
            }

          console.error(error);

          setLoading(false);
      })
    }
  return (
        <View style={styles.container}>
             {!loading ?
             <View style={{width: '80%', ...styles.container}}>

             <Text style={styles.black}>Login</Text>

             <TextInput
                style={styles.inputContainer}
                placeholder="   Email"
                placeholderTextColor="#003f5c"
                autoCapitalize='none'
                onChangeText={text => setUser({...user, email: text.trim()})}
                value={user.email} />

             <TextInput
                style={styles.inputContainer}
                placeholder="   Password"
                placeholderTextColor="#003f5c"
                onChangeText={text => setUser({...user, password: text.trim()})}
                value={user.password} />

            <Text style={{color:'red', fontWeight: 'bold'}}>{error}</Text>

            <TouchableOpacity>
              <Text style={styles.text}>Forgot Password?</Text>
            </TouchableOpacity>

             <Pressable style={styles.button}
               onPress={() => {setLoading(true); signIn();}}>
               <Text style={styles.buttonText}>Log In</Text>
             </Pressable>

             <View style={styles.btnContainer}>
                 <Text style={styles.text}>Don't have any account? </Text>
                 <TouchableOpacity onPress={() => navigation.navigate('signup_page')}>
                   <Text style={styles.touchable}>Sign Up</Text>
                 </TouchableOpacity>
             </View>

             </View>
             :
            <ActivityIndicator size='large' color="#000000"  style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }} />}
        </View>

  );
};


const styles = StyleSheet.create({
    container: {
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
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
    },
    inputContainer:{
      width: '75%',
      borderWidth: 1,
      borderRadius: 15,
    },
    black: {
      color: 'black',
      fontSize: 50,
      fontWeight: 'bold',
    },
    text: {
      color: 'black',
      fontSize: 18,
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    touchable: {
      color: 'blue',
      fontSize: 18,
      fontWeight: 'bold',
    }
})

export default LogIn;
import React, {useState} from 'react';
import {View, ActivityIndicator, Pressable, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';

const SignUp = ({navigation}: {navigation:any}) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function signUp(){
    if(user.email == ''){
        setError("Email is required!");
        setLoading(false);
        return;
    }else if(user.password == ''){
        setError("Password is required!");
        setLoading(false);
        return;
    }else{
        auth().createUserWithEmailAndPassword(user.email , user.password)
            .then(()=> {
                console.log("User account created.")
                navigation.navigate('loading_page')
            })
            .catch(error => {
                setLoading(false);
                if (error.code === 'auth/email-already-in-use') {
                  setError('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                  setError('That email address is invalid!');
                }

                if (error.code === 'auth/weak-password') {
                  setError('Password should be at least 6 characters!');
                }

                console.error(error);
            })
    }

  }

  return (
    <View style={styles.container}>
      {!loading ?
      <View style={{width: '100%', ...styles.container}}>

          <Text style={styles.black}>SignUp</Text>

          <TextInput
            style={styles.inputContainer}
            autoCapitalize='none'
            placeholder="   Username"
            placeholderTextColor="#003f5c"
            onChangeText={text => setUser({...user, username: text.trim()})}
            value={user.username} />

          <TextInput
            style={styles.inputContainer}
            autoCapitalize='none'
            placeholder="   Email"
            placeholderTextColor="#003f5c"
            onChangeText={text => setUser({...user, email: text.trim()})}
            value={user.email} />

          <TextInput
            style={styles.inputContainer}
            onChangeText={text => setUser({...user, password: text.trim()})}
            placeholder="   Password"
            placeholderTextColor="#003f5c"
            value={user.password} />

          <Text style={{color:'red', fontWeight: 'bold'}}>{error}</Text>

          <Pressable style={styles.button}
             onPress={() => {setLoading(true); signUp();}}>
             <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>

          <View style={styles.btnContainer}>
              <Text style={styles.text}>Already have any account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('login_page')}>
                <Text style={styles.touchable}>Log In</Text>
              </TouchableOpacity>
          </View>
      </View>
      :
      <ActivityIndicator size='large' color="#000000" style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }} />}
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

export default SignUp;
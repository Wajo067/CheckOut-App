import React from 'react';
import { useCartContext} from "../../context/context";
import {StyleSheet, Text, View, Pressable, Alert, ScrollView, ToastAndroid, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductList from "../../components/ProductList";
import { useAuthContext } from "../../context/auth";
import firestore, {Timestamp}  from '@react-native-firebase/firestore';

export default function CheckOut(){
    const {cartItems, setCartItems} = useCartContext();
    const {user} = useAuthContext();
    const navigation = useNavigation();

    function checkout(){
        // save database
        firestore()
          .collection('History')
          .add({
            userId: user.uid,
            timestamp: Timestamp.fromDate(new Date()),
            products: [...cartItems]
          })
          .then(() => {
            console.log(user.email, 'History added!');
          });
        // clear cartItems
        setCartItems([]);

        Alert.alert('Thank you for using CheckOut App');
        navigation.navigate('loading_page');
    }

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
            <ProductList items={cartItems} cart={false} />
           </View>
            <View style={styles.total}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.text}>{cartItems.length} Goods</Text>
                    <Text style={styles.text}>Total Cost: Kshs {cartItems.reduce((acc, current) => acc + (current.price * current.quantity), 0)}</Text>
                </View>
            <Pressable style={styles.button}
              onPress={() => checkout()}>
              <Text style={styles.buttonText}>Proceed to Pay</Text>
            </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      gap: 5,
      padding: 20,
    },
    listContainer: {
        height: '104%',
        margin: -22,
        padding: 0,
    },
    text: {
      color: 'black',
      fontSize: 18,
    },
    total: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      paddingHorizontal: 20,
      backgroundColor: 'white',
      borderColor: "black",
      borderWidth: 0.5,
      height: '9.5%',
    },
    buttonText: {
        fontFamily: 'montserrat',
        fontSize: 24,
        fontWeight: 'normal',
        letterSpacing: 0.25,
        color: 'white',
      },
      button: {
        width: 140,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        backgroundColor: 'black',
      },

})
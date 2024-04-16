import React from 'react';
import { useCartContext} from "../../context/context";
import {StyleSheet, Text, View, Pressable, Alert, ScrollView, ToastAndroid, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductList from "../../components/ProductList";

export default function CartPage(){
    const {cartItems} = useCartContext();
    const navigation = useNavigation();



    return (
        <View style={styles.container}>
           <ProductList items={cartItems}  />

            <View style={styles.total}>
                <Text style={styles.text}>{cartItems.length} Goods</Text>
                <Text style={styles.text}>Total Cost: Kshs {cartItems.reduce((acc, current) => acc + (current.price * current.quantity), 0)}</Text>
            </View>

            <View style={styles.btnContainer}>
                <Pressable style={styles.button}
                  onPress={() => navigation.goBack()}>
                  <Text style={styles.buttonText}>Back To Scan</Text>
                </Pressable>

                <Pressable style={styles.button}
                  onPress={() => navigation.navigate('checkout_page')}>
                  <Text style={styles.buttonText}>Check Out</Text>
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
    items: {
      height: '90%',
      width: '100%',
      position: 'absolute',
      top: 10,
      right: 0,
      left: 20,
    },
    item: {
      marginBottom: 10,
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
      bottom: 80,
      right: 50,
      left: 50,
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
      position: 'absolute',
      bottom: 30,
      right: 50,
      left: 50,
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
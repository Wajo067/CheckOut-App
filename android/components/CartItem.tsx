import React, {useState} from 'react';
import { useCartContext} from "../context/context";
import {StyleSheet, Text, View, Pressable, Image, TextInput} from 'react-native';

export default function CartItem({img, name, price, qty, code, cart}){
    const {cartItems, setCartItems} = useCartContext();

const addQuantity = (code) => {
    const items = [...cartItems];
    const item = {...cartItems.find((item) => item.code === code)};
    const newItem = {...item, quantity: item.quantity + 1};
    const index = cartItems.findIndex((item) => item.code === code);

    items[index] = newItem;

    setCartItems(items);
}

const minusQuantity = (code) => {
    const items = [...cartItems];
    const item = {...cartItems.find((item) => item.code === code)};
    if(item.quantity > 1){
        const newItem = {...item, quantity: item.quantity - 1};
        const index = cartItems.findIndex((item) => item.code === code);

        items[index] = newItem;

        setCartItems(items);
    }
}

const removeItem = (code) => {
    setCartItems(cartItems => [...cartItems.filter((item) => item.code !== code)]);
}

    return (
        <View style={styles.row}>
            <Image source={{uri: img}}
                style={{width: 100, height: 100}} />
            <View style={{gap: 10,}}>
                <Text style={{width: '100%'}}>{name}</Text>
                <View style={styles.row}>
                    <Text>Price:{price} x {qty} </Text>
                    <Text>Total: {price * qty}</Text>
                </View>
                {cart && <View style={styles.row}>
                  <Pressable style={styles.button}
                        onPress={() => minusQuantity(code)}>
                    <Text style={styles.buttonText}>-</Text>
                  </Pressable>

                  <Text>{qty}</Text>

                  <Pressable style={styles.button}
                        onPress={() => addQuantity(code)}>
                    <Text style={styles.buttonText}>+</Text>
                  </Pressable>
              </View>}
            </View>
            {cart && <Pressable style={styles.removeButton}
                onPress={() => removeItem(code)}>
               <Text style={styles.removeButtonText}>X</Text>
            </Pressable>}
        </View>

    )

}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'starts',
        alignItems: 'center',
        gap: 10,
    },
    removeButton: {
        backgroundColor: 'red',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: 28,
        position: 'absolute',
        right: 5,
        top: '50%',
    },
    removeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
  button: {
    flexDirection: 'column',
    margin: 0,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 0,
    padding:0,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
})
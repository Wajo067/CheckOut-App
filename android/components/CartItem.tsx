import React from 'react';
import {StyleSheet, Text, View, Pressable, Image, TextInput} from 'react-native';

export default function CartItem({img, name, price, qty}){
    return (
        <View style={styles.row}>
            <Image source={{uri: img}}
                style={{width: 90, height: 90}} />
            <View>
                <Text>{name}</Text>
                <View style={styles.row}>
                    <Text>Price:{price} x {qty} </Text>
                    <Text>Total: {price * qty}</Text>
                </View>
            </View>
        </View>

    )

}

const styles = StyleSheet.create({
    row: {
     flexDirection: 'row',
     justifyContent: 'starts',
     alignItems: 'center',
     gap: 10,
   }

})
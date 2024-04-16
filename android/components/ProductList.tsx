import React from 'react';
import CartItem from "./CartItem";
import {StyleSheet,Text, View, Pressable, Alert, ScrollView, ToastAndroid, SafeAreaView} from 'react-native';

export default function ProductList({ items , cart=true}){
    return (
        <SafeAreaView  style={styles.items}>
            <ScrollView>
                {items.map(item => (
                   <View style={styles.item} key={item.code}>
                       <CartItem
                            img={item.imgUrl}
                            name={item.name}
                            price={item.price}
                            qty={item.quantity}
                            code={item.code}
                            cart={cart}
                        />

                   </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
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
})
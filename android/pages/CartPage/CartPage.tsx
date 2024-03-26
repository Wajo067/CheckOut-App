import React from 'react';
import { useCartContext} from "../../context/context";
import CartItem from "../../components/CartItem";

import {StyleSheet, Text, View} from 'react-native';

export default function CartPage(){
    const {cartItems} = useCartContext();

    return (
        <View>
        {cartItems.map(cartItem => <CartItem
                                        key={cartItem.code}
                                        img={cartItem.imgUrl}
                                        name={cartItem.name}
                                        price={cartItem.price}
                                        qty={cartItem.quantity} />)}
        <Text>Total Cost: {cartItems.reduce((acc, current) => acc + (current.price * current.quantity), 0)}</Text>
        </View>
    )
}
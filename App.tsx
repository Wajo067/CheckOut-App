import React, {Component} from "react";
import { NavigationContainer} from "@react-navigation/native";
import {StyleSheet, Text, View, Button, Alert} from "react-native";
import LoadingPage from "./android/pages/LoadingPage/LoadingPage";
import HomePage from "./android/pages/HomePage/HomePage";
import CameraPage from "./android/pages/CameraPage/CameraPage";
import ScanPage from "./android/pages/ScanPage/ScanPage";
import CartPage from "./android/pages/CartPage/CartPage";
import SignUp from "./android/pages/Authentication/SignUp";
import LogIn from "./android/pages/Authentication/LogIn";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartProvider } from "./android/context/context";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <CartProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="loading_page">
                    <Stack.Screen name="loading_page" component={LoadingPage} />
                    <Stack.Screen name="home_page" component={HomePage} />
                    <Stack.Screen name="camera_page" component={CameraPage} />
                    <Stack.Screen name="scan_page" component={ScanPage} />
                    <Stack.Screen name="cart_page" component={CartPage} />
                    <Stack.Screen name="signup_page" component={SignUp} />
                    <Stack.Screen name="login_page" component={LogIn} />
                </Stack.Navigator>
            </NavigationContainer>
        </CartProvider>
    );
}


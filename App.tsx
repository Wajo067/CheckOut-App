import React, {Component, useState, useEffect} from "react";
import { NavigationContainer} from "@react-navigation/native";
import {StyleSheet, Text, View, Button, Alert} from "react-native";
import LoadingPage from "./android/pages/LoadingPage/LoadingPage";
import HomePage from "./android/pages/HomePage/HomePage";
import CameraPage from "./android/pages/CameraPage/CameraPage";
import ScanPage from "./android/pages/ScanPage/ScanPage";
import CartPage from "./android/pages/CartPage/CartPage";
import SignUp from "./android/pages/Authentication/SignUp";
import LogIn from "./android/pages/Authentication/LogIn";
import CheckOut from "./android/pages/CheckOut/CheckOut";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartProvider } from "./android/context/context";
import { AuthProvider} from "./android/context/auth";
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const AuthStack = createNativeStackNavigator();

function AuthLayout(){
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="loading_page" component={LoadingPage} />
            <AuthStack.Screen name="camera_page" component={CameraPage} />
            <AuthStack.Screen name="scan_page" component={ScanPage}  options={{ title: 'Scannner' }} />
            <AuthStack.Screen name="cart_page" component={CartPage} />
            <AuthStack.Screen name="checkout_page" component={CheckOut} />
        </AuthStack.Navigator>
    )
}
export default function App() {
  const [initializing, setInitializing] = useState(true);
    const [user,setUser] = useState(null);

      // Handle user state changes
      function onAuthStateChanged(user) {
        console.log(user);
        setUser(user);
        if (initializing) setInitializing(false);
      }

      useEffect(() => {
        auth().onAuthStateChanged(onAuthStateChanged);
      }, []);

    return (
        <AuthProvider>
            <CartProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="home_page">{user ? (
                        <Stack.Screen name="auth" component={AuthLayout} options={{headerShown: false}} />
                          ) : (
                          <>
                            <Stack.Screen name="home_page" component={HomePage} />
                            <Stack.Screen name="signup_page" component={SignUp} />
                            <Stack.Screen name="login_page" component={LogIn} />
                          </>
                          )}


                    </Stack.Navigator>
                </NavigationContainer>
            </CartProvider>
        </AuthProvider>
    );
}


import React, {Component} from "react";
import { NavigationContainer} from "@react-navigation/native";
import {StyleSheet, Text, View, Button, Alert} from "react-native";
import LoadingPage from "./android/pages/LoadingPage/LoadingPage";
import HomePage from "./android/pages/HomePage/HomePage";
import CameraPage from "./android/pages/CameraPage/CameraPage"
import ScanPage from "./android/pages/ScanPage/ScanPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="loading_page">
                <Stack.Screen name="loading_page" component={LoadingPage} />
                <Stack.Screen name="home_page" component={HomePage} />
                <Stack.Screen name="camera_page" component={CameraPage} />
                <Stack.Screen name="scan_page" component={ScanPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


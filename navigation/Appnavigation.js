import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Homescreen from '../screens/Homescreen';
import Moviescreen from '../screens/Moviescreen';
import Personscreen from '../screens/Personscreen';
import Searchscreen from '../screens/Searchscreen';


const Stack = createNativeStackNavigator();



export default function Appnavigation() {
    return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown: false}} component={Homescreen} />
        <Stack.Screen name="Movie" options={{headerShown: false}} component={Moviescreen} />
        <Stack.Screen name="Person" options={{headerShown: false}} component={Personscreen} />
        <Stack.Screen name="Search" options={{headerShown: false}} component={Searchscreen} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}
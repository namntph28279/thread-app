import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import ThreadScreen from '../screens/ThreadScreen';
import ActivityScreen from '../screens/ActivityScreen';
import ProfileScreen from './../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: { color: 'black' },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="black" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name='Thread'
        component={ThreadScreen}
        options={{
          tabBarLabel: 'Create',
          tabBarLabelStyle: { color: 'black' },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="create" size={24} color="black" />
            ) : (
              <Ionicons name="create-outline" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name='Activity'
        component={ActivityScreen}
        options={{
          tabBarLabel: 'Activity',
          tabBarLabelStyle: { color: 'black' },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="heart" size={24} color="black" />
            ) : (
              <AntDesign name="hearto" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: { color: 'black' },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="black" />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

// Tạo Stack Navigator chính
const Stack = createNativeStackNavigator();
export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

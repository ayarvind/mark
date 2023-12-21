import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/dist/AntDesign';
import Colors from '../common/colors';
import HomePage from '../components/HomePage';
import Scanner from '../components/Scanner';
import Profile from '../components/Profile';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
const Tabs = createBottomTabNavigator();

const renderTabIcon = (name: string, size: number, color: string, focused: boolean) => {

  return <Icons name={name} size={size} color={focused ? color : 'grey'} />;

};

const tabBarOptions = {
  tabBarStyle: {
    backgroundColor: '#f8f8f8',
    borderTopWidth: 0,
    elevation: 4,
    height: 80,
    borderStartEndRadius: 50,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  tabBarActiveTintColor: Colors.primary,
  tabBarInactiveTintColor: 'grey',
  tabBarShowLabel: false,
  headerShown: true,
  headerTitleAlign: 'center',

};

export default function Home(navigation: any) {
  return (
    <Tabs.Navigator initialRouteName="homepage" screenOptions={tabBarOptions}>
      <Tabs.Screen
        name="homepage"
        component={HomePage}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => renderTabIcon('home', 30, Colors.primary, focused),
        }}
      />

      <Tabs.Screen
        name="profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => renderTabIcon('user', 30, Colors.primary, focused),
        }}
      />
    </Tabs.Navigator>
  );
}

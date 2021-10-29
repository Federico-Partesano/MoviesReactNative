import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from "react";
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View, SafeAreaView, Button, Platform } from "react-native";


import { TouchableOpacity } from "react-native";
import { StackAnimationTypes } from 'react-native-screens';

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SinglePage from "../SinglePage";
import CastPage from '../CastPage';
import SearchPage from "../SearchPage";
import { StackActions } from "@react-navigation/routers";
import Menu from '../menu';
import MenuSeriesTv from './menuSeriesTv.';
import SinglePageSeriesTv from './SinglePageSeriesTv';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();



export default function MenuSeriesTvNavigation() {
  const animationType: StackAnimationTypes = Platform.OS !== "android" ? "default" : "none";

  
  return (

   

  
      <Stack.Navigator>
            <Stack.Screen
            
              options={({ navigation }) => ({
                  headerLeft: () => (
                    <TouchableOpacity
                    onPress={() => navigation.openDrawer()} >
  <Icon
  tvParallaxProperties={false}
  style={{ padding: 0 }}
  name="menu"
  size={30}
  color="white"
/>
                    </TouchableOpacity>
                   
                  ),
                  headerTitleAlign:"center",
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.dispatch(StackActions.push("Search"));
                    }}
                  >
                    <Text
                      style={{
                        color: "white",

                        padding: 5,
                        borderRadius: 50,
                      }}
                    >
                      Search
                    </Text>
                  </TouchableOpacity>
                ),
                title: "Movies",
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              })}
              name="MenuSeriesTv"
              component={MenuSeriesTv}
            />
              <Stack.Screen
           
              options={
                {
      
               animation: animationType,
                title: "",
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              name="CastPage"
              component={CastPage}
            />

            <Stack.Screen
              options={{
                animation: animationType,
                title: "",
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              name="DetailsSinglePageSeriesTv"
              component={SinglePageSeriesTv}
            />
            

            <Stack.Screen
              options={{
                title: "",
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              name="Search"
              component={SearchPage}
            />
          </Stack.Navigator> 
  );
}

/* <Route path="/about" component={} />
      <Route path="/topics" component={Topics} /> */

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1D2023",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    backgroundColor: "#1D2023",
    height: "100%",
  },
});

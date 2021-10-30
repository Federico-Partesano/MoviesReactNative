import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View, SafeAreaView, Button, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyScrollView from "./src/components/myScrollView";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./src/reducer";
import Menu from "./src/menu";
import { NavigationAction } from "@react-navigation/routers";
import { TouchableOpacity } from "react-native";
import { StackAnimationTypes } from 'react-native-screens';
import { NativeRouter, Route, Link } from "react-router-native";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SearchBar } from "react-native-screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { color } from "react-native-reanimated";
import SinglePage from "./src/SinglePage";
import CastPage from './src/CastPage';
import SearchPage from "./src/SearchPage";
import { StackActions } from "@react-navigation/routers";
import SinglePageSeriesTv from './src/menuSeriesTv/SinglePageSeriesTv';
import PropTypes from "prop-types";
import ListOfCards from './src/components/listofCards';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();



export default function MenuMovies() {
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
              name="Menu"
              component={Menu}
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
              name="Details"
              component={SinglePage}
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
              name="ListOfCards"
              component={ListOfCards}
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

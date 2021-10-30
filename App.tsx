import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from "expo-status-bar";
import React, {useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyScrollView from "./src/components/myScrollView";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./src/reducer";
import Menu from "./src/menu";
import { NavigationAction } from "@react-navigation/routers";
import { TouchableOpacity } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SearchBar } from "react-native-screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { color } from "react-native-reanimated";
import SinglePage from "./src/SinglePage";
import MenuMovies from './MenuMovies';
import SearchPage from "./src/SearchPage";
import MenuSeriesTvNavigation from './src/menuSeriesTv/MenuSeriesTvNavigation';
import { StackActions } from "@react-navigation/routers";
import PropTypes from "prop-types";
// import * as RNLocalize from 'react-native-localize';
// import i18n from 'i18n-js';
// import memoize from 'lodash.memoize';
// import enJson from  "./src/i18n/en";
// import nlJson from  "./src/i18n/nl";



declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
};
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const translationGetters: any = {
//   en: enJson,
//   nl: nlJson
// };

// const translate = memoize(
//   (key, config?) => i18n.t(key, config),
//   (key, config?) => (config ? key + JSON.stringify(config) : key)
// )

// const setI18nConfig: any = () => {
//   const fallback = { languageTag: 'en' }
//   const { languageTag } =
//     RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
//     fallback
//   translate.cache.clear!()
//   i18n.translations = { [languageTag]: translationGetters[languageTag]() }
//   i18n.locale = languageTag
// }




const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default function App() {


// useEffect(() => {
//   RNLocalize.addEventListener('change', handleLocalizationChange) 
//   return () => {
//     RNLocalize.removeEventListener('change', handleLocalizationChange)
//   }
// }, [])

// const handleLocalizationChange = () => {
//   setI18nConfig().then(() => forceUpdate()).catch(error => {
//   console.error(error)
//   })
//   }



  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'white',
      card: "#1D2023",
      text: 'white',
      border: 'white',
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme} >
        <Provider store={store}>
        {/* <Text>{translate('hello')}</Text>
 <Text>{translate('Good morning')}</Text>
 <Text>Currency: {translate('Currency')}</Text>
 <Text>Country: {RNLocalize.getCurrencies()}</Text> */}
        <Drawer.Navigator
        initialRouteName="Root"
        screenOptions={{ headerShown: false}}
      >
        <Drawer.Screen name="Root" component={MenuMovies} 
        
       options={({ navigation }) => ({
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
        })}/>
        <Drawer.Screen name="Serie Tv" component={MenuSeriesTvNavigation} />
         
      </Drawer.Navigator>

  
      {/* <Stack.Navigator>
            <Stack.Screen
              options={({ navigation }) => ({
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
              name="Details"
              component={SinglePage}
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
          </Stack.Navigator> */}
   
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
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

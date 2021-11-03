import React, { useEffect } from "react";
import MyCard from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { StackActions } from "@react-navigation/routers";
import { LogBox } from 'react-native';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import { RootState } from "../reducer";


type Props = {
  action: any;
  fetch: any;
  title: string;
  navigation: any;
  type: "tv" | "movie"
};

const MyScrollView: React.FC<Props> = ({
  action,
  fetch,
  title,
  navigation,
  type,
}) => {
  const movies = useSelector((state: any) => state[action]);
  const dispatch = useDispatch();

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  



  useEffect(() => {
    dispatch(fetch());
  }, []);
  return (
    <>
    <View style={styles.containerTitleCard}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity

   onPress={() =>  {
    navigation.dispatch(
      StackActions.push("ListOfCards", {action: action, fetch: fetch, type: type, title: title})
      )

   }}>
          <Text style={styles.showMoreTitles}>Vedi di più...</Text>
          </TouchableOpacity>
    </View>
  
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.scrollView}
      >
        {movies &&
          movies.map((element: any, index: number) => {
            return (
              <TouchableOpacity
                key={"touchableopacityMyScroll" + title + index}
                onPress={() =>{
                  if(type === "movie"){
                       navigation.navigate("Details", { idMovie: element.id, autoStartVideo: false})
                  } else if(type === "tv"){
                    navigation.navigate("DetailsSinglePageSeriesTv", { idMovie: element.id, autoStartVideo: false})
                  }
                }
                }
              >
                <MyCard type={type} key={"card" + title + index} data={element} />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  showMoreTitles:{
    color: "#626466",
    marginTop: 0,
    fontSize: 15,
  },
  containerTitleCard:{ display: "flex",
  width:"100%", flexDirection:"row",
   justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingBottom: 5
  },

  title: {
    color: "#626466",
    fontWeight: "bold",
    marginTop: 0,
    fontSize: 15,
  },
  scrollView: {
    marginHorizontal: 20,
    height: 235,
    marginBottom: 4,
  },
  text: {
    fontSize: 42,
  },
});

export default MyScrollView;

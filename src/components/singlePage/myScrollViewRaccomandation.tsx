import React, { useEffect } from "react";
import MyCard from "../Card";
import { useSelector, useDispatch } from "react-redux";
import { View } from "react-native";
import { StackActions } from "@react-navigation/routers";

import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  movie: any;
  title: string;
  navigation: any;
  type: "tv" | "movie",
};

const MyScrollViewRaccomandation: React.FC<Props> = ({
  movie,
  title,
  navigation,
}) => {
  console.log(movie[0].name);
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.scrollView}
      >
        {movie &&
          movie.map((element: any, index: number) => {
            let type: "tv" | "movie" = movie.title ? "movie" : "tv";
            console.log("type:", type);
            return (
              <TouchableOpacity
                key={"touchableopacityMyScroll" + index}
                onPress={() =>{
                    if(type === "movie"){
                      navigation.dispatch(
                      StackActions.push("Details", { idMovie: element.id })
                      )

                    } else{
                      navigation.dispatch(
                        StackActions.push("DetailsSinglePageSeriesTv", { idMovie: element.id })
                        ) 
                    }

                }
                 
                }
              >
                <MyCard type={type} key={"card" + index} data={element} />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#626466",
    fontWeight: "bold",
    marginTop: 0,
    fontSize: 15,
    marginHorizontal: 25,
    alignSelf: "flex-start",
  },
  scrollView: {
    marginHorizontal: 20,
    height: 240,
    marginBottom: 4,
  },
  text: {
    fontSize: 42,
  },
});

export default MyScrollViewRaccomandation;

import React, { useEffect } from "react";
import MyCard from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { View } from "react-native";

import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import { RootState } from "../reducer";
import { TouchableOpacity } from "react-native-gesture-handler";

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

  useEffect(() => {
    dispatch(fetch());
  }, []);
  return (
    <>
      <Text style={styles.title}>{title}</Text>
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
    height: 235,
    marginBottom: 4,
  },
  text: {
    fontSize: 42,
  },
});

export default MyScrollView;

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
};

const MyScrollViewRaccomandation: React.FC<Props> = ({
  movie,
  title,
  navigation,
}) => {
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
            return (
              <TouchableOpacity
                key={"touchableopacityMyScroll" + index}
                onPress={() =>
                  navigation.dispatch(
                    StackActions.push("Details", { idMovie: element.id })
                  )
                }
              >
                <MyCard key={"card" + index} data={element} />
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

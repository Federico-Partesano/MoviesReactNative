import React, { useLayoutEffect } from "react";
import { useCallback, useState, useEffect } from "react";
import { Alert, Dimensions, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import YoutubePlayer from "react-native-youtube-iframe";
import WebView from "react-native-webview";
import { useSelector, useDispatch } from "react-redux";
import Circle from "./components/singlePage/circle";
import MyScrollCast from "./components/singlePage/myScrollCast";
import InfoMovie from "./components/singlePage/infoMovie";
import MyScrollView from "./components/myScrollView";
import MyScrollViewRaccomandation from "./components/singlePage/myScrollViewRaccomandation";
import { Button } from "react-native";
import { StackActions } from "@react-navigation/routers";
import axios from "axios";
import { TextInput } from "react-native";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Image,
} from "react-native";

const SearchPage = ({ navigation }: any) => {
  const [movies, setMovies] = useState<any>();
  const [text, onChangeText] = React.useState<any>(
    ""
  );

  async function getMovies() {
    const response: any = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=68ae5fab2a5639e3730ea5e55c5b867e&language=it&include_adult=false&query=${text}`
    );
    setMovies(response.data);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TextInput
          autoFocus={true}
          placeholderTextColor={"white"}
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Search..."
        />
      ),
    });
    {
      text ? getMovies() : setMovies(null);
    }
  }, [navigation, text]);
  return (
    <ScrollView style={{ backgroundColor: "#1D2023" }}>
      <View style={styles.container}>
      <SearchBar
      lightTheme={false}
      round
      platform="android"
        placeholder="Type Here..."
        onChangeText={onChangeText}
        value={text}
      />
        {movies &&
          movies.results.map((element: any, index: number) => {
            const points = element.title.length > 36 ? "..." : "";
            return (
              <TouchableOpacity
                key={"TouchableOpacitySearch" + index}
                onPress={() =>
                  navigation.dispatch(
                    StackActions.push("Details", { idMovie: element.id })
                  )
                }
              >
                <View
                  style={styles.containerColumn}
                  key={"containerColumnSearch" + index}
                >
                  <Image
                    key={"imageSearch" + index}
                    style={styles.image}
                    source={{
                      uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${element.poster_path}`,
                    }}
                  />
                  <View
                    key={"containerRight" + index}
                    style={styles.containerRight}
                  >
                    <Text key={"title" + index} style={styles.title}>
                      {element.title.substring(0, 36) + points}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  containerRight: {
    paddingLeft: 8,
    display: "flex",
    flexDirection: "column",
  },
  containerColumn: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 5,
  },
  image: { width: 70, height: 100 },
  container: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 10,
  },
  input: {
    textAlign: "center",
    height: "50%",
    width: 250,
    margin: 12,
    borderWidth: 0,
    borderRadius: 50,
    backgroundColor: "#1D2023",
    paddingVertical: 5,
    color: "white",
  },
});
//color: "#626466",
export default SearchPage;

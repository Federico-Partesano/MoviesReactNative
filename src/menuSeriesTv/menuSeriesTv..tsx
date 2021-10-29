import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { Image } from "react-native";
import React, { useEffect, useState, useLayoutEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import MyScrollView from "./../components/myScrollView";
import { fetchUpcomingMovies, fetchPopularSeriesTv, fetchTopRatedSeriesTv } from "./../actions/fetchs";
import { Route, Link } from "react-router-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { ScrollView } from "react-native-gesture-handler";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";

export default function MenuSeriesTv({ navigation }: any) {
  const [state, setState] = useState<Object>({});
  const video = React.useRef(null);
  const carousel = React.useRef(null);
  const windowWidth = Dimensions.get("window").width;
  const moviesCarousel = useSelector((state: any) => state["popularSeriesTv"]);
  const carouselItems = [
    {
      title: "Item 1",
      text: "Text 1",
      numArr: 0,
    },
    {
      title: "Item 2",
      text: "Text 2",
      numArr: 1,
    },
    {
      title: "Item 2",
      text: "Text 2",
      numArr: 2,
    },
  ];

  const _renderItem = ({ index }: any) => {
    return (
      <View
        style={{
          backgroundColor: "floralwhite",
          borderRadius: 5,
          height: 250,
          width: "100%",
        }}
      >
        {moviesCarousel[0] && (
          <>
             <Image
              style={styles.play}
              source={require("./../images/video-play.png")}
            /> 

            <Text style={styles.titleCarousel}>
              {moviesCarousel[index].name}
            </Text>
            <Image
              source={{
                uri: `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${moviesCarousel[index].backdrop_path}`,
              }}
              style={styles.img}
            />
          </>
        )}
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container2}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
             <Carousel
              layout={"default"}
              ref={carousel}
              data={carouselItems}
              renderItem={_renderItem}
              sliderWidth={200}
              itemWidth={windowWidth}
              onSnapToItem={(index) => setState({ activeSlide: index })}
            /> 
          </View>

          <MyScrollView
            type={"tv"}
            navigation={navigation}
            action={"popularSeriesTv"}
            fetch={fetchPopularSeriesTv}
            title={"POPOLARI"}
          />
           <MyScrollView
           type="tv"
            navigation={navigation}
            action={"topRatedSeriesTv"}
            fetch={fetchTopRatedSeriesTv}
            title={"PIÙ VOTATI"}
          />

          {/*  <View style={{ display: "flex", flexDirection: "row" }}>
         <Video
            style={styles.video}
            source={{
              uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            useNativeControls
            resizeMode="contain"
          /> 
        </View>*/}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  play: {
    width: 60,
    height: 60,
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    top: 125 - 30,
    opacity: 0.7,
  },
  titleCarousel: {
    zIndex: 1,
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    position: "absolute",
    bottom: 10,
    left: 10,
    opacity: 0.8,
  },
  img: {
    height: 250,
    width: "100%",
  },
  video: {
    height: 250,
    width: "80%",
  },
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

import React, { useLayoutEffect } from "react";
import { useCallback, useState, useEffect } from "react";
import { Alert, Dimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import WebView from "react-native-webview";
import { useSelector, useDispatch } from "react-redux";
import Circle from "./components/singlePage/circle";
import MyScrollCast from "./components/singlePage/myScrollCast";
import InfoMovie from "./components/singlePage/infoMovie";
import MyScrollView from "./components/myScrollView";
import MyScrollViewRaccomandation from "./components/singlePage/myScrollViewRaccomandation";

import axios from "axios";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Image,
} from "react-native";

const SinglePage = ({ route, navigation }: any) => {
  const { idMovie } = route.params;
  const [details, setDetails] = useState<any>(null);
  const [videos, setVideos] = useState<any>(null);
  const [credits, setCredits] = useState<any>(null);
  const [raccomandations, setRaccomandations] = useState<any>(null);
  const keyApi = "68ae5fab2a5639e3730ea5e55c5b867e";
  async function fetchDetailsMovie(idMovie: any) {
    const requestOne = await axios.get(
      `https://api.themoviedb.org/3/movie/${idMovie}?api_key=${keyApi}&language=it`
    );
    const requestTwo = await axios.get(
      `https://api.themoviedb.org/3/movie/${idMovie}/videos?api_key=${keyApi}&language=it`
    );
    const requestThree = await axios.get(
      `https://api.themoviedb.org/3/movie/${idMovie}/credits?api_key=${keyApi}&language=it`
    );
    const requestFourth = await axios.get(
      `https://api.themoviedb.org/3/movie/${idMovie}/recommendations?api_key=${keyApi}&language=it&page=1`
    );
    axios
      .all([requestOne, requestTwo, requestThree, requestFourth])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];
          const responseFourth = responses[3];
          // use/access the results
          setDetails(responseOne.data);
          setVideos(responseTwo.data);
          setCredits(responseThree.data);
          setRaccomandations(responseFourth.data);
        })
      )
      .catch((errors) => {
        // react on errors.
      });
  }

  useLayoutEffect(() => {
    details &&
      navigation.setOptions({
        title: details.title,
      });
  });

  async function getMovie(idMovie: any) {
    fetchDetailsMovie(idMovie);
  }

  useEffect(() => {
    getMovie(idMovie);
  }, []);
  const windowWidth = Dimensions.get("window").width;
  const [playing, setPlaying] = useState(false);

  // const onStateChange = useCallback((state) => {
  //   if (state === "ended") {
  //     setPlaying(false);
  //     Alert.alert("video has finished playing!");
  //   }
  // }, []);

  // const togglePlaying = useCallback(() => {
  //   setPlaying((prev) => !prev);
  // }, []);

  const getYoutbuteMovie = () => {
    if (videos) {
      if (videos.results.length > 0) {
        return (
          <YoutubePlayer
            height={224}
            width={windowWidth}
            play={playing}
            videoId={videos.results[0].key}
            // onChangeState={onStateChange}
          />
        );
      } else {
        return (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 300,
              width: "100%",
              backgroundColor: "black",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Trailer non disponibile
            </Text>
          </View>
        );
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {getYoutbuteMovie()}
        {details && <Text style={styles.titleMovie}>{details.title}</Text>}
      </View>
      <View style={styles.container}>
        {details && (
          <>
            <ScrollView
              horizontal={true}
              style={{ marginTop: 10, marginBottom: 10 }}
            >
              <Circle data={details}></Circle>
            </ScrollView>
            <Text style={styles.titleHistory}>Trama</Text>
            <Text style={styles.overview}>{details.overview}</Text>
          </>
        )}
      </View>
      <View style={styles.container}>
        <Text style={styles.titleHistory}>Cast</Text>
        {credits && <MyScrollCast navigation={navigation} data={credits} />}
      </View>
      <View style={styles.container}>
        <Text style={styles.titleHistory}>Info</Text>
        {details && <InfoMovie data={details} />}
      </View>
      <View style={styles.container}>
        {raccomandations && (
          <MyScrollViewRaccomandation
            movie={raccomandations.results}
            navigation={navigation}
            title={"Raccomandati"}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  overview: {
    backgroundColor: "#282A37",
    textAlign: "justify",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "white",
    fontSize: 14,
  },
  titleHistory: {
    color: "white",
    alignSelf: "center",
    fontSize: 22,
    marginVertical: 4,
    fontWeight: "bold",
  },
  titleMovie: {
    color: "white",
    position: "absolute",
    fontWeight: "bold",
    fontSize: 20,
    left: 20,
    bottom: 20,
  },
  container: {
    backgroundColor: "#1D2023",
    display: "flex",
  },
  video: {
    width: "100%",
  },
});
//color: "#626466",
export default SinglePage;

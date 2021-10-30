import React, { useLayoutEffect } from "react";
import { useCallback, useState, useEffect } from "react";
import { Alert, Dimensions,ActivityIndicator } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import WebView from "react-native-webview";
import { useSelector, useDispatch } from "react-redux";
import Circle from "./../components/singlePage/circle";
import MyScrollCast from "./../components/singlePage/myScrollCast";
import InfoSeriesTv from "./components/infoSeriesTv";
import MyScrollView from "./../components/myScrollView";
import MyScrollViewRaccomandation from "./../components/singlePage/myScrollViewRaccomandation";

import {LinearGradient} from 'expo-linear-gradient';
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

const SinglePageSeriesTv = ({ route, navigation }: any) => {

  // let inLoading: boolean = true; 

  const { idMovie, autoStartVideo } = route.params;
  const [details, setDetails] = useState<any>(null);
  const [videos, setVideos] = useState<any>(null);
  const [credits, setCredits] = useState<any>(null);
  const [xAnimationLoading, setXAnimationLoading ] = useState<any>(0);
  const [statusVideoPlayer, setStatusVideoPlayer] = useState<string | null>(null);
  const [raccomandations, setRaccomandations] = useState<any>(null);
  const keyApi = "68ae5fab2a5639e3730ea5e55c5b867e";
  async function fetchDetailsMovie(idMovie: any) {
    const requestDetailsTv = await axios.get(
      `https://api.themoviedb.org/3/tv/${idMovie}?api_key=${keyApi}&language=it`
    );
    let requestVideosTv: any = await axios.get(
      `https://api.themoviedb.org/3/tv/${idMovie}/videos?api_key=${keyApi}&include_video_language=it`
    );
    if(requestVideosTv.data.results.length === 0){
        requestVideosTv = await axios.get(
            `https://api.themoviedb.org/3/tv/${idMovie}/videos?api_key=${keyApi}`
          );
         
    }
    const requestCreditsTv = await axios.get(
      `https://api.themoviedb.org/3/tv/${idMovie}/credits?api_key=${keyApi}&language=it`
    );
    const requestRaccomandationsTv = await axios.get(
      `https://api.themoviedb.org/3/tv/${idMovie}/recommendations?api_key=${keyApi}&language=it&page=1`
    );
    axios
      .all([requestDetailsTv, requestVideosTv, requestCreditsTv, requestRaccomandationsTv])
      .then(
        axios.spread((...responses) => {
          const responseDetailsTv = responses[0];
          const responseVideosTv = responses[1];
          const responseCreditsTv = responses[2];
          const responseRaccomandationsTv = responses[3];
          // use/access the results
          setDetails(responseDetailsTv.data);
          setVideos(responseVideosTv.data);
          setCredits(responseCreditsTv.data);
          setRaccomandations(responseRaccomandationsTv.data);
        })
      )
      .catch((errors) => {
        // react on errors.
      });
  }

  useLayoutEffect(() => {
    details &&
      navigation.setOptions({
        title: details.name,
    
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


  const showTitle = (e:string) =>{
    setStatusVideoPlayer(e);

    }



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
        let video;
      if (videos.results.length > 0) {
           video = videos.results.find((element: any) => element.iso_639_1 === "it");

          if(video ===  undefined){
              video = videos.results.find((element: any) => element.type === "Trailer");
          }
          
          if(video ===  undefined){
            video = videos.results[0];
          }
        
        return (
          <YoutubePlayer
          onChangeState={showTitle}
            height={224}
            width={windowWidth}
            play={autoStartVideo}
            videoId={video.key}
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

       
       
            <Text style={{ color: "white", fontWeight: "bold", zIndex: -1 }}>
            
              Trailer non disponibile
            </Text>
          
          </View>
        );
      }
    }
  };
  // const interval = setInterval(()=>{
  //   setXAnimationLoading(xAnimationLoading + 10);

  //   if(xAnimationLoading > windowWidth / 2){
  //     setXAnimationLoading(- windowWidth / 4);
  //   }
  // }, 20);

  // useLayoutEffect(()=>{
  //   if(inLoading){
  
  //     interval;
  //   }
  //   return () =>{
  //   clearInterval(interval);
  //   }


  // });
      
  const getPage = () =>{
    if( details && videos && credits && raccomandations ){
      // inLoading = false;
      return(  <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.container}>
          {getYoutbuteMovie()}
        { statusVideoPlayer !== "playing" && <Text style={styles.titleMovie}>{details.name}</Text> }
        </View>
        <View style={styles.container}>
         
           
              <ScrollView
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                <Circle data={details}></Circle>
              </ScrollView>
              <Text style={styles.titleHistory}>Trama</Text>
            {details.overview.length > 0 ? <Text style={styles.overview}>{details.overview}</Text> :(<View style={styles.overviewNotFoundContainer}><Text style={styles.overviewNotFound}>Non disponibile</Text></View>) }
         
          
        </View>
        <View style={styles.container}>
        {credits.cast.length > 0 &&  (
        <><Text style={styles.titleHistory}>Cast</Text>
         <MyScrollCast navigation={navigation} data={credits} /></>)}
        </View>
        <View style={styles.container}>
          <Text style={styles.titleHistory}>Info</Text>
          <InfoSeriesTv data={details} /> 
        </View>
        <View style={styles.container}>
      
       { raccomandations.results.length > 0 &&     <MyScrollViewRaccomandation
       type={"tv"}
              movie={raccomandations.results}
              navigation={navigation}
              title={"Raccomandati"}
            />}
         
        </View>
      </ScrollView>
      )
 
          

    } else{
      return(<View style={styles.containerLoadingPage} >
        <View>
 
        <Text style={styles.textLoadingPage}>Caricamento in corso...</Text>

        <ActivityIndicator style={{ zIndex: 2}} size="large" color="white" />
        </View>
        </View>)
    }




  }

  return (
  getPage()
  
  );
};
const mycolor = "red";
const styles = StyleSheet.create({
  scrollViewContainer:
  {minHeight: "100%", 
  backgroundColor: "#1D2023"
},
 
  textLoadingPage:{
    color: "white",
    fontSize: 20,
  
  },
  containerLoadingPage:{
    display: "flex",
     height:"100%",
     flexDirection: "column",
      width:"100%",
      alignItems: "center",
      justifyContent: "center",
       backgroundColor:"#1D2023"
      },
  
  overview: {
    backgroundColor: "#282A37",
    textAlign: "justify",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "white",
    fontSize: 14,
  },
  overviewNotFound: {
    backgroundColor: "#282A37",
    textAlign: "justify",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "white",
    fontSize: 14,
    alignSelf: "center"
  },
  overviewNotFoundContainer:{
    backgroundColor: "#282A37",
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
export default SinglePageSeriesTv;


       {/* <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(29,32,35,0)', 'rgba(29,32,35,1)', 'rgba(29,32,35,0)']} style={{ 
    width: 200, 
    height: 100,
    zIndex: 1,
    position: "absolute",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    left: xAnimationLoading,
  }}> */}
      {/* </LinearGradient> */}
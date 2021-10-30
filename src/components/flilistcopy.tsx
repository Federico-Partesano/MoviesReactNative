import React, { useEffect, useState, useMemo, PureComponent } from "react";
import CardListOfCards from "./CardListOfCards";
import { useSelector, useDispatch } from "react-redux";
import { FlatList, useWindowDimensions, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { StackActions } from "@react-navigation/routers";
import { Dimensions } from "react-native";
import axios from "axios";
import { Platform, NativeModules } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import { RootState } from "../reducer";
import { flatMap } from "lodash";


type Props = {
  action: any;
  fetch: any;
  title: string;
  navigation: any;
  type: "tv" | "movie";
  route: any;
};

 let loadingNewMovies = false;

const ListOfCards: React.FC<Props> = ({route}) => {

  const [yy,setYy] = useState<any>(0);
  const { action,fetch ,title,type, navigation} = route.params;
  const [page, setPage] = useState(2);
  const movies = useSelector((state: any) => state[action]);
  const [moviesList,setMoviesList] = useState(movies);
  const dispatch = useDispatch();


//     useEffect(() => {
//     console.log(title);
//   }, []);

  async function appendMovies(page: number) {
    console.log(page);
    const keyApi = "68ae5fab2a5639e3730ea5e55c5b867e";

    const response: any = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${keyApi}&language=it&region=it&page=${page}`
    );
    const pp = [...moviesList,...response.data.results];
    setMoviesList(pp);
    setPage(page + 1);
    loadingNewMovies = false;
  }
  const headerHeight = useHeaderHeight();


  const checkScroll = (e: any) =>{
    const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 60 : StatusBarManager.HEIGHT;

    setYy(STATUSBAR_HEIGHT + headerHeight);
    if(e.nativeEvent.contentOffset.y >= Dimensions.get('screen').height - (STATUSBAR_HEIGHT + headerHeight)){
      if(!loadingNewMovies){
          loadingNewMovies = true;
    

  
      appendMovies(page);
      }
    

    }
  }



  const renderItem = ({ item, index }: any) => (        
      moviesList.map((element: any, index: number) => {
          if(index% 3 === 0 || (index + 1) === 1){
            return (<View style={styles.containerRow} key={"containerRow" + index}>
                {/* FIRST ELEMENT */}

              <TouchableOpacity
                key={"touchableopacityMyScroll" + title + index}
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
                <CardListOfCards type={type} key={"card" + title + index} data={element} />
              </TouchableOpacity>
                              {/* SECONDO ELEMENT */}

           {index + 1 < moviesList.length &&  <TouchableOpacity
                key={"touchableopacityMyScroll" + title + index + 1}
                onPress={() =>{
              
                    if(type === "movie"){
                      navigation.dispatch(
                      StackActions.push("Details", { idMovie: moviesList[index + 1].id })
                      )

                    } else{
                      navigation.dispatch(
                        StackActions.push("DetailsSinglePageSeriesTv", { idMovie: moviesList[index + 1].id })
                        ) 
                    }

                }
                }
              
              >
                <CardListOfCards type={type} key={"card" + title + index +1} data={moviesList[index + 1]} />
              </TouchableOpacity>}
                            {/* THIRD ELEMENT */}
              {index + 2 < moviesList.length &&  <TouchableOpacity
                key={"touchableopacityMyScroll" + title + index + 2}
                onPress={() =>{
              
                    if(type === "movie"){
                      navigation.dispatch(
                      StackActions.push("Details", { idMovie: moviesList[index + 2].id })
                      )

                    } else{
                      navigation.dispatch(
                        StackActions.push("DetailsSinglePageSeriesTv", {idMovie: moviesList[index + 2].id })
                        ) 
                    }

                }
                }
              
              >
                <CardListOfCards type={type} key={"card" + title + index + 2} data={moviesList[index + 2]} />
              </TouchableOpacity>}



              </View>
            )
              }
         
       
        })



  );


 
  return (
    <>
    
    {/* <Text style={{color: "red"}}>{yy}</Text> */}
 
      <FlatList
      data={moviesList}
      renderItem={renderItem}
      scrollEventThrottle={20}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        onScroll={checkScroll}
        
        style={styles.scrollView}
      />
        
        
     
     
    </>
  );
};

const styles = StyleSheet.create({
  containerRow:{ display: "flex", 
  flexDirection: "row",
  justifyContent: "space-evenly",
  marginVertical: 5,
},
  showMoreTitles:{
    color: "#626466",
    marginTop: 0,
    fontSize: 15,
  },
  containerTitleCard:{ display: "flex",
  width:"100%", flexDirection:"row",
   justifyContent: "space-between",
    paddingHorizontal: 25},

  title: {
    color: "#626466",
    fontWeight: "bold",
    marginTop: 0,
    fontSize: 15,
  },
  scrollView: {
    marginHorizontal: 0,
    backgroundColor: "#1D2023",
    height: 235,
    width: "100%",
  },
  text: {
    fontSize: 42,
  },
});

export default ListOfCards;

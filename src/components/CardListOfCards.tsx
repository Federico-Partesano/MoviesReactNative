import React from "react";

import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Image,
} from "react-native";

const img = "../images/memory.jpg";
interface Prop {
  poster_path: string;
  title?: string;
  character?: string;
  name?: string
}
type Props = {
  data: Prop;
  type: "tv" | "movie",
};

const CardListOfCards: React.FC<Props> = ({ data, type }: Props) => {
  let  threePoints = "";
  let titleCard = "";

  if(type === "movie"){
     threePoints = data.title!.length > 15 ? "..." : "";
     titleCard = data.title!.substring(0, 11);
  } else if(type === "tv"){
     threePoints = data.name!.length > 15 ? "..." : "";
     titleCard = data.name!.substring(0, 11);
  }


  const imageMovie = () =>{
    if(data.poster_path){
      return(  <Image
        //https://www.themoviedb.org/t/p/w300_and_h450_bestv2/bbqz34ytdrYUcK3GZSAwsrW2Ee7.jpg
        source={{
          uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`,
        }}
        style={styles.img}
      />)
    } else{
    return(
      <Image
      style={styles.img}
      source={require("./../images/film-poster-placeholder.png")}
    />
    )
    }
      }



  return (
    <View style={styles.container}>
      {imageMovie()}
      <Text style={styles.text}>
        {titleCard + threePoints}
      </Text>
     {data.character !== undefined && <Text style={styles.character}>{data.character }</Text>}
    
    </View>
  );
};

const styles = StyleSheet.create({
  character:{
    color: "#626466",
    fontSize: 12,
    fontWeight: "bold",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginRight: 7,
    marginLeft: 7,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  img: {
    width: 100,
    height: 170,
  },
  text: {
    maxWidth: 140,

    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
});
//color: "#626466",
export default CardListOfCards;

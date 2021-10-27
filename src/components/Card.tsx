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
  title: string;
  character?: string;
}
type Props = {
  data: Prop;
};

const MyCard: React.FC<Props> = ({ data }: Props) => {
  const threePoints = data.title.length > 15 ? "..." : "";

  return (
    <View style={styles.container}>
      <Image
        //https://www.themoviedb.org/t/p/w300_and_h450_bestv2/bbqz34ytdrYUcK3GZSAwsrW2Ee7.jpg
        source={{
          uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`,
        }}
        style={styles.img}
      />
      <Text style={styles.text}>
        {data.title.substring(0, 13) + threePoints}
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
    width: 140,
    height: 200,
  },
  text: {
    maxWidth: 140,

    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});
//color: "#626466",
export default MyCard;

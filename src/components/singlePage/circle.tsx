import React from "react";

import { StyleSheet, Text, ScrollView, View } from "react-native";

const Circle = ({ data }: any) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{`stato: ${data.status}`}</Text>
      </View>
     { data.release_date && <View style={styles.container}>
        <Text style={styles.text}>{`data rilascio: ${data.release_date}`}</Text>
      </View>
}
      <View style={styles.container}>
        <Text style={styles.text}>{`voto: ${data.vote_average}/10`}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.text}>
          {" "}
          {"generi: "}
          {data.genres.map((element: any) => {
            return `${element.name}  `;
          })}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#B1BBC5",
  },
  container: {
    marginHorizontal: 4,
    borderRadius: 50,
    backgroundColor: "#282A37",
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
});
//color: "#626466",
export default Circle;

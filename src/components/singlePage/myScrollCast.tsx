import React from "react";
import MyCardCast from "./CardCast";

import { StyleSheet, Text, ScrollView, View } from "react-native";

const MyScrollCast = ({ data }: any) => {
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.scrollView}
      >
        {data.cast.map((element: any, index: number) => {
          return <MyCardCast key={"cardCast" + index} data={element} />;
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: 10,
    width: "100%",
    height: 250,
    marginBottom: 4,
    backgroundColor: "#1D2023",
  },
  text: {
    color: "#B1BBC5",
  },
  container: {
    borderRadius: 50,
    backgroundColor: "#282A37",
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
});
//color: "#626466",
export default MyScrollCast;

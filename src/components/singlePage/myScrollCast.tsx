import React from "react";
import MyCardCast from "./CardCast";
import { StackActions } from "@react-navigation/routers";
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from "react-native";

const MyScrollCast = ({ data, navigation }: any) => {




  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.scrollView}
      >
        {data &&  data.cast.map((element: any, index: number) => {
        
          return (
          <TouchableOpacity key={"touchableOpacitycardCast" + index} onPress={() =>{
    

            navigation.dispatch(
              StackActions.push("CastPage", {idPerson: element.id})
            )
           
               

          }
           
          }>
          <MyCardCast key={"cardCast" + index} data={element}  />
          
          </TouchableOpacity>
        )})}
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

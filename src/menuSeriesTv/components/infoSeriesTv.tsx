import { array } from "prop-types";
import React from "react";

import { StyleSheet, Text, ScrollView, View } from "react-native";

const InfoSeriesTv = ({ data }: any) => {


  return (
    <>


        {/*    ORIGINAL  TITLE NAME     */}
        <View style={styles.container}>
        <View style={styles.sectionInfo}>
          <Text style={styles.textSectionInfoLeft}>Titolo originale: </Text>
          <Text style={styles.textSectionInfoRight}>{data.id}</Text>
        </View>
    
      {/*    ORIGINAL  IN PRODUCTION     */}
        <View style={styles.sectionInfo}>
          <Text style={styles.textSectionInfoLeft}>In produzione: </Text>
          <Text style={styles.textSectionInfoRight}>{data.in_production === false ? "no" : "sì"}</Text>
        </View>
        {/*    FIRST AIR DATE  */}
        <View style={styles.sectionInfo}>
          <Text style={styles.textSectionInfoLeft}>Prima messa in onda: </Text>
          <Text style={styles.textSectionInfoRight}>
            {data.first_air_date}
          </Text>
        </View>

         {/*    LAST AIR DATE  */}
         <View style={styles.sectionInfo}>
          <Text style={styles.textSectionInfoLeft}>Ultima messa in onda: </Text>
          <Text style={styles.textSectionInfoRight}>
            {data.last_air_date}
          </Text>
        </View>

           {/*    number_of_seasons */}
           <View style={styles.sectionInfo}>
          <Text style={styles.textSectionInfoLeft}>Stagioni: </Text>
          <Text style={styles.textSectionInfoRight}>
            {data.number_of_seasons}
          </Text>
        </View>

              {/*    number_of_episodes */}
              <View style={styles.sectionInfo}>
          <Text style={styles.textSectionInfoLeft}>Episodi: </Text>
          <Text style={styles.textSectionInfoRight}>
            {data.number_of_episodes}
          </Text>
        </View>



        {/*    COMPANIES      */}
        <View style={styles.sectionInfo}>
          <Text style={styles.textSectionInfoLeft}>Produzione: </Text>
          <Text style={styles.textSectionInfoRight}>
            {data.production_companies.map((element: any, index: number) => {
               return index === data.production_companies.length - 1 ? `${element.name}   `:`${element.name},   `
            })}
          </Text>
        </View>

          {/*    NETWORKS     */}
          <View style={styles.sectionInfo}>
          <Text style={styles.textSectionInfoLeft}>Piattaforme streaming: </Text>
          <Text style={styles.textSectionInfoRight}>
            {data.networks.map((element: any, index: number) => {
               return index === data.networks.length - 1 ? `${element.name}   `:`${element.name},   `
            })}
          </Text>
        </View>



           {/* BUDGET     
        <View style={styles.sectionInfo}>
          <Text style={styles.textSectionInfoLeft}>Budget: </Text>
          <Text style={styles.textSectionInfoRight}>{data.budget === 0 ? "Non disponibile" : data.budget}</Text>
        </View> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textSectionInfoRight: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
  },
  textSectionInfoLeft: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
  },
  sectionInfo: {
    paddingVertical: 5,
    display: "flex",
    flexDirection: "row",
  },
  text: {
    color: "#B1BBC5",
  },
  container: {
    backgroundColor: "#282A37",
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
});
//color: "#626466",
export default InfoSeriesTv;

import { array } from "prop-types";
import React from "react";

import { StyleSheet, Text, ScrollView, View } from "react-native";

const InfoMovie = ({ data }: any) => {
  const getBudget = (): string => {
    let finalStringBudget: string = "";
  const arrayBudget =  data.budget.toString().split( /(?=(?:...)*$)/ )  ; 
  for (const [key, value] of Object.entries(arrayBudget)) {
    let v: any = value;
    if(parseInt(key) === arrayBudget.length - 1){
    finalStringBudget =  finalStringBudget.concat(v.toString() + " €");
    } else{
      finalStringBudget =  finalStringBudget.concat(v.toString() + ".");
    }
  }
return finalStringBudget;
}

  return (
    <>
      {/*    ORIGINAL  TITLE     */}
      <View style={styles.container}>
        <View style={styles.sectionInfo}>
          <Text style={styles.textSectionInfoLeft}>Titolo originale: </Text>
          <Text style={styles.textSectionInfoRight}>{data.original_title}</Text>
        </View>
        {/*    ORIGINAL  LANGUAGE     */}
        <View style={styles.sectionInfo}>
          <Text style={styles.textSectionInfoLeft}>Lingua originale: </Text>
          <Text style={styles.textSectionInfoRight}>
            {data.original_language}
          </Text>
        </View>

        {/*    COMPANIES  LANGUAGE     */}
        <View style={styles.sectionInfo}>
          <Text style={styles.textSectionInfoLeft}>Produzione: </Text>
          <Text style={styles.textSectionInfoRight}>
            {data.production_companies.map((element: any) => {
              return `${element.name}  `;
            })}
          </Text>
        </View>

        {/*    BUDGET      */}
        <View style={styles.sectionInfo}>
          <Text style={styles.textSectionInfoLeft}>Budget: </Text>
          <Text style={styles.textSectionInfoRight}>{data.budget === 0 ? "Non disponibile" : getBudget()}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textSectionInfoRight: {
    flex: 2,
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
export default InfoMovie;

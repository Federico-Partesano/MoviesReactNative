import React, { useLayoutEffect, useState, useEffect } from "react";
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

const CastPage = ({ route, navigation }: any) => {
    const [detailsPerson, setDetailsPerson] = useState<any>(null);
    const [biografy, setBiografy] = useState<any>(null);
    const { idPerson } = route.params;
    
    const keyApi = "68ae5fab2a5639e3730ea5e55c5b867e";

  async function getDetailsMovie() {
      const response: any = await axios.get(
        `https://api.themoviedb.org/3/person/${idPerson}?api_key=${keyApi}&language=it&append_to_response=translations,movie_credits`
      );
      setDetailsPerson(response.data);
      setBiografy(response.data.biography ? response.data.biography : response.data.translations.translations[0].data.biography);
  
      }
      const getBiografy = () =>{

      }
      useEffect(() => {
          getDetailsMovie();
          getBiografy();
        
      }, [])
return(
    <ScrollView style={styles.container}>
<View style={styles.containerProfile}>
{ detailsPerson && (<><Image
        //https://www.themoviedb.org/t/p/w300_and_h450_bestv2/bbqz34ytdrYUcK3GZSAwsrW2Ee7.jpg
        source={{
          uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${detailsPerson.profile_path}`,
        }}
        style={styles.img}
      />

  
      <View style={styles.containerProfileRight}>

                {/*   NAME PERSON */}
        <Text style={styles.namePerson}>{detailsPerson.name}</Text>
  

         {/*   BIRTHDAY PERSON */}
         <View>
         <Text style={styles.title}>Data di nascita</Text>
         <Text style={styles.bodyTitle}>{detailsPerson.birthday}</Text>
            </View>
  {/*   PLACE OF BIRTH BORN PERSON */}
            <View>
         <Text style={styles.title}>Luogo di nascita</Text>
         <Text style={styles.bodyTitle}>{detailsPerson.place_of_birth}</Text>
            </View>


     


         </View>
         


      </>
      )
      }


     </View>
     { biografy && (<>

     <Text style={{color: "white", alignSelf: "center", fontWeight: "bold", fontSize: 20}}>Biografia</Text>
     <Text style={{color: "white", paddingHorizontal: 10, marginBottom: 30}}>{biografy}</Text>
      </>) }

     { detailsPerson && <MyScrollViewRaccomandation title={"Filmografia"} movie={detailsPerson.movie_credits.cast} navigation={navigation} ></MyScrollViewRaccomandation>}

    </ScrollView>

  );
};

const styles = StyleSheet.create({
    title:{
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
    bodyTitle:{
        color: "white",
        fontSize: 13,
    
    },
    namePerson:{
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    containerProfileRight:{
        flex: 1,
        marginHorizontal: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
    containerProfile:{
        paddingHorizontal: 20,
        paddingVertical:20,
        display: "flex",
        flexDirection: "row",
    },
    container:{
        backgroundColor: "#1D2023",
     display: "flex",
     flexDirection: "column",
    },
    img: {
        flex: 1,
        width: 150,
        height: 250,
    }

});
//color: "#626466",
export default CastPage;

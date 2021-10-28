import React, { useLayoutEffect, useState, useEffect } from "react";
import MyScrollViewRaccomandation from "./components/singlePage/myScrollViewRaccomandation";
import { ActivityIndicator } from "react-native";
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

      if(response.data.biography && response.data.biography.length > 0){
        setBiografy(response.data.biography );
      } else if(response.data.translations.translations.length > 0 &&   response.data.translations.translations[0].data.biography && response.data.translations.translations[0].data.biography.length > 0){
          setBiografy(response.data.translations.translations[0].data.biography);
      } else{
          setBiografy("Non disponibile");
      }
   //   setBiografy((response.data.biography && response.bi) ? response.data.biography : response.data.translations.translations[0].data.biography ? response.data.translations.translations[0].data.biography : "Biografia non disponibile");
  
  }

  const imagePerson = () =>{
    if(detailsPerson.profile_path){
      return(  <Image
        //https://www.themoviedb.org/t/p/w300_and_h450_bestv2/bbqz34ytdrYUcK3GZSAwsrW2Ee7.jpg
        source={{
          uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${detailsPerson.profile_path}`,
        }}
        style={styles.img}
      />)
    } else{
    return(
      <Image
      style={styles.img}
      source={require("./images/placeholder-user.png")}
    />
    )
    }
      }





      useEffect(() => {
          getDetailsMovie();
        
        
      }, [])

      const getPage = () =>{
    if(detailsPerson  && biografy ){
        return(
            <ScrollView style={styles.container}>
        <View style={styles.containerProfile}>
            {imagePerson()}
          
              <View style={styles.containerProfileRight}>
        
                        {/*   NAME PERSON */}
                <Text style={styles.namePerson}>{detailsPerson.name}</Text>
          
        
                 {/*   BIRTHDAY PERSON */}
                 <View>
                 <Text style={styles.title}>Data di nascita</Text>
                 <Text style={styles.bodyTitle}>{detailsPerson.birthday !== null ? detailsPerson.birthday : "Non disponibile"}</Text>
                    </View>
          {/*   PLACE OF BIRTH BORN PERSON */}
                    <View>
                 <Text style={styles.title}>Luogo di nascita</Text>
                 <Text style={styles.bodyTitle}>{detailsPerson.place_of_birth !== null ? detailsPerson.place_of_birth : "Non disponibile"}</Text>
                    </View>
        
                 </View>
        
             </View>
        
        
             <Text style={{color: "white", alignSelf: "center", fontWeight: "bold", fontSize: 20}}>Biografia</Text>
             <Text style={{color: "white", paddingHorizontal: 10, marginBottom: 30, paddingVertical: 10, marginTop: 10, backgroundColor: "#282A37"}}>{biografy}</Text>
              
            <MyScrollViewRaccomandation title={"Filmografia"} movie={detailsPerson.movie_credits.cast} navigation={navigation} ></MyScrollViewRaccomandation>
        
            </ScrollView>
        
          

        )
        
    }

      else {
        return(<View style={styles.containerLoadingPage} >
            <View>
     
            <Text style={styles.textLoadingPage}>Caricamento in corso...</Text>
    
            <ActivityIndicator style={{ zIndex: 2}} size="large" color="white" />
            </View>
            </View>)

      }
    }

    return(
        getPage()
        );

        

};


const styles = StyleSheet.create({
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

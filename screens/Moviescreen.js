import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Platform} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';

var{width,height}= Dimensions.get('window')
const ios= Platform.OS=='ios'
const TopMargin = ios? '' : 3


export default function Moviescreen() {

    const{params:item}=useRoute()
    const[isFavorite,toggleFavorite]= useState(false)
    let moviename = "Ant-Man and the Wasp : Quantumania"
    const[cast,setCast]=useState([1,2,3,4,5])
    const[similarMovies,setSimilarMovies]=useState([1,2,3,4,5])
    const[loading,setLoading]=useState(false)

    const navigation = useNavigation()
    useEffect(()=>{
        //call api
    },[item])
  return (
    <ScrollView
    contentContainerStyle={{paddingBottom:20}}
    style={styles.container}
    >
        {/* back button and poster */} 
        <View style={{width:'100%'}}>
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={()=> navigation.goBack()}  style={{ padding:8, borderRadius:20 ,backgroundColor:'#E83550', marginLeft: 16, marginTop:5}}>
                    <Entypo name="chevron-left" size={28} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> toggleFavorite(!isFavorite)}>
                    <AntDesign name="heart" size={28} color={ isFavorite? '#E83550':"white"} style={{paddingRight:12, paddingLeft:width*0.74 }}/>
                </TouchableOpacity>
            </SafeAreaView>
            {
                loading?(
                    <Loading/>
                ):(
                    <View>
                        <Image source={require('../assets/pics/moviePoster2.png')} style={{width, height:height*0.55}}/>
                        <LinearGradient
                            colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                            style={{width, height: height * 0.4, position: 'absolute', bottom: 0 }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            />
                    </View>
                )
            }
            
        </View>

        {/* movie details */}
        <View style={{ marginTop:-(height*0.09) ,paddingBottom: 10}}>
            <Text style={{color:"white", textAlign:'center', fontSize: 28, fontWeight:'bold', letterSpacing:1.0}}> 
            {moviename}
            </Text>

            {/*other info about movie */}
            <Text style={{color:'#A3A3A3', fontWeight:'600', fontSize:16,textAlign:'center', marginTop:9}}>
                Released . 2020 . 170 min
            </Text>

            {/* genres*/}
            <View style={{ flexDirection:'row', justifyContent:'center', marginHorizontal:4, marginRight: 8, paddingVertical:12 }}>
                <Text style={{ fontWeight:'600', color: '#A3A3A3', fontSize:16, textAlign:'center'}}>
                    Action .
                </Text>
                <Text style={{ fontWeight:'600', color: '#A3A3A3', fontSize:16, textAlign:'center'}}>
                    Thrill .
                </Text>
                <Text style={{ fontWeight:'600', color: '#A3A3A3', fontSize:16, textAlign:'center'}}>
                    Comedy 
                </Text>
            </View>

            {/* movie description */}
            <Text style={{ color: '#A3A3A3', marginHorizontal:15, letterSpacing:1.0}}>
            In this thrilling new adventure, Scott is living life to the fullest as he tries to juggle between his normal life and superhero life as the titular Ant-Man. When his now-teenage daughter, Cassie, builds a mysterious device in the basement, the device malfunctions as it sends both her, Scott, Hope and her parents down into the Quantum Realm. From there, the two families all try their best to survive whilst also encountering a lot of the realm's mysterious inhabitants and settings. However, they are forced to come into blows with a ruthless and tyrannical conqueror who threatens the safety of the multiverse.
            </Text>
        </View>
            {/* cast */}
            <Cast cast={cast}  navigation={navigation} />
            {/* similar movies */}
            <MovieList title={"Similar movies"} hideSeeAll={true} data={similarMovies}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#171717',
    },
    header:{
        flexDirection:'row', 
         alignItems:'center' , 
         justifyContent:'space-between',
         zIndex:20,
         paddingHorizontal:4, 
         position:'absolute',
         marginTop:TopMargin
    },
})
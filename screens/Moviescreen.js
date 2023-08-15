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
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';

var{width,height}= Dimensions.get('window')
const ios= Platform.OS=='ios'
const TopMargin = ios? '' : 3


export default function Moviescreen() {

    const{params:item}=useRoute()
    const[isFavorite,toggleFavorite]= useState(false)
    let moviename = "Ant-Man and the Wasp : Quantumania"
    const[cast,setCast]=useState([])
    const[similarMovies,setSimilarMovies]=useState([])
    const[loading,setLoading]=useState(false)
    const[movie,setMovie]=useState({})
 
    const navigation = useNavigation()
    useEffect(()=>{
        setLoading(true)
        getMovieDetails(item.id)
        getMovieCredits(item.id)
        getSimilarMovies(item.id)
    },[item])

    const getMovieDetails= async id=>{
        const data = await fetchMovieDetails(id)
        //console.log('movie details: ', data)
        if(data){
            setMovie(data)
        }
        setLoading(false)
    }
    const getMovieCredits= async id=>{
        const data = await fetchMovieCredits(id)
        //console.log('movie credits: ', data)
        if (data && data.cast) {
            setCast(data.cast)
        }
       
    }

    const getSimilarMovies= async id=>{
        const data = await fetchSimilarMovies(id)
        //console.log('movie credits: ', data) 
        if (data && data.results) {
            setSimilarMovies(data.results)
        }      
    }
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
                        <Image source={{uri: image500(movie?.poster_path) || fallbackMoviePoster }} style={{width, height:height*0.55}}/>
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
            {movie?.title}
            </Text>

            {/*other info about movie */}
            {
                movie?.id?(
                    <Text style={{color:'#A3A3A3', fontWeight:'600', fontSize:16,textAlign:'center', marginTop:9}}>
                        {movie?.status} . {movie?.release_date?.split('-')[0]} . {movie?.runtime} min
                    </Text>
                ):null
            }
           

            {/* genres*/}
            <View style={{ flexDirection:'row', justifyContent:'center', marginHorizontal:4, marginRight: 8, paddingVertical:12 }}>
                {
                    movie?.genres?.map((genre, index)=>{
                        let showDot = index+1 != movie.genres.length
                        return(
                            <Text key={index} style={{ fontWeight:'600', color: '#A3A3A3', fontSize:16, textAlign:'center'}}>
                               {genre?.name} {showDot? "." : null}
                            </Text>
                        )
                    })
                }
            </View>

            {/* movie description */}
            <Text style={{ color: '#A3A3A3', marginHorizontal:15, letterSpacing:1.0}}>
                {movie?.overview}
            </Text>
        </View>
            {/* cast */}
             { cast.length>0 && <Cast cast={cast}  navigation={navigation} /> }
            {/* similar movies */}
            { similarMovies.length>0 && <MovieList title={"Similar movies"} hideSeeAll={true} data={similarMovies}/>}
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
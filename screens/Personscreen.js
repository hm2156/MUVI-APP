import { View, Text, Dimensions, Platform, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovieCredits, image342 } from '../api/moviedb';

var{width,height}= Dimensions.get('window')
const ios = Platform.OS =='ios'
const verticalmargin= ios?'': 3

export default function Personscreen() {
    const navigation= useNavigation()
    const[isFavorite,toggleFavorite]= useState(false)
    const[personMovies,setPersonMovies]= useState([])
    const[loading,setLoading]=useState(false)
    const[person,setPerson]=useState({})
    const{params:item}= useRoute()

    useEffect(()=>{
        setLoading(true)
        getPersonDetails(item.id)
        getPersonMovies(item.id)
    },[item])

    const getPersonDetails = async id =>{
        const data = await fetchPersonDetails(id);
        if(data){
            setPerson(data)
        }
        setLoading(false)
    }
    const getPersonMovies = async id =>{
        const data = await fetchPersonMovieCredits(id);
        if(data && data.cast){
            setPersonMovies(data.cast)
        }
    }
  return (
    <ScrollView style={{ flex: 1 , backgroundColor:'#171717', }} contentContainerStyle={{paddingBottom:20}}>

        {/* back button  */}
        <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={()=> navigation.goBack()}  style={{ padding:8, borderRadius:20 ,backgroundColor:'#E83550', marginLeft: 16, marginTop:5}}>
                    <Entypo name="chevron-left" size={28} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> toggleFavorite(!isFavorite)}>
                    <AntDesign name="heart" size={28} color={ isFavorite? '#C79C37':"white"} style={{paddingRight:12, paddingLeft:width*0.74 }}/>
                </TouchableOpacity>
        </SafeAreaView>

        {/* person details  */}
        {
            loading?(
                <Loading/>
            ):(
                <View>
                    <View style={{ flexDirection:'row', justifyContent:'center', shadowColor:'grey', shadowRadius:40, shadowOffset:{width:0 , height:5}, shadowOpacity:1,}}>
                        <View style={{ overflow:'hidden', alignItems:'center', borderRadius:999 , height:288, width:288, borderColor:'#737373', borderWidth:1,}}>
                            <Image source={{uri: image342(person?.profile_path) || fallbackPersonImage }} style={{ height:height*0.43, width:width*0.74}}/>
                        </View>
                        
                    </View>
                    <View style={{ marginTop:24,}}>
                        <Text style={{ color:'white', textAlign:'center', fontWeight:'bold', fontSize:30,}}>  {person?.name} </Text>
                        <Text style={{ color:'#737373', textAlign:'center', fontSize:16,}}>  {person?.place_of_birth} </Text>
                    </View>
                    {/* personal info */}
                    <View style={{ marginLeft: 12, marginRight:19, marginTop:24, flexDirection:'row', justifyContent:'space-evenly', alignItems:'center', backgroundColor:'#404040', borderRadius:9999, padding:16}}>
                        <View style={{ borderRightWidth:2, borderRightColor:'#A3A3A3',paddingRight:8, paddingLeft:8, alignItems:'center'}}>
                            <Text style={{ color:'white', fontWeight:'600'}}> Gender</Text>
                            <Text style={{ color:'#d4d4d4', fontSize:12}}> {person?.gender=='1'? 'Female':'Male'  }</Text>
                        </View>
                        <View style={{ borderRightWidth:2, borderRightColor:'#A3A3A3',paddingRight:8, paddingLeft:8, alignItems:'center'}}>
                            <Text style={{ color:'white', fontWeight:'600'}}> Birthday</Text>
                            <Text style={{ color:'#d4d4d4', fontSize:12}}> {person?.birthday}</Text>
                        </View>
                        <View style={{ borderRightWidth:2, borderRightColor:'#A3A3A3',paddingRight:8, paddingLeft:8, alignItems:'center'}}>
                            <Text style={{ color:'white', fontWeight:'600'}}> Known for</Text>
                            <Text style={{ color:'#d4d4d4', fontSize:12}}> {person?.known_for_department}</Text>
                        </View>
                        <View style={{ paddingRight:5, paddingLeft:7, alignItems:'center'}}>
                            <Text style={{ color:'white', fontWeight:'600'}}> Popularity</Text>
                            <Text style={{ color:'#d4d4d4', fontSize:12}}> {person?.popularity?.toFixed(2)} %</Text>
                        </View>
                    </View>
                    {/* biography */}
                    <View style={{ marginTop:24, marginBottom:24, marginRight:16,marginLeft:18, }}>
                        <Text style={{ color:'white', fontSize:19, marginTop:8}}> Biography</Text>
                        <Text style={{color: "#A3A3A3", letterSpacing: 0.9,marginTop:8, fontSize:16}}>
                            {person?.biography || 'N/A'}
                        </Text>
                    </View>
        
                    {/* movies */}
                     <MovieList data={personMovies} title={'Movies'} hideSeeAll={true} /> 
                   
            </View>
            )
        }
        
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    header:{
        flexDirection:'row', 
         alignItems:'center' , 
         justifyContent:'space-between',
         zIndex:20,
         paddingHorizontal:4,  
         marginVertical: verticalmargin,        
    },
})
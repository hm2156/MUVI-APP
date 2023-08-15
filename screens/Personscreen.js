import { View, Text, Dimensions, Platform, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';

var{width,height}= Dimensions.get('window')
const ios = Platform.OS =='ios'
const verticalmargin= ios?'': 3

export default function Personscreen() {
    const navigation= useNavigation()
    const[isFavorite,toggleFavorite]= useState(false)
    const[personMovies,setPersonMovies]= useState([1,2,3,4,5])
    const[loading,setLoading]=useState(false)

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
                            <Image source={require('../assets/pics/castImage2.png')} style={{ height:height*0.43, width:width*0.74}}/>
                        </View>
                        
                    </View>
                    <View style={{ marginTop:24,}}>
                        <Text style={{ color:'white', textAlign:'center', fontWeight:'bold', fontSize:30,}}>  Keanu Reevs </Text>
                        <Text style={{ color:'#737373', textAlign:'center', fontSize:16,}}>  London, United Kingdom </Text>
                    </View>
                    {/* personal info */}
                    <View style={{ marginLeft: 12, marginRight:12, marginTop:24, flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:'#404040', borderRadius:9999, padding:16}}>
                        <View style={{ borderRightWidth:2, borderRightColor:'#A3A3A3',paddingRight:8, paddingLeft:8, alignItems:'center'}}>
                            <Text style={{ color:'white', fontWeight:'600'}}> Gender</Text>
                            <Text style={{ color:'#d4d4d4', fontSize:14}}> Male</Text>
                        </View>
                        <View style={{ borderRightWidth:2, borderRightColor:'#A3A3A3',paddingRight:8, paddingLeft:8, alignItems:'center'}}>
                            <Text style={{ color:'white', fontWeight:'600'}}> Birthday</Text>
                            <Text style={{ color:'#d4d4d4', fontSize:14}}> 1964-09-02</Text>
                        </View>
                        <View style={{ borderRightWidth:2, borderRightColor:'#A3A3A3',paddingRight:8, paddingLeft:8, alignItems:'center'}}>
                            <Text style={{ color:'white', fontWeight:'600'}}> Known for</Text>
                            <Text style={{ color:'#d4d4d4', fontSize:14}}> Acting</Text>
                        </View>
                        <View style={{ paddingRight:8, paddingLeft:8, alignItems:'center'}}>
                            <Text style={{ color:'white', fontWeight:'600'}}> Popularity</Text>
                            <Text style={{ color:'#d4d4d4', fontSize:14}}> 64.2</Text>
                        </View>
                    </View>
                    {/* biography */}
                    <View style={{ marginTop:24, marginBottom:24, marginRight:16,marginLeft:18, }}>
                        <Text style={{ color:'white', fontSize:19, marginTop:8}}> Biography</Text>
                        <Text style={{color: "#A3A3A3", letterSpacing: 0.9,marginTop:8, fontSize:16}}>
                            Keanu Charles Reeves, whose first name means "cool breeze over the mountains" in Hawaiian, was born September 2, 1964 in Beirut, Lebanon. He is the son of Patric Reeves, a showgirl and costume designer, and Samuel Nowlin Reeves, a geologist. Keanu's father was born in Hawaii, of British, Portuguese, Native Hawaiian, and Chinese ancestry, and Keanu's mother is originally from Essex England. After his parents' marriage dissolved, Keanu moved with his mother and younger sister, Kim Reeves, to New York City, then Toronto. Stepfather #1 was Paul Aaron, a stage and film director - he and Patricia divorced within a year, after which she went on to marry (and divorce) rock promoter Robert Miller. Reeves never reconnected with his biological father. In high school, Reeves was lukewarm toward academics but took a keen interest in ice hockey (as team goalie, he earned the nickname "The Wall") and drama. He eventually dropped out of school to pursue an acting career.
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
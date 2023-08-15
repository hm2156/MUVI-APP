import { StyleSheet, Text, View , TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Trendingmovie from '../components/Trendingmovie';
import { useState } from 'react';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';

const Homescreen = () => {
    const[trending,setTrending]=useState([1,2,3])
    const[upcoming,setUpcoming]=useState([1,2,3])
    const[topRated,setTopRated]=useState([1,2,3])
    const[loading,setLoading]=useState(false)
    const navigation=useNavigation()
  return (
    <View style={styles.container}>
        {/*  search bar and logo*/}
      <SafeAreaView style={styles.viewer}>
        <StatusBar style='light'/>
        <View style={styles.logobox}>
            <Octicons name="three-bars" size={30} color='#FFFFFF' style={{marginLeft:17}} />
            <Text style={styles.name}> Muvi </Text>
            <TouchableOpacity>
            <MaterialCommunityIcons onPress={()=>navigation.navigate("Search")} name="magnify" size={35} color='#FFFFFF' style={{marginRight:17}}/>
            </TouchableOpacity>
        </View>
      </SafeAreaView>

      {
        loading?(
          <Loading/>
        ):(
            <ScrollView style={styles.trending}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:10}}
            >
              {/*  trending movies carousel */}
              <Trendingmovie data={trending} />
              {/*  upcoming new movies carousel */}
              <MovieList title="Upcoming movies" data={upcoming}/>
              <MovieList title="Top Rated movies " data={topRated}/>
      
            </ScrollView>
        )
      }

    </View>
  )
}

export default Homescreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#171717',
    },
    viewer:{
        marginBottom:-2,
    },
    logobox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:4,
        marginTop:18,
    },
    name:{
        fontWeight:'bold',
        fontSize:30,
        color:'#E83550',
    },
    trending:{},
    
})
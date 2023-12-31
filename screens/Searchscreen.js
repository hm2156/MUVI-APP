import { View, Text , Dimensions, SafeAreaView, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback,Image} from 'react-native'
import React, { useCallback, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { fallbackMoviePoster, image185, searchMovie } from '../api/moviedb';

const {width,height}= Dimensions.get('window')

export default function Searchscreen() {
    const navigation=useNavigation()
    const[results,setResults]=useState([])
    let moviename = "Ant-Man and the Wasp : Quantumania"
    const[loading,setLoading]=useState(false)

    const handleSearch = value=>{
        if(value && value.length>2){
            setLoading(true)
            searchMovie({
                query: value,
                include_adult :'false',
                language:'en-US',
                page:'1'
            }).then(data=>{
                setLoading(false)
                if (data && data.results) {
                   setResults(data.results) 
                }
            })
        }
        else{
            setLoading(false)
            setResults([])
        }
    }
    function debounce(callback, delay) {
        let timeoutId;
      
        return function (...args) {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            callback(...args);
          }, delay);
        };
      }
    const handleTextDebounce = useCallback(debounce(handleSearch,700), [])

  return (
    <SafeAreaView style={{ backgroundColor:'#262626', flex:1}}>
      <View style={{ alignItems:'center',marginRight:16, marginLeft:16, marginBottom:12, flexDirection:'row', justifyContent:'space-between', borderColor:'#737373',borderRadius:9999, borderWidth:1,}}>
        <TextInput onChangeText={handleTextDebounce} placeholder='Search Movie' placeholderTextColor={'lightgray'} style={{ paddingTop:4,paddingBottom:6, flex:1, paddingLeft:24, fontWeight:'500',fontSize:16, color:'white', letterSpacing:0.05*16}}/>
        <TouchableOpacity onPress={()=>{navigation.navigate("Home")}} style={{borderRadius:9999, padding:12,margin:4,backgroundColor:'#737373' }}>
            <AntDesign name="close" size={25} color="white" />
        </TouchableOpacity>
      </View>
      {/* search results */}
      {
        loading?(
            <Loading/>
        ):
        
            results.length>0?(
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:15} } style={{marginTop:12, }}>
                <Text style={{color:'white', fontWeight:'600', marginLeft:4}}> Results ({results.length}) </Text>
                <View style={{ flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap', }}>
                    {
                        results.map((item,index)=>{
                            return(
                                <TouchableWithoutFeedback key={index} onPress={()=> navigation.push('Movie',item)}>
                                    <View style={{marginTop:8, marginBottom:16,}}>
                                        <Image  source={{uri: image185(item?.poster_path) || fallbackMoviePoster}} style={{borderRadius:24, width:width*0.44, height:height*0.3}}/>
                                        <Text style={{ color: '#d4d4d4', marginLeft:4 , marginTop:5, fontSize:15}}>
                                            {
                                                item?.title.length>22?item?.title.slice(0,22)+'...':item?.title
                                            }
                                        </Text>
                                    
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })
                    }
                </View>
            </ScrollView>
    
            ):(
                <View style={{flexDirection:'row',justifyContent:'center',}}>
                    <Image source={require('../assets/pics/movieTime.png')} style={{height:384, width:384}}/>
                </View>
            )
          
      }
      
    </SafeAreaView>
  )
}
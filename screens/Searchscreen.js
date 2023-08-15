import { View, Text , Dimensions, SafeAreaView, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback,Image} from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';

const {width,height}= Dimensions.get('window')
export default function Searchscreen() {
    const navigation=useNavigation()
    const[results,setResults]=useState([])
    let moviename = "Ant-Man and the Wasp : Quantumania"
    const[loading,setLoading]=useState(false)

  return (
    <SafeAreaView style={{ backgroundColor:'#262626', flex:1}}>
      <View style={{ alignItems:'center',marginRight:16, marginLeft:16, marginBottom:12, flexDirection:'row', justifyContent:'space-between', borderColor:'#737373',borderRadius:9999, borderWidth:1,}}>
        <TextInput placeholder='Search Movie' placeholderTextColor={'lightgray'} style={{ paddingTop:4,paddingBottom:6, flex:1, paddingLeft:24, fontWeight:'500',fontSize:16, color:'white', letterSpacing:0.05*16}}/>
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
                                        <Image  source={require('../assets/pics/moviePoster2.png')} style={{borderRadius:24, width:width*0.44, height:height*0.3}}/>
                                        <Text style={{ color: '#d4d4d4', marginLeft:4 , marginTop:5, fontSize:15}}>
                                            {
                                                moviename.length>22?moviename.slice(0,22)+'...':moviename
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
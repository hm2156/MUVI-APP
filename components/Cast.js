import { View, Text , StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native'
import React from 'react'


export default function Cast({cast, navigation}) {
    let personName= 'Keanu Reevs'
    let characterName = 'John Wick'

  return (
    <View style={{marginVertical:7, marginLeft:7}}>
      <Text style={{ fontSize:20,color:'white', marginHorizontal:4, marginBottom:12 }}> Top Cast </Text>
      {/* cast members */}
      <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal:14,}}>
        {
            cast && cast.map((person,index)=>{
                return(
                    <TouchableOpacity onPress={()=> navigation.navigate('Person',person)}   key={index} style={{marginRight:4,alignItems:'center', }}>
                        <View style={{ overflow:'hidden', borderRadius:9999, height:80,width:80, alignItems:'center' , borderColor:'#737373', marginHorizontal:6, borderWidth:1,}}>
                             <Image source={require('../assets/pics/castImage2.png')}  style={{ borderRadius: 16 ,height:96, width:80, marginHorizontal:9}}/>
                        </View>                        
                        <Text style={{color:'white', fontSize:12, marginTop:1}}> 
                            {
                                characterName.length>10?characterName.slice(0,10)+'...': characterName
                            }
                        </Text>
                        <Text style={{color:'#A3A3A3', fontSize:12, marginTop:1}}> 
                            {
                                personName.length>10?personName.slice(0,10)+'...': personName
                            }
                        </Text>

 
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})
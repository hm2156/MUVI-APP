import { View, Text , StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, image185 } from '../api/moviedb'


var{width,height}= Dimensions.get('window')

export default function MovieList({title,data, hideSeeAll}) {
    let moviename = "Ant-Man and the Wasp : Quantumania"
    const navigation= useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.titlebox}>
        <Text style={styles.title}>{title}</Text>
            {
                !hideSeeAll &&(
                    <TouchableOpacity>
                         <Text style={{ fontSize:20 ,color:'#E83550'}}> See All </Text>
                  </TouchableOpacity>

                )
            }
      </View>
      {/* movie row */}
      <ScrollView
       horizontal
       showsHorizontalScrollIndicator={false}
       contentContainerStyle={{paddingHorizontal:15}}>
        {
            data.map((item,index)=>{
                return(
                   <TouchableWithoutFeedback
                        key={index}
                        onPress={()=> navigation.push("Movie", item)}
                   >
                        <View style={styles.movieimg}>
                            <Image source={{uri: image185(item.poster_path) || fallbackMoviePoster}}  style={styles.poster}/>
                            <Text style={{ color: 'white'}}> 
                            {
                                item.title.length>14?item.title.slice(0,14)+'...':item.title
                            } 
                            </Text>
                        </View>
                        
                   </TouchableWithoutFeedback>
                )
            })
        }


      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginBottom:4,
        marginTop:10,
    },
    titlebox:{
        marginHorizontal:8,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:8,
        marginTop:7,
    },
    title:{
        color:'#FFFFFF',
        fontSize:23,
    },
    movieimg:{
        marginRight:4,
        marginVertical:1,
        marginTop:7,
        marginHorizontal:7,
    },
    poster:{
        borderRadius:24,
        width:width*0.33,
        height:height*0.22,
    },

})
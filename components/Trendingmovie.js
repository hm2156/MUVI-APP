import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, Image} from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';


var{width,height}= Dimensions.get('window')
export default function Trendingmovie({data}) {
    const navigation = useNavigation()
    const handleClick = (item)=>{
        navigation.navigate("Movie",item)
    }
  return (
    <View style={styles.container}>
      <Text style={{ color:'#FFFFFF', marginBottom:10, fontSize:30, marginRight: 16, marginLeft:16, marginTop:7}}>Trending </Text>
      <Carousel 
      data={data}
      renderItem={({item})=> <Moviecard item={item} handleClick={handleClick}/>}
      firstItem={1}
      inactiveSlideOpacity={0.60}
      sliderWidth={width}
      itemWidth={width*0.62}
      slideStyle={{display:'flex', alignItems:'center'}}
      />
    </View>
  )
}

const Moviecard = ({item, handleClick})=>{
    return(
        <TouchableWithoutFeedback onPress={()=> handleClick(item)}>
            <Image source={require('../assets/pics/moviePoster1.png')} style={{ width:width*0.6 , height: height*0.4, borderRadius:24}}/>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
  container:{
    marginBottom:8,
    marginTop:25,
  },
})

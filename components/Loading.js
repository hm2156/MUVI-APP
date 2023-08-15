import { View, Text,Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';


var{width,height}= Dimensions.get('window')

export default function Loading() {
  return (
    <View style={{ height:height,width:width, position:'absolute',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      <Progress.CircleSnail thickness={12} size={120} color={['#E83550', '#C79C37']} />
    </View>
  )
}
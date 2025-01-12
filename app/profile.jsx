import { View, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '@/components/TopBar';


const profiles = () => {
  return (
    <SafeAreaView>
      <View>
        <TopBar/>      
        <Text>Profile Page</Text>
      </View>
    </SafeAreaView>
  )
}

export default profiles
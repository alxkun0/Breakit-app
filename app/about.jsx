import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '@/components/TopBar';

const about = () => {
  return (
    <SafeAreaView>
      <View>
        <TopBar/>   
        <Text>About Page</Text>   
      </View>
    </SafeAreaView>
  )
}

export default about
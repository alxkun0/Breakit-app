import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '@/components/TopBar';
import BottomSheet from '@/components/BottomWindow';


const Home = () => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TopBar />
        
      </View>
      <BottomSheet />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default Home;

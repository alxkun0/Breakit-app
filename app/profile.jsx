import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '@/components/TopBar';

const profiles = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TopBar />
        
        {/* Profile Picture */}
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/34/75/df/3475dffafbfb4dc2e4f2fd4f060259e2.jpg' }} // Add the image URL
          style={styles.profilePic}
        />

        {/* Profile Details */}
        <View style={styles.profileDetails}>
          <Text style={styles.profileText}>Name: Mikha Lim</Text>
          <Text style={styles.profileText}>Age: 21</Text>
          <Text style={styles.profileText}>Email: mikhaelajanna.lim@cvsu.edu.ph</Text>
          <Text style={styles.profileText}>Program: BSIT 3-3</Text>
        </View>
      </View>
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
    padding: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75, // Circle shape
    marginBottom: 20,
  },
  profileDetails: {
    alignItems: 'center',
  },
  profileText: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
  },
});

export default profiles;

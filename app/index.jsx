import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign,Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import icon from '../assets/images/samplesplash.png';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Custom Top Bar */}
      <View style={styles.topBar}>
        {/* Drawer Icon */}
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={30} color="#021520" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.topBarTitle}>Breakit</Text>

        {/* Search and Alert Icons */}
        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={() => alert('Search pressed')}>
            <Ionicons name="search" size={25} color="#021520" style={styles.iconSpacing} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Alert pressed')}>
            <MaterialIcons name="notifications-none" size={26} color="#021520" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.text}>Breakit</Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  // Top bar styles
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f5f5f5',
    elevation: 3,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#021520',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginRight: 20,
  },
  // Content styles
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  text: {
    color: 'black',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

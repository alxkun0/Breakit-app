import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation, DrawerActions } from '@react-navigation/native';

const topBar = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
        {/* Custom Top Bar */}
        <View style={styles.topBar}>
            {/* Drawer Icon */}
            <TouchableOpacity onPress={() => {
              console.log('Drawer is expanded.')
              navigation.dispatch(DrawerActions.openDrawer())}}>
              <Ionicons name="menu-outline" size={24} color="#021520" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.topBarTitle}>Breakit</Text>

            {/* Search and Filter Icons */}
            <View style={styles.iconGroup}>
            <TouchableOpacity onPress={() => alert('Search pressed')}>
              <Ionicons name="search-outline" size={24} color="#021520" />
            </TouchableOpacity>

            </View>
        </View>
    </View>
  )
};

export default topBar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    top: 0, 
    zIndex: 10,
  },
    // Top bar 
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 25,
    paddingBottom: 20,
    backgroundColor: '#f5f5f5',
    elevation: 5,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#021520',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginRight: 5,
  },

});
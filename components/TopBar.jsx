import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const TopBar = ({ searchQuery, setSearchQuery }) => {
  const navigation = useNavigation();
  const [isSearching, setIsSearching] = useState(false);

  return (
    <View style={styles.container}>
      {isSearching ? (
        // Search Input Field
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search tasks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setIsSearching(false);
              setSearchQuery(''); // Clear the search query
            }}
          >
            <Ionicons name="close-outline" size={24} color="#021520" />
          </TouchableOpacity>
        </View>
      ) : (
        // Top Bar
        <View style={styles.topBar}>
          {/* Drawer Icon */}
          <TouchableOpacity
            onPress={() => {
              console.log('Drawer is expanded.');
              navigation.dispatch(DrawerActions.openDrawer());
            }}
          >
            <Ionicons name="menu-outline" size={24} color="#021520" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.topBarTitle}>Breakit</Text>

          {/* Search Icon */}
          <TouchableOpacity
            onPress={() => {
              setIsSearching(true);
            }}
          >
            <Ionicons name="search-outline" size={24} color="#021520" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    top: 0,
    zIndex: 10,
  },
  // Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#f5f5f5',
    elevation: 5,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#021520',
  },
  
  // Search Input Field
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  closeButton: {
    marginLeft: 10,
  },
});

import React from 'react';
import {  View, Text, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerItemList } from '@react-navigation/drawer';



export default function Layout(){
  return(
    <GestureHandlerRootView style={{ flex: 1}}>
      <Drawer
        screenOptions={{
          drawerPosition: 'left',
          drawerType: 'front',
          drawerStyle: {
            backgroundColor: '#ffffff',
            width: 250,
          },
          headerShown: false,
          drawInactiveTintColor: '#021520',
          drawerLabelStyle: {
            color: '#021520',
            
          }
        }}

        drawerContent={
          (props) => {
            return (
              <SafeAreaView>
                <View style={{
                  height: 200,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#D8C4B6',
                  paddingTop: 15,
                  paddingBottom: 20,
                }}>
                  <Image 
                    source={require('../assets/images/maloi.jpg')}
                    resizeMode='contain'
                    style={{
                      height: 125,
                      width: 125,
                      borderRadius: 999,
                    }}>
                    </Image>
                      <Text style={{
                        fontSize: 22,
                        color: '#021520',
                        fontWeight: 'bold',
                        marginVertical: 8,
                      }}>Mary Loi Yves Ricalde</Text>
                    
                </View>
                <DrawerItemList {...props} />
              </SafeAreaView>
            )
          }
        }
      >
        
        <Drawer.Screen
          name='index'
          options={{
            drawerLabel: 'Home',
            drawerIcon: () => (
              <AntDesign name="home" size={24} color="#021520" />),
          }}
        >
        </Drawer.Screen>
        <Drawer.Screen
          name='profile'
          options={{
            drawerLabel: 'Profile',
            drawerIcon: () => (
              <AntDesign name="user" size={24} color="#021520" />),
          }}
        >
        </Drawer.Screen>
        <Drawer.Screen
          name='settings'
          options={{
            drawerLabel: 'Settings',
            drawerIcon: () => (
              <AntDesign name="setting" size={24} color="#021520" />),
          }}
        >
        </Drawer.Screen>
        <Drawer.Screen
          name='about'
          options={{
            drawerLabel: 'About',
            drawerIcon: () => (
              <MaterialCommunityIcons name="information-outline" size={24} color="#021520" />),
          }}
        >
        </Drawer.Screen>
      </Drawer>
    </GestureHandlerRootView>
  );
}


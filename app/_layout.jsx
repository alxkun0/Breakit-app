import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {  AntDesign } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerItemList } from '@react-navigation/drawer';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function Layout() {
  const [userEmail, setUserEmail] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserEmail(user.email || 'No Email Found');
    }
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Reload the app and reset the navigation stack
        navigation.reset({
          index: 0,
          routes: [{ name: 'index/index' }],
        });
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerPosition: 'left',
          drawerType: 'front',
          drawerStyle: {
            backgroundColor: '#f5f5f5',
            width: 250,
          },
          headerShown: false,
          drawInactiveTintColor: '#021520',
          drawerLabelStyle: {
            color: '#021520',
          },
        }}
        drawerContent={(props) => {
          return (
            <SafeAreaView>
              <View
                style={{
                  height: 200,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={require('../assets/images/blankProf.jpg')}
                  resizeMode="contain"
                  style={{
                    height: 125,
                    width: 125,
                    borderRadius: 999,
                  }}
                />
                <Text
                  style={{
                    fontSize: 22,
                    color: '#000',
                    fontWeight: 'bold',
                    marginVertical: 8,
                    textAlign: 'center',
                  }}
                >
                  {userEmail}
                </Text>
              </View>
              <DrawerItemList {...props} />
              {/* LogOut Button */}
              <View style={{ marginTop: 'auto', padding: 10 }}>
                <Button title="Logout" onPress={handleLogout} color="#000" />
              </View>
            </SafeAreaView>
          );
        }}
      >
        <Drawer.Screen
          name="index/index"
          options={{
            drawerLabel: 'Home',
            drawerIcon: () => <AntDesign name="home" size={24} color="#000" />,
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'Profile',
            drawerIcon: () => <AntDesign name="user" size={24} color="#000" />,
          }}
        />
        {/* Hide Unnecessary Routes */}
        <Drawer.Screen
          name="index/home"
          options={{ drawerItemStyle: { display: 'none' } }}
        />
        <Drawer.Screen
          name="index/TaskPage"
          options={{ drawerItemStyle: { display: 'none' } }}
        />
        <Drawer.Screen
          name="index/SignIn"
          options={{ drawerItemStyle: { display: 'none' } }}
        />
        <Drawer.Screen
          name="index/SignUp"
          options={{ drawerItemStyle: { display: 'none' } }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

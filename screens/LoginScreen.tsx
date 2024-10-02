import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={{uri: 'https://logos-world.net/wp-content/uploads/2023/07/Threads-Logo.png'}}
      />
    </SafeAreaView>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    marginTop: 50
  }
})
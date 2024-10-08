import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const navigation = useNavigation<any>();
    const handleLogout = () => {
        clearAuthToken();
    }

    const clearAuthToken = async () => {
        await AsyncStorage.removeItem('authToken');
        navigation.replace('Login');
    }
    return (
        <SafeAreaView>
            <Text>ProfileScreen</Text>

            <TouchableOpacity onPress={handleLogout}>
                <Text>Loggout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})
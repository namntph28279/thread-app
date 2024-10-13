import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Image } from 'react-native'
import React, { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../../../utils';
import { UserType } from '../../../UserContext';

const ProfileScreen = () => {
    const navigation = useNavigation<any>();
    const { userId, setIsAuth } = useContext(UserType);
    const [user, setUser] = useState<string>('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${URL}/profile/${userId}`);
                const { user } = res.data;
                setUser(user);
            } catch (error) {
                console.log('error get profile ', error);
            }
        }

        fetchProfile();
    }, []);
    const handleLogout = () => {
        clearAuthToken();
    }

    const clearAuthToken = async () => {
        await AsyncStorage.removeItem('authToken');
        setIsAuth(null);
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ padding: 15 }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{user?.name}</Text>

                    <View style={{
                        paddingHorizontal: 8,
                        paddingVertical: 6,
                        borderRadius: 8,
                        backgroundColor: '#D0D0D0'
                    }}>
                        <Text>Thread.net</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 15 }}>
                    <View>
                        <Image
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 30,
                                resizeMode: 'contain'
                            }}
                            source={{ uri: 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474082Kvj/avt-de-thuong-cute_044342433.jpg' }}
                        />
                    </View>

                    <View>
                        <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '400' }}>Mobile Developer</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400' }}>DCD welcome</Text>
                    </View>
                </View>

                <Text style={{ color: 'gray', fontSize: 15, marginTop: 10 }}>{user?.followers?.length} follwers</Text>

                <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center', marginTop: 15 }}>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.7}
                    >
                        <Text>Edit profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.7}
                        onPress={handleLogout}
                    >
                        <Text>Loggout</Text>
                    </TouchableOpacity>
                </View>
            </View>



        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        borderColor: '#D0D0D0',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center'
    }
})
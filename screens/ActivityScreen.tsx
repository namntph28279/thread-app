import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '../UserContext';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { URL } from './../utils/index';
import User from '../components/User';
import { MyJwtPayload, UserData } from './type';

const ActivityScreen = () => {
    const [selectedButton, setSelectedButton] = useState<string>('people');
    const [content, setContent] = useState<string>('people content');
    const { userId, setUserId } = useContext(UserType);
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (token) {
                    const decodedToken = jwtDecode<MyJwtPayload>(token);
                    const userId = decodedToken.userId;
                    setUserId(userId);

                    const response = await axios.get(`${URL}/user/${userId}`);
                    setUsers(response.data);
                } else {
                    console.log('No token found');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [setUserId]);

    const handleClickButton = (buttonName: string) => {
        setSelectedButton(buttonName);
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Activity</Text>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    marginTop: 12,
                }}>
                    <TouchableOpacity style={[
                        {
                            flex: 1,
                            paddingVertical: 10,
                            backgroundColor: 'white',
                            borderColor: '#D0D0D0',
                            borderRadius: 6,
                            borderWidth: 0.7
                        },
                        selectedButton === 'people' ? { backgroundColor: 'black' } : null,
                    ]}
                        onPress={() => handleClickButton('people')}
                        activeOpacity={0.7}
                    >
                        <Text style={[
                            { textAlign: 'center', fontWeight: 'bold' },
                            selectedButton === 'people'
                                ? { color: 'white' }
                                : { color: 'black' }
                        ]}>People</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[
                        {
                            flex: 1,
                            paddingVertical: 10,
                            backgroundColor: 'white',
                            borderColor: '#D0D0D0',
                            borderRadius: 6,
                            borderWidth: 0.7
                        },
                        selectedButton === 'all' ? { backgroundColor: 'black' } : null,
                    ]}
                        onPress={() => handleClickButton('all')}
                        activeOpacity={0.7}
                    >
                        <Text style={[
                            { textAlign: 'center', fontWeight: 'bold' },
                            selectedButton === 'all'
                                ? { color: 'white' }
                                : { color: 'black' }
                        ]}>All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[
                        {
                            flex: 1,
                            paddingVertical: 10,
                            backgroundColor: 'white',
                            borderColor: '#D0D0D0',
                            borderRadius: 6,
                            borderWidth: 0.7
                        },
                        selectedButton === 'requests' ? { backgroundColor: 'black' } : null,
                    ]}
                        onPress={() => handleClickButton('requests')}
                        activeOpacity={0.7}
                    >
                        <Text style={[
                            { textAlign: 'center', fontWeight: 'bold' },
                            selectedButton === 'requests'
                                ? { color: 'white' }
                                : { color: 'black' }
                        ]}>Requests</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    {selectedButton === 'people' && (
                        <View style={{ marginTop: 20 }}>
                            {users?.map((item: UserData, index: number) => (
                                <User key={index} item={item} />
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    )
}

export default ActivityScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 50
    }
})
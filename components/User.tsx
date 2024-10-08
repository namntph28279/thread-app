import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UserType } from '../UserContext';
import { UserData } from './../screens/type';
import { URL } from './../utils/index';

interface UserProps {
    item: UserData;
}

const User: React.FC<UserProps> = ({ item }) => {
    const { userId, setUserId } = useContext(UserType);
    const [requestSent, setRequestSent] = useState<boolean>(false);

    const sendFollow = async (currentUserId: string, selectedUserId: string) => {
        try {
            const res = await fetch(`${URL}/follow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ currentUserId, selectedUserId })
            })

            if (res.ok) {
                setRequestSent(true);
            }
        } catch (error) {
            console.log('error message: ', error);
        }
    }

    const handleUnfollow = async (targetId: string) => {
        try {
            const res = await fetch(`${URL}/users/unfollow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    targetUserId: targetId,
                    loggedInUserId: userId
                })
            })

            if (res.ok) {
                setRequestSent(false);

            }
        } catch (error) {
            console.log('error message: ', error);

        }
    }
    return (
        <View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10
            }}>
                <Image style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    resizeMode: 'contain'
                }} source={{ uri: 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474082Kvj/avt-de-thuong-cute_044342433.jpg' }} />

                <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    flex: 1,
                }}>{item?.name}</Text>

                {requestSent || item?.followers?.includes(userId) ? (
                    <TouchableOpacity
                        style={{
                            borderColor: '#D0D0D0',
                            borderWidth: 1,
                            marginLeft: 8,
                            width: 100,
                            borderRadius: 8,
                            padding: 10
                        }}
                        activeOpacity={0.7}
                        onPress={() => handleUnfollow(item._id)}
                    >
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>Following</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={{
                            borderColor: '#D0D0D0',
                            borderWidth: 1,
                            marginLeft: 8,
                            width: 100,
                            borderRadius: 8,
                            padding: 10
                        }}
                        activeOpacity={0.7}
                        onPress={() => sendFollow(userId, item._id)}
                    >
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>Follow</Text>
                    </TouchableOpacity>
                )}


            </View>
        </View>
    )
}

export default User

const styles = StyleSheet.create({})
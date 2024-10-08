import { StyleSheet, Text, SafeAreaView, ScrollView, View, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { MyJwtPayload } from './type';
import { UserType } from '../UserContext';
import { useState } from 'react';
import { URL } from './../utils/index';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const HomeScreen = () => {
    const { userId, setUserId } = useContext(UserType);
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (token) {
                    const decodedToken = jwtDecode<MyJwtPayload>(token);
                    const userId = decodedToken.userId;
                    setUserId(userId);
                } else {
                    console.log('No token found');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [setUserId]);

    useEffect(() => {
        fetchPost();
    }, [])

    useFocusEffect(
        useCallback(() => {
            fetchPost();
        }, [])
    );

    const fetchPost = async () => {
        try {
            const res = await axios.get(`${URL}/get-posts`);
            setPosts(res.data);
        } catch (error) {
            console.log('error fetching posts ', error);
        }
    }

    const handleLike = async (postId: string) => {
        try {
            const res = await axios.put(`${URL}/post/${postId}/${userId}/like`);
            const updatePost = res.data;
            const updatePosts = posts?.map((post) => {
                post?._id === updatePost._id ? updatePost : post
            })

            setPosts(updatePosts)
        } catch (error) {
            console.log('error like the post ', error);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={{ flex: 1, }}>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Image
                        style={{
                            height: 120,
                            width: 100,
                            borderRadius: 20,
                            resizeMode: 'contain'
                        }}
                        source={{ uri: 'https://logos-world.net/wp-content/uploads/2023/07/Threads-Logo.png' }}
                    />
                </View>

                <View style={{ marginTop: 20 }}>
                    {posts?.map((post, index) => (
                        <View key={index} style={{
                            padding: 15,
                            borderColor: '#D0D0D0',
                            borderTopWidth: 1,
                            flexDirection: 'row',
                            gap: 10,
                            marginVertical: 10
                        }}>
                            <View>
                                <Image
                                    style={{
                                        height: 40,
                                        width: 40,
                                        borderRadius: 20,
                                        resizeMode: 'contain'
                                    }}
                                    source={{ uri: 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474082Kvj/avt-de-thuong-cute_044342433.jpg' }}
                                />
                            </View>

                            <View>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 4
                                }}>
                                    {post?.user?.name}
                                </Text>
                                <Text>{post?.content}</Text>

                                <View style={{ flexDirection: 'row', gap: 10, marginTop: 8, alignItems: 'center' }}>
                                    {post?.likes?.includes(userId) ? (
                                        <AntDesign onPress={() => handleLike(post?._id)} name="heart" size={18} color="black" />
                                    ) : (
                                        <AntDesign onPress={() => handleLike(post?._id)} name="hearto" size={18} color="black" />
                                    )}
                                    <FontAwesome name="comment-o" size={18} color="black" />
                                    <AntDesign name="sharealt" size={18} color="black" />
                                </View>

                                <Text style={{ marginTop: 8, color: 'gray' }}>
                                    {post?.likes?.length || 0} likes • {post?.replies?.length || 0} reply
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
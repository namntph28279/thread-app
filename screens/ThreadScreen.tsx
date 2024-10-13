import { Button, Image, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import { UserType } from '../UserContext';
import axios from 'axios';
import { URL } from '../utils';
import { screenWidth } from './../utils/index';

const ThreadScreen = () => {
    const [content, setContent] = useState<string>('');
    const { userId, setUserId } = useContext(UserType);
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

    const handlePostSubmit = () => {
        const postData: any = {
            userId
        }

        if (content) {
            postData.content = content;
        }

        axios.post(`${URL}/create-post`, postData)
            .then((res) => {
                setContent('')
            }).catch((error) => {
                console.log('error creating post: ', error);
            });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10 }}>
                    <Image
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            resizeMode: 'contain'
                        }}
                        source={{ uri: 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474082Kvj/avt-de-thuong-cute_044342433.jpg' }}
                    />

                    <Text>{user?.name}</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginLeft: 10,
                }}>
                    <TextInput
                        value={content}
                        onChangeText={(text) => setContent(text)}
                        placeholderTextColor={'black'}
                        placeholder='Type your message...'
                        style={{ width: screenWidth - 20, paddingVertical: 15 }}
                        multiline
                    />
                </View>

                <View style={{ marginTop: 20 }} />

                <Button
                    title='Share Post'
                    onPress={handlePostSubmit}
                />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default ThreadScreen

const styles = StyleSheet.create({})
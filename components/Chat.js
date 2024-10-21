import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ db, storage, route, navigation, isConnected }) => {

    // message state initialization using useState()
    const [messages, setMessages] = useState([]);
    const { name, backgroundColor, userID } = route.params;

    // Fetch messages from database in real time
    let unsubMessages;

    useEffect(() => {
        navigation.setOptions({ title: name });

        if (isConnected === true) {
            // unregister current onSnapshot() listener to avoid registering multiple listeners when
            // useEffect code is re-executed.
            if (unsubMessages) unsubMessages();
            unsubMessages = null;

            // If connection, fetch data from Firestore Database
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubMessages = onSnapshot(q, (docs) => {
                let newMessages = [];
                docs.forEach(doc => {
                    newMessages.push({
                        _id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis())
                    })
                })
                cacheMessages(newMessages);
                setMessages(newMessages);
            });
        } else loadCachedMessages(); //Fetches data from AsyncStorage if no connection

        // Clean up code
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, [isConnected]);

    // function called if isConnected props false in useEffect(), ||[] returns empty array to cachedMessaged if not set yet in AsyncStorage (known as 'logical OR assignment operator')
    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem("messages") || [];
        setMessages(JSON.parse(cachedMessages));
    }

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        } catch (error) {
            Alert.alert('Unable to cache messages');
        }
    };

    // what's called when user sends a message
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
    };

    // Returns InputToolbar if connected, otherwise returns a null
    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    // sets received message bubble appearance
                    right: {
                        backgroundColor: '#000'
                    },
                    // sets senders message bubble appearance
                    left: {
                        backgroundColor: '#FFF'
                    }
                }}
            />
        );
    };

    // Creates circle button
    const renderCustomActions = (props) => {
        return (
            <CustomActions
                onSend={onSend}
                storage={storage}
                userID={userID}
                {...props}
            />
        );
    };

    // If currentMessage contains location data, return MapView
    const renderCustomView = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    }

    return (
        // pass selected background color from start screen
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <GiftedChat
                // accessiblity features
                accessible={true}
                accessibilityLabel="Message input field"
                accessibilityHint="Type your message here and then press enter"
                accessibilityRole="message-input"
                // displays message bubbles
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
                // attach correct user ID and name to message
                user={{
                    _id: userID,
                    name: name,
                }}
            />
            {/* Stops keyboard from hiding message input field for android */}
            {Platform.OS === 'android' ? (
                <KeyboardAvoidingView behavior="height" />
            ) : null}
            {/* and ios */}
            {Platform.OS === 'ios' ? (
                <KeyboardAvoidingView behavior="padding" />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 40
    }
});

export default Chat;
import { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import { getAuth, signInAnonymously } from 'firebase/auth';

const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');

    // Initialize Firebase authentication
    const auth = getAuth();

    // User can sign in anonymously
    const signInUser = () => {
        signInAnonymously(auth)
            .then((result) => {
                // when logged in navigate to chat screen with 3 route parameters: user's id, user's name and selected bg color
                navigation.navigate('Chat', {
                    userID: result.user.uid,
                    name: name,
                    backgroundColor: backgroundColor
                });
                Alert.alert('Signed in Successfully!');
            })
            .catch((error) => {
                Alert.alert('Unable to sign in, try later again.');
            });
    };

    return (
        <ImageBackground
            source={require('../img/bgImage.png')}
            resizeMode="cover"
            style={styles.image}
        >
            <Text style={styles.title}>Charli Chat</Text>
            <View style={styles.container}>
                {/* <Icon source={require('../img/icon.svg')}></Icon> */}
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder="Your name"
                />

                <Text style={styles.colorSelectText}>Choose Background Color:</Text>

                <View style={styles.colorSelectBox}>
                    {colors.map((color) => (
                        <TouchableOpacity
                            key={color}
                            style={[styles.chooseColor, { backgroundColor: color }, backgroundColor == color && styles.selectedColor]}
                            onPress={() => setBackgroundColor(color)}  //sets background color in chat
                        />
                    ))}
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={signInUser}
                >
                    <Text style={styles.buttonText}>Start Chatting</Text>
                </TouchableOpacity>
            </View>
            {Platform.OS === 'android' ? (
                <KeyboardAvoidingView behavior="height" />
            ) : null}
            {Platform.OS === 'ios' ? (
                <KeyboardAvoidingView behavior="padding" />
            ) : null}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '44%',
        width: '88%',
        marginBottom: 40
    },
    title: {
        flex: 1,
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
        justifyContent: 'center',
        marginTop: 90
    },
    textInput: {
        width: '88%',
        padding: 15,
        borderWidth: 1,
        marginBottom: 10,
        marginTop: 10,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 0.5,
        borderRadius: 3
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    colorSelectBox: {
        flexDirection: 'row',
        width: '88%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    colorSelectText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 10
    },
    chooseColor: {
        width: 42,
        height: 42,
        borderRadius: 21,
        border: 5,
        borderColor: '#FFFFFF',
        marginRight: 10,
    },
    selectedColor: {
        color: '#C0C0C0',
        borderWidth: 3,
    },

    button: {
        backgroundColor: '#757083',
        padding: 10,
        width: '88%',
        height: '18%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600'
    }
});

export default Start;
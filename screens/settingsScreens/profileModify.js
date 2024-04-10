import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SwipeButton from 'rn-swipe-button';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';

const ProfileModify = ({route}) => {
    const { userId } = route.params;
    console.log(userId);
    const navigation = useNavigation();
    const { theme } = useTheme();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('Change password');
    const [phone, setPhone] = useState('');
    const [titles, setTitles] = useState('Coder ● Data Engineer ● Plain Awesome');
    const [aboutMe, setAboutMe] = useState("I'm a software engineer passionate about building mobile applications. I love hiking, reading, and being awesome in my free time.");
    const [funFact, setFunFact] = useState('"happiest animal in the world"');
    const [link1, setLink1] = useState('https://example.com');
    const [link2, setLink2] = useState('https://example2.com');
    const [profileImageUri, setProfileImageUri] = useState(null);

    useEffect(() => {
        
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://joffer-backend-latest.onrender.com/Account/${userId}`);
                const userData = response.data;
                
                setName(userData.name);
                setEmail(userData.email);
                setPhone(userData.phone);
            } catch (error) {
                console.error('Error fetching user data:', error);
                Alert.alert('Error', 'An error occurred while fetching user data.');
            }
        };

        fetchUserData(); 
    }, [userId]);


    const handleNextPress = () => {
        navigation.navigate('Swipe', {userId});
    };

    useEffect(() => {

        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission required', 'Please grant permission to access the media library to pick an image.');
            }
        })();
    }, []);

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            console.log('Image picker result:', result);

            if (!result.cancelled) {
                setProfileImageUri(result.assets[0].uri);
                console.log('Image picked:', result.assets[0].uri);
            } else {
                console.log('Image selection cancelled.');
            }
        } catch (error) {
            console.error('Error picking image:', error);
            alert('Error picking image. Please try again.');
        }
    };
    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
            <LinearGradient
                colors={['rgba(255, 126, 51, 1)', 'rgba(255, 94, 0, 1)']}
                style={styles.logoContainer}
            >
                <Image
                    source={require('../../assets/joffer2.png')}
                    style={styles.logo}
                />
                <Text style={styles.descriptionText}>Let advanced Joffer algorithms find your ideal career fit!</Text>
            </LinearGradient>
            <View style={styles.profileContainer}>
            <Text style={[styles.aboutHeaderText, { color: '#FF7E33', fontSize: 20,marginBottom: 20, fontFamily: 'Fredoka1' }]}>Edit your profile information below</Text>
                <TouchableOpacity onPress={pickImage}>
                    <Image source={profileImageUri ? { uri: profileImageUri } : require('../../assets/kuva1.jpg')} style={styles.profileImage} />


                </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={() => setName('')}>
                    <FontAwesomeIcon icon={faEdit} size={30} style={[styles.icon, { color: theme === 'dark' ? '#FF7E33' : 'rgba(255, 126, 51, 1)' }]} />
                    </TouchableOpacity>
                    <TextInput
                         style={[styles.inputField, { color: theme === 'dark' ? '#FF7E33' : '#F98A4B' }]}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your name"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={() => setEmail('')}>
                        <FontAwesomeIcon icon={faEdit} size={30} style={styles.icon} />
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.inputField, { color: '#F98A4B', fontSize: 20 }]}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={() => setPassword('')}>
                        <FontAwesomeIcon icon={faEdit} size={30} style={styles.icon} />
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.inputField, { color: '#F98A4B', fontSize: 20 }]}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter your password"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={() => setPhone('')}>
                        <FontAwesomeIcon icon={faEdit} size={30} style={styles.icon} />
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.inputField, { color: '#F98A4B', fontSize: 20 }]}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Enter your phone number"
                    />
                </View>
                <TouchableOpacity onPress={() => setTitles('')}>
                    <FontAwesomeIcon icon={faEdit} size={30} style={styles.icon1} />
                </TouchableOpacity>
                <TextInput
                    style={[styles.professions, { marginTop: 0, fontSize: 16, fontFamily: 'Fredoka', textAlign: 'center' }]}
                    value={titles}
                    onChangeText={setTitles}
                    placeholder="Enter your professions"
                />
            </View>
            <View style={styles.aboutContainer}>
                <TouchableOpacity onPress={() => setAboutMe('')}>
                    <FontAwesomeIcon icon={faEdit} size={30} style={styles.icon} />
                </TouchableOpacity>
                <Text style={[styles.aboutHeaderText, { color: '#FF7E33', fontSize: 22, fontFamily: 'Fredoka1' }]}>About Me</Text>
                <TextInput
                    style={[styles.aboutText, { color: 'black', fontSize: 18 }]}
                    value={aboutMe}
                    onChangeText={setAboutMe}
                    multiline={true}
                    placeholder="Tell something about yourself"
                />
                <TouchableOpacity onPress={() => setFunFact('')}>
                    <FontAwesomeIcon icon={faEdit} size={30} style={styles.icon} />
                </TouchableOpacity>
                <Text style={[styles.aboutHeaderText, { color: '#FF7E33', fontSize: 20, marginBottom: -30, fontFamily: 'Fredoka1' }]}>A fun fact about me</Text>
                <TextInput
                    style={[styles.professions, { marginTop: 20, fontSize: 18, fontFamily: 'Fredoka1', marginBottom: -20, color: 'black' }]}
                    value={funFact}
                    onChangeText={setFunFact}
                    placeholder="Share a fun fact about yourself"
                />
            </View>
            <View style={styles.linksContainer}>
                <TouchableOpacity onPress={() => setLink1('')}>
                    <FontAwesomeIcon icon={faEdit} size={30} style={styles.icon} />
                </TouchableOpacity>
                <Text style={[styles.linksHeader, { color: '#FF7E33', fontFamily: 'Fredoka1', fontSize: 18 }]}>Links and Socials</Text>
                <TextInput
                    style={[styles.linkText, { color: '#FF7E33' }]}
                    value={link1}
                    onChangeText={setLink1}
                    placeholder="Enter link 1"
                />
                <TouchableOpacity onPress={() => setLink2('')}>

                </TouchableOpacity>
                <TextInput
                    style={[styles.linkText, { color: '#FF7E33' }]}
                    value={link2}
                    onChangeText={setLink2}
                    placeholder="Enter link 2"
                />
            </View>
            <SwipeButton
                title="    Save "
                onSwipeSuccess={handleNextPress}
                railStyles={{
                    backgroundColor: 'rgba(255, 191, 129, 0.3)',
                    borderColor: '#FF7E33',
                    zIndex: 1,
                    elevation: 1,
                }}
                thumbIconBackgroundColor="#FF7E33"
                thumbIconImageSource={require('../../assets/right-arrow.png')}
                railBackgroundColor="#FFFFFF"
                thumbIconBorderColor="#FF7E33"
                thumbIconStyles={{ width: 30, height: 30 }}
                titleStyles={{ color: '#FF7E33', fontFamily: 'Fredoka1', fontSize: 18 }}
                containerStyles={{ marginTop: 20 }}
            />
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal:20,
        paddingBottom:20,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: -0,
        marginLeft: -20,
        marginRight: -20,
        height: 230,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 10,
        marginTop: 30,
    },
    descriptionText: {
        fontSize: 15,
        marginTop: 10,
        fontFamily: 'Fredoka',
        textAlign: 'center',
        padding: 20,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20,
    },
    profileImage: {
        width: 300,
        height: 300,
        marginBottom: 20,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        shadowColor: '#FF7E33',
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 0,
        },
    },
    userName: {
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'Fredoka',
        width: 300,
    },
    professions: {
        fontSize: 16,
        marginTop: 5,
        textAlign: 'center',
        fontFamily: 'Fredoka',
        height: 50,
        width: 400,
        
        padding: 10,
    },
    aboutContainer: {
        marginTop: 20,
        alignItems: 'center',
        //borderWidth: 1,
        padding: 10,
    },
    aboutHeaderText: {
        fontSize: 18,
        marginBottom: 10,
        fontFamily: 'Fredoka',
    },
    aboutText: {
        fontFamily: 'Fredoka',
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
       
    },
    icon: {
        color: 'rgba(255, 126, 51, 1)',
        marginBottom: 10,
    },
    icon1: {
        color: 'rgba(255, 126, 51, 1)',
        //marginBottom: 10,
        marginTop: 10,
    },
    linksContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    linksHeader: {
        fontSize: 18,
        marginBottom: 10,
        fontFamily: 'Fredoka',
    },
    linksList: {
        alignItems: 'center',
    },
    linkText: {
        fontFamily: 'Fredoka',
        fontSize: 16,
        marginBottom: 5,
    },
    gradient: {
        flex: 1,
        borderRadius: 10,
    },
    editIcon: {
        width: 20,
        height: 20,
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        height: 50,
    },
    inputField: {
        flex: 1,
        marginLeft: 10,
        
        borderWidth: 1,
        padding: 10,
        borderColor: '#F98A4B',
        fontSize: 20,
        fontFamily: 'Fredoka',
    },
});

export default ProfileModify;




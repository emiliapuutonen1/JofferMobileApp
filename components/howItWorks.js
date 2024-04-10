import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import * as Font from 'expo-font';

const HowItWorks = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const [fontLoaded, setFontLoaded] = React.useState(false);
    React.useEffect(() => {
        const loadFont = async () => {
            await Font.loadAsync({
                'fredoka': require('../assets/fonts/Fredoka-VariableFont_wdth,wght.ttf'),
            });
            setFontLoaded(true);
        };
        loadFont();
    }, []);


    if (!fontLoaded) {
        return null;
    }
    const handleNavigateBack = () => {
        navigation.goBack(); // Navigate back to previous screen
    };

    return (
        <View style={[styles.modal, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.modalContent}>
                    <Text style={styles.heading}>How It Works</Text>
                    <View style={styles.iconContainer}>
                        <FontAwesomeIcon icon={faHeart} size={60} style={[styles.icon, { color: '#58D336' }]} />
                        <View style={styles.textContainer}>
                            <Text style={[styles.stepText, { color: '#58D336' }]}>Like</Text>
                            <Text style={styles.moreInfoText}>This button is for the jobs that you would like to learn more details about, have an interview for, or possibly obtain a position with. The match details on the left Latest Matches panel.</Text>
                        </View>
                    </View>
                    <View style={styles.iconContainer}>
                        <FontAwesomeIcon icon={faTimesCircle} size={60} style={styles.icon} />
                        <View style={styles.textContainer}>
                            <Text style={[styles.stepText, { color: '#D9352D' }]}>Dislike</Text>
                            <Text style={styles.moreInfoText}>This button is for the jobs you prefer not to pursue further. You will never see disliked ad’s again.</Text>
                        </View>
                    </View>
                    <View style={styles.iconContainer}>
                        <Image source={require('../assets/Superlike.png')} style={styles.customIcon} />
                        <View style={styles.textContainer}>
                            <Text style={[styles.stepText1, { color: '#5496EE' }]}>Superlike:</Text>
                            <Text style={styles.moreInfoText1}>
                                This button is for the jobs that you're eager to learn more about, secure an interview for, or absolutely want to secure a position with. You can see them always on the Superlikes panel.
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.registerButton} onPress={handleNavigateBack}>
                        <LinearGradient
                            colors={['rgba(255, 126, 51, 1)', 'rgba(255, 94, 0, 1)']}
                            style={styles.linearGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.registerText}>Let's try!</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF7E33',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        fontFamily: 'Fredoka1',
        minWidth: '95%',
    },
    heading: {
        fontFamily: 'Fredoka1',
        fontSize: 20,
        color: '#FF7E33',
        marginBottom: 20,
        marginTop: 0,
        left: 85,

    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        marginRight: 10,
        color: '#D9352D',
    },
    stepText: {
        fontFamily: 'Fredoka1',
        fontSize: 16,
        left: 20,
    },
    stepText1: {
        fontFamily: 'Fredoka1',
        fontSize: 16,
        right: -10,

    },
    moreInfoText: {
        fontFamily: 'fredoka',
        fontSize: 14,
        color: 'gray',
        marginLeft: 20,
        marginTop: 5,
    },
    moreInfoText1: {
        fontFamily: 'fredoka',
        fontSize: 14,
        color: 'gray',
        marginLeft: 20,
        right: 10,
        marginTop: 5,
    },
    registerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: '#FF7E33',
        borderRadius: 20,
        height: 40,
        width: 150,
        alignSelf: 'center',
    },
    registerText: {
        fontFamily: 'Fredoka1',
        fontSize: 18,
        color: 'white',
    },
    customIcon: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        right: 10,
    },
    textContainer: {
        flex: 1,
        marginLeft: 20,
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: '100%',
        width: '100%',
    },
});

export default HowItWorks;

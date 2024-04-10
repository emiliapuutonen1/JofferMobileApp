import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook
import * as Font from 'expo-font';
import { useState } from 'react';
import VersionModal from './versionModal';

const Settings = ({ route }) => {
    const { userId } = route.params;
    const { companyId } = route.params;
    console.log(userId);
    console.log(companyId);
    const navigation = useNavigation();
    const { theme, toggleTheme } = useTheme();
    const [versionModalVisible, setVersionModalVisible] = useState(false);

    const [fontLoaded, setFontLoaded] = React.useState(false);
    React.useEffect(() => {
        const loadFont = async () => {
            await Font.loadAsync({
                'fredoka': require('../assets/fonts/Fredoka-VariableFont_wdth,wght.ttf'),
                'fredoka1': require('../assets/fonts/Fredoka-Regular.ttf'),
            });
            setFontLoaded(true);
        };
        loadFont();
    }, []);

    const handleNavigateBack = () => {
        navigation.goBack();
    };
    const navigateToMatches = () => {
        navigation.navigate('Matches');
    };
    const navigateToHowToUse = () => {
        navigation.navigate('HowItWorks');
    };
    const navigateToModify = () => {
        navigation.navigate('Modify', { userId });
    };
    const handleToggleVersionModal = () => {
        setVersionModalVisible(!versionModalVisible);
      };
    const navigateToLogin = () => {
        navigation.navigate('Match', {userId}); //Home
    };

    if (!fontLoaded) {
        return null;
    }

    const windowWidth = Dimensions.get('window').width;
    const itemWidth = (windowWidth - 30) / 2;

    return (
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <LinearGradient
                    colors={['rgba(255, 126, 51, 1)', 'rgba(255, 94, 0, 1)']}
                    style={styles.logoContainer}
                >
                    <Image
                        source={require('../assets/joffer2.png')}
                        style={styles.logo}
                    />

                </LinearGradient>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={[styles.settingsButton, { width: itemWidth }]} onPress={navigateToHowToUse}>
                        <LinearGradient
                            colors={['rgba(255, 126, 51, 1)', 'rgba(255, 94, 0, 1)']}
                            style={styles.linearGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.registerText}>How to use Joffer</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.settingsButton, { width: itemWidth }]}
                        onPress={navigateToMatches}
                    >
                        <LinearGradient
                            colors={['rgba(255, 126, 51, 1)', 'rgba(255, 94, 0, 1)']}
                            style={styles.linearGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.registerText}>Matches</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.settingsButton, { width: itemWidth }]} onPress={navigateToModify}>
                        <LinearGradient
                            colors={['rgba(255, 126, 51, 1)', 'rgba(255, 94, 0, 1)']}
                            style={styles.linearGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.registerText}>Modify Account</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.settingsButton, { width: itemWidth }]} onPress={handleToggleVersionModal}>
                        <LinearGradient
                            colors={['rgba(255, 126, 51, 1)', 'rgba(255, 94, 0, 1)']}
                            style={styles.linearGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.registerText}>Version</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.settingsButton, { width: itemWidth }]}
                        onPress={toggleTheme} 
                    >
                        <LinearGradient
                            colors={['rgba(255, 126, 51, 1)', 'rgba(255, 94, 0, 1)']}
                            style={styles.linearGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.registerText}>Theme</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.settingsButton, { width: itemWidth }]} onPress={navigateToLogin}>
                        <LinearGradient
                            colors={['rgba(255, 126, 51, 1)', 'rgba(255, 94, 0, 1)']}
                            style={styles.linearGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            onPress={toggleTheme} 
                        >
                            <Text style={styles.registerText}>Log Out</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.registerButton, { width: itemWidth }]} onPress={handleNavigateBack}>
                    <LinearGradient
                        colors={['rgba(255, 126, 51, 1)', 'rgba(255, 94, 0, 1)']}
                        style={styles.linearGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.registerText}>Return</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={versionModalVisible}
                onRequestClose={handleToggleVersionModal}
            >
                <VersionModal onClose={handleToggleVersionModal} /> 
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 0,
        backgroundColor: '#FF7E33',
        padding: 20,
        marginBottom: 20,
        marginLeft: -20,
        marginRight: -20,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 10,
        marginTop: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    settingsButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderRadius: 20,
        height: 100,
    },
    registerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderRadius: 10,
        height: 40,
        marginTop: 30,
        left: 95,
    },
    registerText: {
        fontFamily: 'Fredoka1',
        fontSize: 18,
        color: 'white',
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: '100%',
        width: '100%',
    },
});

export default Settings;

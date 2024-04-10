import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SwipeButton from 'rn-swipe-button';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';

const DeleteProfile = ({ route }) => {
    const { userId } = route.params;
    const navigation = useNavigation();
    const { theme } = useTheme();
 

    const deleteAccount = async () => {
        try {
            await axios.delete(`https://joffer-backend-latest.onrender.com/Account/${userId}`);
            Alert.alert('Account Deleted', 'Your account has been successfully deleted.');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error deleting account:', error);
            Alert.alert('Error', 'An error occurred while deleting your account.');
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

            <SwipeButton
                title="Delete your account "
                onSwipeSuccess={deleteAccount}
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
});

export default DeleteProfile;
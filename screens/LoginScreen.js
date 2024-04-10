
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, ImageBackground, Alert } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';


const LoginScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Fredoka': require('../assets/fonts/Fredoka-VariableFont_wdth,wght.ttf'),
        'Fredoka2': require('../assets/fonts/Fredoka-Regular.ttf'),
      });
    }
    loadFonts();
  }, []);
  // muuttujat
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // API endpoint URL ja login hakee tiedot tietokannasta
  const API_URL = 'https://joffer-backend-latest.onrender.com/Account';

  
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log('API Response:', response.data);
    
      const user = response.data.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        const userId = user.id;
        console.log(userId);
        navigation.navigate('Swipe', { userId });
      } else {
       
        Alert.alert('Invalid credentials', 'Please enter valid email and password.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
     
      Alert.alert('Error', 'An error occurred ');
    }
  };

  
  const handleLoginPress = () => {
    
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Missing credentials', 'Please enter both email and password.');
    } else {
     
      fetchData();
    }
  };
  const handleRegisterPress = () => {
    navigation.navigate('Register');
    
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {/* Logo */}
        <LinearGradient
          colors={['rgba(255, 126, 51, 1)', 'rgba(255, 94, 0, 1)']}
          style={styles.logoContainer}
        >
          <Image
            source={require('../assets/joffer2.png')}
            style={styles.logo}
          />
          <Text style={styles.descriptionText}>Let advanced Joffer algorithms find your ideal career fit!</Text>
        </LinearGradient>

        {/* welcome teksti */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome, unique talent!</Text>
        </View>

        {/* username ja password */}
        <View style={styles.inputContainer}>
          <ImageBackground
            source={require('../assets/Orange Mail input.png')}
            style={[styles.inputBackground, { width: '90%', height: 60 }]}
            resizeMode="contain"
          >
            <TextInput
              style={[styles.input, { fontSize: 16, textAlign: 'left', paddingVertical: 10, marginTop: 10, }]}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="transparent"
            />
          </ImageBackground>
          <ImageBackground
            source={require('../assets/Orange Password Input.png')}
            style={[styles.inputBackground, { width: '90%', height: 50 }]}
            resizeMode="contain"
          >
            <TextInput
              style={[styles.input1, { fontSize: 16, textAlign: 'left', paddingVertical: 10, marginTop: 10 }]}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="transparent"
              secureTextEntry={true}
            />
          </ImageBackground>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={['rgba(255, 126, 51, 1)', 'rgba(255, 94, 0, 1)']}
            style={styles.returnButton}
          >
            <TouchableOpacity onPress={handleLoginPress}>
              <Text style={styles.returnButtonText}>Login</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <Text style={styles.orText}>or login with socials</Text>

        <View style={styles.linksContainer}>
          <TouchableOpacity style={styles.linkButton}>
            <Image source={require('../assets/Google.png')} style={styles.linkImage} />
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity style={styles.linkButton}>
            <Image source={require('../assets/Linkedin.png')} style={styles.linkImage} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerText}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegisterPress}>
          <Text style={styles.registerText}>Create an account!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 20,
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
    height: 230,

  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
    marginTop: 25,
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: 'Fredoka',
    marginTop: 0,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 15,
    marginTop: 10,
    fontFamily: 'Fredoka',
    textAlign: 'center',
    margin: 10,
  },
  orText: {
    fontFamily: 'Fredoka',
    textAlign: 'center',
    padding: 20,
    fontSize: 14,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  accountContainer: {
    padding: 10,
    alignItems: 'center',
  },
  accountText: {
    fontFamily: 'Fredoka',
    fontSize: 18,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  linkButton: {

    width: 30,
    height: 30,

    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  linksText: {
    fontFamily: 'Fredoka',
    fontSize: 20,
    color: 'white',
  },
  space: {
    width: 15,
  },
  registerButton: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  registerText: {
    fontFamily: 'Fredoka',
    fontSize: 16,
    color: '#FF7E33',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  returnButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: 130,
  },
  returnButtonText: {
    fontSize: 18,
    fontFamily: 'Fredoka2',
    color: 'white',
  },
  linkImage: {
    width: 40,
    height: 40,
  },
  inputContainer: {
    marginBottom: 0,
    fontFamily: 'Fredoka',
    alignItems: 'center',
    left: 17,
  },
  inputBackground: {
    width: 230,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: 230,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginBottom: 10,
    fontFamily: 'Fredoka',
  },
  input1: {
    height: 50,
    width: 230,
    borderColor: 'gray',
    //borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginBottom: 10,
    fontFamily: 'Fredoka',
  }

});

export default LoginScreen;



import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const RegisterScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Fredoka': require('../assets/fonts/Fredoka-VariableFont_wdth,wght.ttf'),
        'Fredoka1': require('../assets/fonts/Fredoka-Regular.ttf'),
      });
    }
    loadFonts();
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  //const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleNextPress = async () => {
    try {
      const payload = {
        auth0Id: "string",
        name,
        //username,
        email,
        password,
        accountType: "Applicant",
        isPremium: false,
        isActive: true
      };
    
  
      console.log('Payload:', payload);
  
      const response = await axios.post('https://joffer-backend-latest.onrender.com/Account', payload);
  
      console.log('Response:', response.data);
      //const userId = response.data.id;
     
      //console.log(userId);
      navigation.navigate('Register2',{ userEmail: email });
    } catch (error) {
      console.error('Error creating account:', error);
  
      
      if (error.response) {
        
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        
        console.error('Request:', error.request);
      } else {
        
        console.error('Error message:', error.message);
      }
    }
  };
    
      

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500} 
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
     
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
       
        
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Step 1/5: Essentials</Text>
        </View>

      
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Repeat Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        
        
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={['rgba(255, 126, 51, 1)', 'rgba(255, 94, 0, 1)']}
            style={styles.returnButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity onPress={handleNextPress}>
              <Text style={styles.returnButtonText}>Next</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0, 
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
    marginTop: 19,
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: 'Fredoka1',
    marginTop: 0,
    marginBottom: 10,
    padding: 10,
    color: '#FF7E33',
  },
  descriptionText: {
    fontSize: 15,
    marginTop: 10,
    fontFamily: 'Fredoka',
    textAlign: 'center',
    padding: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  inputContainer: {
    marginBottom: 0,
    fontFamily: 'Fredoka',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 230,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontFamily: 'Fredoka',
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
    //backgroundColor: '#FF7E33',
    width: 130,
  },
  returnButtonText: {
    fontSize: 18,
    fontFamily: 'Fredoka1',
    color: 'white',
  },
});

export default RegisterScreen;


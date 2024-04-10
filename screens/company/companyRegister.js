import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const CompanyRegister = () => {
  const navigation = useNavigation();
  
  
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Fredoka': require('../../assets/fonts/Fredoka-VariableFont_wdth,wght.ttf'),
      });
    }
    loadFonts();
  }, []);


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleNextPress = async () => {
    try {
      const payload = {
        auth0Id: "string",
        name,
        email,
        password,
        accountType: "Company",
        isPremium: false,
        isActive: true
      };
    
  
      console.log('Payload:', payload);
  
      const response = await axios.post('https://joffer-backend-latest.onrender.com/Account', payload);
  
      console.log('Response:', response.data);
      const userId = response.data.id;
     
      console.log(userId);
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
        {/* Logo with Welcome text */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/joffer2.png')} 
            style={styles.logo}
          />
          <Text style={styles.descriptionText}>Let's find new talents!</Text>
        </View>
        {/* Other content */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Step 1/5: Essentials</Text>
        </View>

        {/* Username and Password input fields */}
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
        
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.returnButton} onPress={handleNextPress}>
            <Text style={styles.returnButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#fff" 
  },
  scrollView: {
    flexGrow: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: '#1771E9',
    padding: 20,
    marginBottom: 20,
    marginLeft:-20,
    marginRight: -20,
    height:230,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
    marginTop: 15,
  },
  welcomeText: {
    fontSize: 20,
   fontFamily: 'Fredoka',
    marginTop: 0,
    marginBottom:10,
    padding: 10,
  },
  descriptionText: {
    fontSize: 20,
    marginTop: 10,
    fontFamily: 'Fredoka',
    textAlign: 'center',  
    padding:10, 
    color: 'white', 
    fontWeight: '400',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20, 
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
    backgroundColor:'#1771E9',
    width: 130,
  },
  returnButtonText: {
    fontSize: 18,
    fontFamily: 'Fredoka',
    color: 'white',
  },
});

export default CompanyRegister;
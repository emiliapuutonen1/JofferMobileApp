
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const FieldsScreen = ({route}) => {
  const navigation = useNavigation();
  const { userId } = route.params;

  const [fields, setFields] = useState([]); 

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Fredoka': require('../assets/fonts/Fredoka-VariableFont_wdth,wght.ttf'),
        'Fredoka1': require('../assets/fonts/Fredoka-Regular.ttf'),
      });
    }
    loadFonts();

  // ei toimi kun tuota endpointtia ei enään ole
    
    axios.get('https://joffer-backend-latest.onrender.com/api/Field')
      .then(response => {
      
        setFields(response.data);
      })
      .catch(error => {
        console.error('Error fetching fields:', error);
      });
  }, []);

  const [selectedFields, setSelectedFields] = useState([]);

  const toggleFieldSelection = (fieldId) => {
    const isSelected = selectedFields.includes(fieldId);
    if (isSelected) {
      setSelectedFields(selectedFields.filter(id => id !== fieldId));
    } else {
      setSelectedFields([...selectedFields, fieldId]);
    }
  };

  const renderFieldButton = ({ item }) => {
    const isSelected = selectedFields.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.fieldButton, isSelected && styles.selectedFieldButton]}
        onPress={() => toggleFieldSelection(item.id)}
      >
        <Text style={[styles.fieldButtonText, isSelected && styles.selectedFieldButtonText]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const handleNextPress = () => {
    navigation.navigate('Titles', {userId});
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
          <Text style={styles.welcomeText}>Step 3/5: Industries</Text>
          <Text style={[styles.welcomeText, { fontSize: 16 }]}>Select the industries that align best with your interests, knowledge, experience, and wishes. </Text>
        </View>

        <FlatList
          data={fields}
          renderItem={renderFieldButton}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.fieldButtonsContainer}
        />
        
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
    //backgroundColor: '#FF7E33',
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
  },
  fieldButtonsContainer: {
    alignItems: 'center',
  },
  fieldButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    margin: 5,
    backgroundColor: 'white',
    width: 100,
    borderWidth: 1,
    borderColor: '#FF7E33',
  },
  selectedFieldButton: {
    backgroundColor: '#FF7E33',
    color: 'white',
   
  },
  selectedFieldButtonText: {
    color: 'white',
   
  },
  fieldButtonText: {
    fontSize: 14,
    fontFamily: 'Fredoka1',
    color: '#FF7E33',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 45,
    
  },
  returnButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#FF7E33',
    width: 130,
    
  },
  returnButtonText: {
    fontSize: 18,
    fontFamily: 'Fredoka1',
    color: 'white',
  },
});

export default FieldsScreen;


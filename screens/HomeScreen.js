import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Fredoka': require('../assets/fonts/Fredoka-VariableFont_wdth,wght.ttf'),
        'Fredoka1': require('../assets/fonts/Fredoka-Regular.ttf'),
        'Fredoka2': require('../assets/fonts/Fredoka-Medium.ttf'),
      });
      setFontLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null; 
  }

  return (
    <LinearGradient
    colors={['#FFB58C', '#9BC9FF']}
    style={styles.container}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
  >
      <View style={styles.container}>
        
        <Image source={require('../assets/Joffer-Logo.png')} style={styles.logo} />
        <Text style={styles.matchmakerText}>
          Your professional matchmaker! {'\n'}
        </Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonBox}>
          <TouchableOpacity style={[styles.box, styles.talentBox]} onPress={() => navigation.navigate('Login')}>
            
          <ImageBackground
              source={require('../assets/talent.png')}
              style={styles.backgroundImage}
              imageStyle={{ opacity: 0.07 }}
              resizeMode="cover"
            >
            <LinearGradient
              colors={['rgba(255, 126, 51, 1)', 'rgba(255, 94, 0, 1)']}
              style={[styles.button, styles.talentButton, styles.buttonGradient]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.buttonText, styles.buttonTextFredoka]}>Talent</Text>
            </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
            <Text style={styles.buttonDescription}>For the ones who seek new job opportunities!</Text>
          </View>
          <View style={styles.buttonBox}>
            <TouchableOpacity style={[styles.box, styles.recruiterBox]} onPress={() => navigation.navigate('Cregister')}>
            
          <ImageBackground
              source={require('../assets/recruiter.png')}
              style={styles.backgroundImage}
              imageStyle={{ opacity: 0.07 }}
              resizeMode="cover"
            >
            <LinearGradient
              colors={['rgba(84, 150, 238, 1)', 'rgba(0, 99, 230, 1)']}
              style={[styles.button, styles.talentButton, styles.buttonGradient, ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.buttonText, styles.buttonTextFredoka]}>Recruiter</Text>
            </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
            <Text style={styles.buttonDescription}>For the ones who seek new talents to work with!
            </Text>
          </View>
        </View>
      </View>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
    
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 0,
    fontFamily: 'Fredoka',
  },
  logo: {
    width: 250,
    height: 50,
    marginBottom: 0,
    left: 5,
  },
  matchmakerText: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 40,
    fontFamily: 'Fredoka',
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '55%',
    alignSelf: 'center',
    maxHeight: 300,
      
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    
  },
  buttonBox: {
    alignItems: 'center',
    marginBottom: 10,
    
  },
  box: {
    width: 180,
    height: 180,
    position: 'relative',
    justifyContent: 'center',
    
    borderRadius: 20,
    
  },
  talentBox: {
    backgroundColor: '#FEF3ED',
    borderRadius: 20,
  },
  buttonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  recruiterBox: {
    backgroundColor: '#F0F6FD',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 0,
    top: 60, 
  },
  talentButton: {
    backgroundColor: '#F98A4B',
  },
  companyButton: {
    backgroundColor: '#6BA6E8',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    
    borderRadius: 20,
    textAlign: 'center',
    
    
  },
  buttonTextFredoka: {
    fontFamily: 'Fredoka2',
      
  },
  buttonDescription: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
    fontFamily: 'Fredoka',
  },
});

export default HomeScreen;
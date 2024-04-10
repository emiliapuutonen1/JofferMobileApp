import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';

const MatchesScreen = () => {
  const [latestMatchesVisible, setLatestMatchesVisible] = useState(false);
  const [superlikesVisible, setSuperlikesVisible] = useState(false);

  const handleLatestMatchesPress = () => {
    setLatestMatchesVisible(!latestMatchesVisible);
  };

  const handleSuperlikesPress = () => {
    setSuperlikesVisible(!superlikesVisible);
  };

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Fredoka': require('../assets/fonts/Fredoka-VariableFont_wdth,wght.ttf'),
        'Fredoka2': require('../assets/fonts/Fredoka-Regular.ttf'),
      });
    }
    loadFonts();
  }, []);

  return (
    <LinearGradient
      colors={['rgba(255, 118, 38, 1)', 'rgba(173, 65, 1, 1)']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container1}>
          <Text style={styles.sectionTitle}>Scroll your latest matches!</Text>

          <TouchableOpacity style={styles.logoButton} onPress={handleLatestMatchesPress}>
            <LinearGradient
              colors={['rgba(232, 86, 0, 1)', 'rgba(140, 52, 0, 1)']}
              style={styles.logoContainer}
            >
              <Image
                style={styles.logoImage}
                source={require('../assets/White png 1.png')}
                resizeMode="contain"
              />
              <Text style={styles.logoText}>Latest Matches</Text>
            </LinearGradient>
          </TouchableOpacity>
          {latestMatchesVisible && (
            <LinearGradient
              colors={['rgba(255, 118, 38, 1)', 'rgba(173, 65, 1, 1)']}
              style={styles.section}
            >
              <View style={styles.matchesContainer}>
                <TouchableOpacity style={styles.matchButton}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require('../assets/Company logo.png')}
                      style={styles.logoImageInButton}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.logoText1}>Nokia</Text>
                    <Text style={styles.logoText2}>Developer</Text>
                  </View>
                  <View style={styles.textContainer1}>
                    <Text style={styles.logoText3}>11.3.2024</Text>
                    
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.matchButton}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require('../assets/Company logo.png')}
                      style={styles.logoImageInButton}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.logoText1}>City of Oulu</Text>
                    <Text style={styles.logoText2}>Backend Developer</Text>
                  </View>
                  <View style={styles.textContainer1}>
                    <Text style={styles.logoText3}>20.3.2024</Text>
                    
                  </View>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          )}

          
          <TouchableOpacity style={styles.logoButton} onPress={handleSuperlikesPress}>
            <LinearGradient
              colors={['rgba(0, 90, 209, 1)', 'rgba(0, 54, 127, 1)']}
              style={styles.logoContainer}
            >
              <Image
                style={styles.logoImage}
                source={require('../assets/White png 1.png')}
                resizeMode="contain"
              />
              <Text style={styles.logoText}>Superlikes</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          {superlikesVisible && (
            <LinearGradient
              colors={['rgba(0, 90, 209, 1)', 'rgba(0, 54, 127, 1)']}
              style={styles.section}
            >
              <View style={styles.matchesContainer}>
                <TouchableOpacity style={styles.matchButton}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require('../assets/Company logo.png')}
                      style={styles.logoImageInButton}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.logoText1}>Nokia</Text>
                    <Text style={styles.logoText2}>Developer</Text>
                  </View>
                  <View style={styles.textContainer1}>
                    <Text style={styles.logoText3}>20.3.2024</Text>
                    
                  </View>
                </TouchableOpacity>
                
              </View>
            </LinearGradient>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container1: {
    paddingTop: 40,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Fredoka2',
    marginBottom: 20,
    marginTop: 30,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    height: 100,
  },
  logoImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginLeft: 10,
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Fredoka2',
  },
  logoText1: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Fredoka',
  },
  section: {
    padding: 10,
    height: 450,
  },
  matchesContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  matchButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Fredoka',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 0,
    right: 20,
  },
  textContainer: {
    flexDirection: 'column',
    right: 10,
    alignItems: 'flex-start', 
    flex: 1,
  },
  textContainer1: {
    flexDirection: 'column',
    
  },
  logoImageInButton: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  logoText2: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Fredoka',
  },
  logoText3: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Fredoka',
  }
});

export default MatchesScreen;



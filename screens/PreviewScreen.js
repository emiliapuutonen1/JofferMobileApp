import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SwipeButton from 'rn-swipe-button';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const ProfilePreview = ({route}) => {
  const navigation = useNavigation();
  const { userId } = route.params;
  console.log(userId);
  const [userName, setUserName] = useState('');
  const [aboutMe, setAboutMe] = useState('');

  useEffect(() => {
   
    axios.get(`https://joffer-backend-latest.onrender.com/Account/${userId}`)
      .then(response => {
        setUserName(response.data.name);
      })
      .catch(error => {
        console.error('Error fetching user name:', error);
      });

    
    const hardcodedUserId = 8;
    axios.get(`https://joffer-backend-latest.onrender.com/Talent/${hardcodedUserId}`)
      .then(response => {
        setAboutMe(response.data.aboutMe);
      })
      .catch(error => {
        console.error('Error fetching about me:', error);
      });
  }, [userId]);

  const handleNextPress = () => {
    console.log(userId);
    navigation.navigate('Swipe' ,{userId});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <View style={styles.profileContainer}>
        <Text style={[styles.userName, { color: '#F98A4B', fontSize: 26, marginBottom: 15 }]}>{userName}</Text>
        <Image source={require('../assets/kuva1.jpg')} style={styles.profileImage} />
        <Text style={[styles.professions, { marginTop: 10 }]}>Coder ● Data Engineer ● Plain Awesome</Text>

      </View>
      <View style={styles.aboutContainer}>
        <Text style={[styles.aboutHeaderText, { color: '#FF7E33', fontSize: 22, fontFamily: 'Fredoka1' }]}>About me</Text>
        <Text style={[styles.aboutText, { color: 'black', fontSize: 18 }]}>{aboutMe}</Text>
        <Text style={[styles.professions, { marginTop: 20, fontSize: 18, fontFamily: 'Fredoka1', color: '#FF7E33' }]}>A fun fact about me: </Text>
        <Text style={[styles.professions, { marginTop: 10 }]}>"happiest animal in the world" </Text>
      </View>
      <View style={styles.linksContainer}>
        <Text style={[styles.linksHeader, { color: '#FF7E33', fontFamily: 'Fredoka1', fontSize: 18 }]}>Links and Socials</Text>
        <View style={styles.linksList}>
          <Text style={[styles.linkText, { color: '#FF7E33' }]}>https://example.com</Text>
          <Text style={[styles.linkText, { color: '#FF7E33' }]}>https://example2.com</Text>
        </View>
      </View>
      <SwipeButton
        title="    Save and start swiping!"
        onSwipeSuccess={handleNextPress}
        railStyles={{
          backgroundColor: 'rgba(255, 191, 129, 0.3)',
          borderColor: '#FF7E33',
          zIndex: 1,
          elevation: 1,
        }}
        thumbIconBackgroundColor="#FF7E33"
        thumbIconImageSource={require('../assets/right-arrow.png')}
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
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: -0,
    //padding: 20,
    //marginBottom: 20,
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
  },
  professions: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'Fredoka',
  },
  aboutContainer: {
    marginTop: 20,
    alignItems: 'center',
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
});

export default ProfilePreview;

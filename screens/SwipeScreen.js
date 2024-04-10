import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Modal, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faTimesCircle, faCircleQuestion, faGear } from '@fortawesome/free-solid-svg-icons';
import CompanyInfo from '../components/companyInfo';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';


const SwipeScreen = ({ route }) => {
  const { userId } = route.params;
  const { theme } = useTheme();
  const [companies, setCompanies] = useState([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [companyId, setCompanyId] = useState(null);

  const [activeCardIndex, setActiveCardIndex] = useState(0); 
  const navigation = useNavigation();
  
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://joffer-backend-latest.onrender.com/JobOffer');
        setCompanies(response.data);
        
      } catch (error) {
        console.error('Error fetching companies:', error);
        Alert.alert('Error', 'An error occurred while fetching companies.');
      }
    };

    fetchCompanies();
  }, []);

  
  const handleCompanyIdReceived = (companyId) => {
    setCompanyId(companyId);
    console.log('whats',companyId);
    
  };

  const handleSwipeRight = () => {
    setShowMatchModal(true);
  };

  const closeModal = () => {
    setShowMatchModal(false);
  };

  const navigateToHowItWorks = () => {
    navigation.navigate('HowItWorks');
  };

  const navigateToSettings = () => {
    console.log(companyId);
    navigation.navigate('Settings', { userId, companyId });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient
          colors={['rgba(255, 126, 51, 1)', 'rgba(255, 94, 0, 1)']}
          style={styles.logoContainer}
        >
          <Image
            source={require('../assets/joffer2.png')}
            style={styles.logo}
          />
        </LinearGradient>
        <Swiper
  cards={companies}
  renderCard={(company, index) => {
    if (!company || index !== activeCardIndex) {
      return null; 
    }

    console.log("Rendering card for company:", company);
    const images = [
      require('../assets/icon.png'),
      require('../assets/Google.png'),
      require('../assets/kuva4.jpg'),
    ];

    const imageSource = images[index % images.length];

    return (
      <CompanyInfo
        key={company.companyId} 
        company={{ ...company, image: imageSource }}
        onCompanyIdReceived={handleCompanyIdReceived}
        isVisible={index === activeCardIndex} 
      />
    );
  }}
  backgroundColor={'transparent'}
  stackSize={2}
  verticalSwipe={false}
  containerStyle={styles.swiperContainer}
  onSwipedLeft={(index) => {
    console.log("Swiped right on card with index:", index);
    setActiveCardIndex(index + 1);
  }} 
  onSwipedAll={() => {
   
    setActiveCardIndex(0);
  }}
/>

        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => { /* icon */ }}>
            <FontAwesomeIcon icon={faTimesCircle} size={60} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { /* kuva */ }}>
            <Image source={require('../assets/Superlike.png')} style={styles.customIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { /* icon */ }}>
            <FontAwesomeIcon icon={faHeart} size={60} style={[styles.icon, { color: '#58D336' }]} />
          </TouchableOpacity>
        </View>
        <View style={styles.iconsContainer2}>
          <TouchableOpacity onPress={navigateToHowItWorks}>
            <FontAwesomeIcon icon={faCircleQuestion} size={40} style={[styles.icon, { color: '#FF7E33' }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToSettings}>
            <FontAwesomeIcon icon={faGear} size={40} style={[styles.icon, { color: '#FF7E33' }]} />
          </TouchableOpacity>
        </View>
      </ScrollView>
     

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: '#FF7E33',
    padding: 20,
    marginBottom: 10,
    marginLeft: -20,
    marginRight: -20,
    height: 150,
  },
  logo: {
    width: 70,
    height: 70,
    marginTop: 30,
  },
  swiperContainer: {
    height: 400,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 450,
  },
  iconsContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  icon: {
    fontSize: 80,
    color: '#D9352D',
  },
  customIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});


export default SwipeScreen;

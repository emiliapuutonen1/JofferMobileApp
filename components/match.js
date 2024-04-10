import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';


const MatchModal = ({ modalVisible, closeModal, route  }) => {
  const [userName, setUserName] = useState('');
  const { userId } = route.params;
  const { companyId } = route.params;
  const navigation = useNavigation();
  console.log(userId);
  console.log(companyId);
 

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(`https://joffer-backend-latest.onrender.com/Account/${userId}`);
        const userData = await response.json();
        setUserName(userData.name);
        console.log(userId);

      } catch (error) {
        console.error('Error fetching user name:', error);
        setUserName('User Name');
      }
    };

    fetchUserName();
  }, [userId]);

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={['rgba(255, 126, 51, 1)', 'rgba(255, 94, 0, 1)']}
          style={styles.gradientContainer}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.matchText}>IT'S A MATCH!!</Text>
            <View style={styles.profileContainer}>
              <View style={styles.profileItem}>
                <Image source={require('../assets/Google.png')} style={styles.profileImage} />
                <Text style={styles.nameText}>Company Name</Text>
              </View>
              <View style={styles.profileItem}>
                <Image source={require('../assets/kuva1.jpg')} style={styles.profileImage} />
                <Text style={styles.nameText}>{userName}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.heartContainer}>
              <FontAwesomeIcon icon={faHeart} size={60} style={styles.heartIcon} />
            </TouchableOpacity>
            <View style={styles.matchContainer}>
              <TouchableOpacity onPress={handleNavigateBack} style={styles.button}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  profileItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 0,
    borderWidth: 3,
    borderColor: 'black',
  },
  nameText: {
    fontFamily: 'Fredoka',
    fontSize: 16,
    marginTop: 5,
    color: 'white',
  },
  heartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    color: 'red',
  },
  matchContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  matchText: {
    fontFamily: 'Fredoka2',
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'Fredoka',
    fontSize: 16,
    color: '#FF7E33',
  },
});

export default MatchModal;

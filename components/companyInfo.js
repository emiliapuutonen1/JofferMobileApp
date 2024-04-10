
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ModalComponent from './companyModal'; 

const CompanyInfo = ({ company, onCompanyIdReceived }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (company && company.companyId !== undefined) {
      onCompanyIdReceived(company.companyId);
    }
  }, [onCompanyIdReceived]);
  console.log(company.companyId);
  console.log('okay',company.id);
  if (!company || company.companyId === undefined) {
    return null; 
  } 

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <LinearGradient
        colors={['rgba(255, 126, 51, 1)', 'rgba(255, 94, 0, 1)']}
        style={styles.gradientContainer}
      >
        <View style={styles.container}>
          <Image source={company.image} style={styles.imageBackground} />
          <View style={styles.cardDetails}>
            <Text style={styles.companyName}>{company.title}</Text>
            <Text style={styles.jobDetails}>{company.description}</Text>
        
            <TouchableOpacity
              style={styles.moreInfoButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.moreInfoButtonText}>More Info</Text>
            </TouchableOpacity>
          </View>
       
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} companyId={company.companyId} offerId={company.id} />
          </Modal>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  gradientContainer: {
    borderRadius: 10,
    margin: 10,
  },
  container: {
    padding: 20,
    alignItems: 'center',
    height: 400,
    position: 'relative',
    overflow: 'hidden',
  },
  companyName: {
    fontFamily: 'Fredoka1',
    fontSize: 26,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 20,
  },
  jobDetails: {
    fontFamily: 'Fredoka1',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
  moreInfoButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    position: 'relative',
  },
  moreInfoButtonText: {
    fontFamily: 'Fredoka2',
    fontSize: 16,
    color: '#FF7E33',
  },
  imageBackground: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 30,
  },
});

export default CompanyInfo;




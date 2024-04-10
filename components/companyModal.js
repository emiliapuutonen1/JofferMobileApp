import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';


const ModalComponent = ({ modalVisible, setModalVisible, companyId, offerId }) => {
  const [accountId, setAccountId] = useState();
  const [companyData, setCompanyData] = useState();
  const [accountData, setAccountData] = useState();
  const [offerData, setOfferData] = useState();
  

  // sitten job offer tarkemmin
  
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`https://joffer-backend-latest.onrender.com/Company/${companyId}`);
        setCompanyData(response.data);
        const accountId = response.data.accountId;
        setAccountId(accountId);
        if (accountId) {
        
          const accountResponse = await axios.get(`https://joffer-backend-latest.onrender.com/Account/${accountId}`);
          setAccountData(accountResponse.data);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };
  
    if (modalVisible && companyId) {
      fetchCompanyData();
    }
  }, [modalVisible, companyId]);

  useEffect(() => {
    if (companyData) {
      console.log(companyData);
      //console.log(companyData.description);
    }
  }, [companyData]);
  
  useEffect(() => {
    if (accountId) {
      console.log(accountId);
    }
  }, [accountId]);

  useEffect(() => {
    if (accountData) {
      console.log(accountData);
    }
  }, [accountData]);
  useEffect(() => {
    const fetchJobOfferData = async () => {
      try {
        const response = await axios.get(`https://joffer-backend-latest.onrender.com/JobOffer/${offerId}`);
        setOfferData(response.data);
        
      } catch (error) {
        console.error('Error fetching job offer data:', error);
      }
    };

    if (modalVisible && companyId) {
      fetchJobOfferData();
    }
  }, [modalVisible, companyId]);
  useEffect(() => {
    if (offerData) {
      console.log('offerData:', offerData);
    }
  }, [offerData]);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255, 118, 38, 1)', 'rgba(173, 65, 1, 1)']}
        style={styles.gradientBackground}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require('../assets/joffer.png')}
              style={styles.image}
              resizeMode="contain"
            />
            
            <View style={styles.textContainer}>
              { accountData && <Text style={styles.company2Text}>{accountData.name}</Text>}
              
            </View>
            
            <View style={styles.textContainer}>
            
              {offerData && <Text style={styles.companyText}>{offerData.title}{"\n"}</Text> }   
              {offerData &&<Text style={styles.infoText}>{offerData.employmentStatus}{"\n"}                                                   
Salary Range:  {offerData.minSalary} - {offerData.maxSalary} e/month
{"\n"}{"\n"}Job Description:{"\n"}{"\n"} 
Nokia is seeking a talented and motivated Database Engineer to join our dynamic team. As a Database Engineer, you will play a crucial role in designing, implementing, and maintaining our database systems to ensure optimal performance, reliability, and scalability. You will collaborate closely with cross-functional teams to understand business requirements and translate them into efficient database solutions. Additionally, you will monitor database performance, troubleshoot issues, and implement security measures to safeguard sensitive data.

{"\n"}{"\n"}Responsibilities:{"\n"}{"\n"}
Design, implement, and maintain database systems, including schema design, indexing, and data migration.
Collaborate with software engineers and other stakeholders to develop database solutions that meet business requirements.
Optimize database performance through tuning, indexing, and query optimization techniques.
Implement and maintain database security measures to protect sensitive data.
Monitor database health and performance, and troubleshoot issues as they arise.
Participate in capacity planning and scalability initiatives to support business growth.
Stay updated on emerging technologies and best practices in database management.

{"\n"}{"\n"}Requirements:{"\n"}{"\n"}
Bachelor's degree in Computer Science, Information Technology, or related field.
Proven experience as a Database Engineer or similar role, with expertise in database design, implementation, and maintenance.
Proficiency in SQL and experience with relational database management systems (e.g., Oracle, MySQL, PostgreSQL).
Strong understanding of database architecture, indexing, and performance optimization techniques.
Experience with database security concepts and best practices.
Excellent problem-solving skills and ability to troubleshoot database issues effectively.
Strong communication and collaboration skills, with the ability to work effectively in cross-functional teams.
Knowledge of NoSQL databases (e.g., MongoDB, Cassandra) and cloud database services (e.g., AWS RDS, Azure SQL Database) is a plus.

{"\n"}{"\n"}Why Join Nokia:{"\n"}{"\n"}
Opportunity to work with cutting-edge technology and shape the future of telecommunications.
Collaborative and inclusive work culture that values innovation and diversity.
Competitive salary and benefits package.
Flexible work arrangements, including remote work options.
Professional development opportunities and career growth prospects.

If you're passionate about database engineering and eager to make an impact in a global organization, we'd love to hear from you. Join us at Nokia and be part of our journey to connect the world! Apply now by submitting your resume and cover letter detailing your relevant experience and why you're the perfect fit for this role.
{"\n"}{"\n"} Links: ......</Text>}

<Text style={styles.companyText}>About the Company: </Text>
              {companyData && <Text style={styles.infoText}> {companyData.description} </Text>}
            </View>
          
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '95%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    marginTop:10,
  },
  textContainer: {
    marginBottom: 20,
  },
  companyText: {
    fontFamily: 'Fredoka2',
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    alignSelf:'center',
  },
  company1Text: {
    fontFamily: 'Fredoka2',
    fontSize: 26,
    color: 'white',
    alignSelf:'center',
    
  },
  company2Text: {
    fontFamily: 'Fredoka2',
    fontSize: 34,
    color: 'white',
  },
  infoText: {
    fontFamily: 'Fredoka',
    fontSize: 18,
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontFamily: 'Fredoka2',
    fontSize: 16,
    color: 'rgba(255, 118, 38, 1)',
  },
});

export default ModalComponent;

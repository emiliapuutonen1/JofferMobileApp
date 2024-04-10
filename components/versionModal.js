import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
const VersionModal = ({ visible, onClose, version }) => {
    const [fontLoaded, setFontLoaded] = React.useState(false);
    React.useEffect(() => {
        const loadFont = async () => {
            await Font.loadAsync({
                'fredoka': require('../assets/fonts/Fredoka-VariableFont_wdth,wght.ttf'),
                'fredoka1': require('../assets/fonts/Fredoka-Regular.ttf'),
            });
            setFontLoaded(true);
        };
        loadFont();
    }, []);
    if (!fontLoaded) {
        return null;
    }

  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
        <Text style={[styles.infoText, styles.fontFredoka]}>Version:</Text>
          <Text style={[styles.infoText, styles.fontFredoka]}>Versio joku gfkogdfkgfdgdfnglfgndfklgndfl</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <LinearGradient
              colors={['rgba(255, 126, 51, 1)', 'rgba(255, 94, 0, 1)']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.closeButtonText, styles.fontFredoka]}>Close</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily:'fredoka1'
  },
  infoText: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily:'fredoka'
  },
  closeButton: {
    borderRadius: 5,
    overflow: 'hidden', 
  },
  buttonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  fontFredoka: {
    fontFamily: 'fredoka1', 
  },
});

export default VersionModal;
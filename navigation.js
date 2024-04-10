import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import * as React from 'react';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RegisterScreen2 from './screens/RegisterScreen2';
import FieldsScreen from './screens/FieldsScreen';
import TitlesScreen from './screens/TitlesScreen';
import SocialsScreen from './screens/SocialsScreen';
import ProfilePreview from './screens/PreviewScreen';
import SwipeScreen from './screens/SwipeScreen';
import HowItWorks from './components/howItWorks';
import Settings from './components/settings';
import MatchesScreen from './screens/Matches.js';
import ModifyAccount from './screens/ModifyAccount.js';
import ProfileModify from './screens/settingsScreens/profileModify.js';
import DeleteProfile from './screens/settingsScreens/delete.js';
import MatchScreen from './components/match.js';
import CompanyRegister from './screens/company/companyRegister.js';

export default function Navigation (){
    return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Register2" component={RegisterScreen2} />
    <Stack.Screen name="Fields" component={FieldsScreen} />
    <Stack.Screen name="Titles" component={TitlesScreen} />
    <Stack.Screen name="Socials" component={SocialsScreen} />
    <Stack.Screen name="Preview" component={ProfilePreview} />
    <Stack.Screen name="Swipe" component={SwipeScreen} />
    <Stack.Screen name="HowItWorks" component={HowItWorks} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="Matches" component={MatchesScreen} />
    <Stack.Screen name="Modify" component={ModifyAccount} />
    <Stack.Screen name="ModifyProfile" component={ProfileModify} />
    <Stack.Screen name="DeleteProfile" component={DeleteProfile} />
    <Stack.Screen name="Match" component={MatchScreen} />
    <Stack.Screen name="Cregister" component={CompanyRegister} />
    
    </Stack.Navigator>
    </NavigationContainer>
    
    
    )}

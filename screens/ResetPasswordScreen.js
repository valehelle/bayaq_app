import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { useDispatch } from 'react-redux';
import userSlice from '../features/accounts/userSlice'
import Colors from '../constants/Colors'
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

const userAction = userSlice.actions

export default function ResetPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const submitPressed = () => {
        if (email != '') {
            dispatch(userAction.resetPassword({ email, resetPasswordSuccess }))
        } else {
            alert('Please enter valid email address')
        }
    }
    const resetPasswordSuccess = () => {
        alert(`An email with a link has been sent to ${email}. Please open the link in your phone.`)
    }
    return (
        <ScrollView className="scrollView" style={styles.container}>
            <View style={{ height: '30vh', justifyContent: 'flex-end' }}>
                <Text style={{ fontWeight: '600', color: 'white', fontSize: 40 }}>Bayaq</Text>
                <Text style={{ fontWeight: '400', color: 'white', fontSize: 35, marginTop: 20 }}>Pay all your bills in one click</Text>
            </View>
            <View style={{ paddingTop: 20 }}>
                <Text style={{ color: 'white' }}>Enter your email address so we can email you with the reset password link.</Text>
                <TextInput
                    maxLength={40}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder='Email'
                    placeholderTextColor="lightgrey"
                    autoCapitalize='none'
                    keyboardType='email-address'
                    style={{ borderRadius: 5, color: 'white', borderColor: 'white', marginTop: 10, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}
                />
                <TouchableOpacity style={{ borderRadius: 5, marginTop: 20, marginBottom: 10, borderWidth: 1, borderColor: 'white', paddingVertical: 5 }} onPress={submitPressed}>
                    <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Reset Password</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

ResetPasswordScreen.navigationOptions = {
    header: null,
};
ResetPasswordScreen.path = 'reset_password'

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 50,
        backgroundColor: Colors.primaryColor,
    },
});
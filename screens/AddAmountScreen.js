import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { updateBill } from '../features/bills/billsSaga'
import { useDispatch, useSelector } from 'react-redux';
import { addBill } from '../features/bills/billsSaga'
import Dinero from 'dinero.js'
import { getBillAmountFromServerWithCallback } from '../features/bills/billsSaga'
import Colors from '../constants/Colors'

const buttonPressed = (myr, setMyr, text) => {
    if (text === '.') {
        const amount = myr.includes(".") ? myr : `${myr}.`
        setMyr(amount)
    } else if (text == 'clear') {
        setMyr(`0`)
    } else {
        if (myr.includes(".")) {
            const myrArray = myr.split(".")
            const afterDecimal = myrArray[1]
            const amount = afterDecimal.length < 2 ? `${myr}${text}` : myr
            setMyr(amount)
        } else {
            const amount = myr == 0 ? text : `${myr}${text}`
            setMyr(amount)
        }

    }

}
const _button = (text, krw, setKrw) => {
    return (
        <View style={{ flex: 1 / 3, alignItems: 'center', justifyContent: 'center', padding: .5, backgroundColor: 'silver' }}>
            <TouchableOpacity style={{ backgroundColor: 'grey', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', }} onPress={() => buttonPressed(krw, setKrw, text)}>
                <Text style={{ textAlign: 'center', fontSize: 35, color: 'white' }}>{text}</Text>
            </TouchableOpacity>
        </View >
    )
}
export default function AddAmountScreen({ navigation }) {
    const [myr, setMyr] = useState(0)
    const [billDetail, setBillDetail] = useState({})
    const [billStatus, setBillStatus] = useState('UPDATE')
    const dispatch = useDispatch()

    const changeBill = () => {
        const billStatus = navigation.getParam('billStatus', 'NO-ID')
        const amount = Dinero({ amount: parseFloat(myr) * 100, currency: 'MYR' }).getAmount()
        const newBill = { ...billDetail, amount: amount }
        if (billStatus == 'UPDATE') {
            dispatch(updateBill({ bill: newBill, billCreated }))
        } else {
            dispatch(addBill({ bill: newBill, billCreated }))
        }
    }
    useEffect(() => {
        const billDetail = navigation.getParam('bill', 'NO-ID')
        const billStatus = navigation.getParam('billStatus', 'NO-ID')

        if (typeof billDetail === 'string' || billDetail instanceof String) {

            navigation.navigate('Home', { bill: null })
        } else {
            setBillDetail(billDetail)
            setMyr(billDetail.amount.toString())
            if (billStatus != 'UPDATE') {
                if (billDetail.billerCode == 68502 || billDetail.billerCode == 5454) {
                    dispatch(getBillAmountFromServerWithCallback({ bill: billDetail, callback: updateAmount }))
                }
                setBillStatus('CREATE')
            } else {
                setBillStatus('UPDATE')
            }
        }

    }, [])
    const updateAmount = ({ amount }) => {
        const newAmount = Dinero({ amount: amount }).toFormat("0.00")
        if (amount > 0) setMyr(newAmount.toString())
    }
    const billCreated = () => {
        navigation.navigate('Home', { bill: null })
    }
    const backButtonPressed = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View><Text style={{ color: 'white', fontSize: 16, padding: 10, fontWeight: 'bold' }}>Set Amount</Text></View>
            <View style={{ backgroundColor: 'white', paddingTop: 20, height: '100%', borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: .5, paddingLeft: 20 }}>
                        <TouchableOpacity style={{ width: 50, padding: 5, paddingLeft: 0 }} onPress={backButtonPressed}>
                            <Text style={{ color: Colors.primaryColor, textAlign: 'left' }}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: .5, paddingRight: 20 }}>
                        <TouchableOpacity style={{ width: 80, padding: 5, paddingRight: 0, textAlign: 'right', alignSelf: 'end' }} onPress={changeBill}>
                            <Text style={{ color: Colors.primaryColor, textAlign: 'right' }}>{billStatus == 'UPDATE' ? 'Update' : 'Create'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 10, height: '100%' }}>
                    <View style={{ flex: .1, backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 60, textAlign: 'right' }}>{myr}<Text style={{ fontSize: 12 }}>MYR</Text></Text>
                    </View>
                    <View style={{ flex: .9, justifyContent: 'center' }}>
                        <View style={{ flex: .2, flexDirection: 'row' }}>
                            {_button('1', myr, setMyr)}
                            {_button('2', myr, setMyr)}
                            {_button('3', myr, setMyr)}
                        </View>
                        <View style={{ flex: .2, flexDirection: 'row' }}>
                            {_button('4', myr, setMyr)}
                            {_button('5', myr, setMyr)}
                            {_button('6', myr, setMyr)}
                        </View>
                        <View style={{ flex: .2, flexDirection: 'row' }}>
                            {_button('7', myr, setMyr)}
                            {_button('8', myr, setMyr)}
                            {_button('9', myr, setMyr)}
                        </View>
                        <View style={{ flex: .2, flexDirection: 'row' }}>
                            {_button('clear', myr, setMyr)}
                            {_button('0', myr, setMyr)}
                            {_button('.', myr, setMyr)}
                        </View>
                    </View>
                </View>
            </View>
        </View >
    );
}

AddAmountScreen.navigationOptions = {
    header: null,
};
AddAmountScreen.path = 'amount'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: Colors.primaryColor,
    },
});

import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { updateBill } from '../features/bills/billsSaga'
import { useDispatch, useSelector } from 'react-redux';
import Dinero from 'dinero.js'
import { getBillAmountFromServerWithCallback } from '../features/bills/billsSaga'
import billsSlice, { isAddingBillSelector } from '../features/bills/billsSlice'
import Colors from '../constants/Colors'
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';

const billsAction = billsSlice.actions


const buttonPressed = (myr, setMyr, text, setFirstTime, firstTime) => {

    if (myr === '0.00' || firstTime) {
        if (text != 'clear') {
            setFirstTime(false)
            setMyr(text)
        } else {
            setMyr(`0.00`)
        }

    }
    else if (text === '.') {
        const amount = myr.includes(".") ? myr : `${myr}.`
        setMyr(amount)
    } else if (text == 'clear') {
        setMyr(`0.00`)
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
const _button = (text, krw, setKrw, setFirstTime, firstTime) => {
    let showLeftBorder
    let showBottomBorder
    if (text != '1' && text != '7' && text != '4' && text != 'clear') {
        showLeftBorder = true
    } else {
        showLeftBorder = false
    }
    if (text != 'clear' && text != '0' && text != '.') {
        showBottomBorder = true
    } else {
        showBottomBorder = false
    }
    return (
        <View style={{ flex: 1 / 3, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, borderColor: 'lightgrey', borderLeftWidth: showLeftBorder ? 1 : 0, borderBottomWidth: showBottomBorder ? 1 : 0 }}>
            <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', borderRadius: 5 }} onPress={() => buttonPressed(krw, setKrw, text, setFirstTime, firstTime)}>
                <Text style={{ textAlign: 'center', fontSize: 35, color: Colors.secondaryColor }}>{text}</Text>
            </TouchableOpacity>
        </View >
    )
}
export default function AddAmountScreen() {
    const navigation = useNavigation()
    const router = useRoute()
    const [myr, setMyr] = useState('0.00')
    const [billDetail, setBillDetail] = useState({})
    const [billStatus, setBillStatus] = useState('UPDATE')
    const [firstTime, setFirstTime] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const isAddingBill = useSelector(state => isAddingBillSelector(state))

    const dispatch = useDispatch()


    const changeBill = () => {
        if (!isLoading && !isAddingBill) {
            const billStatus = router.params.billStatus
            const floatAmount = (parseFloat(myr) * 100).toFixed(0)
            const amount = Dinero({ amount: parseInt(floatAmount), currency: 'MYR' }).getAmount()
            const newBill = { ...billDetail, amount: amount }
            if (billStatus == 'UPDATE') {
                dispatch(updateBill({ bill: newBill, billCreated }))
            } else {
                dispatch(billsAction.addBill({ bill: newBill, billCreated }))
            }
        }

    }
    useEffect(() => {
        const billDetail = router.params.bill
        const billStatus = router.params.billStatus

        if (typeof billDetail === 'string' || billDetail instanceof String) {

            navigation.navigate('Home', { bill: null })
        } else {
            setBillDetail(billDetail)
            setMyr(billDetail.amount.toString())
            if (billStatus != 'UPDATE') {
                if (billDetail.billerCode == 68502 || billDetail.billerCode == 5454 || billDetail.billerCode == 4200) {

                    dispatch(getBillAmountFromServerWithCallback({ bill: billDetail, callback: updateAmount }))
                    setIsLoading(true)
                }
                setBillStatus('CREATE')
            } else {
                setBillStatus('UPDATE')
            }
        }

    }, [])
    const updateAmount = ({ amount }) => {
        const newAmount = Dinero({ amount: amount }).toFormat("0.00")
        setMyr(newAmount.toString())
        setIsLoading(false)
    }
    const billCreated = () => {
        navigation.navigate('Home', { bill: null })
    }
    const backButtonPressed = () => {
        navigation.goBack()
    }
    const deleteButtonPressed = () => {
        Alert.alert(
            'Are you sure you want to delete this bill?',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        dispatch(billsAction.removeBill({ billId: billDetail.id }))
                        navigation.goBack()
                    }
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.headerColor }}>
            <View style={{ flex: .4, paddingTop: Constants.statusBarHeight, }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '20%' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                                <MaterialIcons name="arrow-back" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        {billStatus === 'UPDATE' &&
                            <View style={{ width: '80%', alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={deleteButtonPressed} style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                                    <MaterialIcons name="delete" size={24} color="white" />
                                </TouchableOpacity>
                            </View>}
                    </View>
                    <View style={{ height: '100%', flex: 1, justifyContent: 'center', }}>
                        <View style={{ flex: .5, justifyContent: 'center', paddingHorizontal: 20 }}>
                            <Text style={{ color: 'white', fontSize: 40 }}>{billDetail.companyName}</Text>
                            <Text style={{ color: 'white', fontSize: 18, marginTop: 5 }}>{billDetail.ref1}</Text>
                            <Text style={{ color: 'white', fontSize: 18 }}>{billDetail.ref2}</Text>

                        </View>

                    </View>
                </View>
            </View>
            <View style={{ flex: .8, backgroundColor: 'white', paddingTop: 10 }}>
                <View style={{ flex: .2, justifyContent: 'center', paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', borderRadius: 5, borderWidth: 1, borderColor: 'lightgrey', paddingHorizontal: 20 }}>
                        <View style={{ flex: .4, justifyContent: 'center', }}>
                            <Text style={{ color: 'grey', textAlign: 'center', fontSize: 11 }}>Insert bill amount</Text>
                        </View>
                        <View style={{ flex: .6, }}>
                            {isLoading ?
                                <ActivityIndicator size='small' color={Colors.secondaryColor} style={{ height: 35, alignSelf: 'flex-end', marginRight: 60 }} /> :
                                <Text style={{ color: Colors.secondaryColor, fontSize: 35, textAlign: 'right' }}>RM{myr}</Text>
                            }
                        </View>
                    </View>
                </View>
                <View style={{ flex: .7, paddingHorizontal: 20, justifyContent: 'center' }}>
                    <View style={{ flex: .2, flexDirection: 'row' }}>
                        {_button('1', myr, setMyr, setFirstTime, firstTime)}
                        {_button('2', myr, setMyr, setFirstTime, firstTime)}
                        {_button('3', myr, setMyr, setFirstTime, firstTime)}
                    </View>
                    <View style={{ flex: .2, flexDirection: 'row' }}>
                        {_button('4', myr, setMyr, setFirstTime, firstTime)}
                        {_button('5', myr, setMyr, setFirstTime, firstTime)}
                        {_button('6', myr, setMyr, setFirstTime, firstTime)}
                    </View>
                    <View style={{ flex: .2, flexDirection: 'row' }}>
                        {_button('7', myr, setMyr, setFirstTime, firstTime)}
                        {_button('8', myr, setMyr, setFirstTime, firstTime)}
                        {_button('9', myr, setMyr, setFirstTime, firstTime)}
                    </View>
                    <View style={{ flex: .2, flexDirection: 'row' }}>
                        {_button('clear', myr, setMyr, setFirstTime, firstTime)}
                        {_button('0', myr, setMyr, setFirstTime, firstTime)}
                        {_button('.', myr, setMyr, setFirstTime, firstTime)}
                    </View>
                </View>
                <View style={{ flex: .1 }}>
                    <View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white', paddingBottom: 10, paddingHorizontal: 20 }}>
                        <TouchableOpacity style={{ borderWidth: 1, borderColor: 'lightgrey', borderRadius: 5, paddingVertical: 10 }} onPress={changeBill}>
                            <Text style={{ fontWeight: '600', textAlign: 'center', color: Colors.secondaryColor }}>{billStatus == 'UPDATE' ? 'Update' : 'Create'}</Text>
                        </TouchableOpacity>
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
        height: '100%',
        paddingTop: 15,
        backgroundColor: Colors.primaryColor,
    },
});

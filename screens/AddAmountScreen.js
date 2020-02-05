import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { updateBill } from '../features/bills/billsSaga'
import { useDispatch, useSelector } from 'react-redux';
import { addBill } from '../features/bills/billsSaga'
import Dinero from 'dinero.js'
import { getBillAmountFromServerWithCallback } from '../features/bills/billsSaga'
import billsSlice from '../features/bills/billsSlice'
import Colors from '../constants/Colors'
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
    return (
        <View style={{ flex: 1 / 3, alignItems: 'center', justifyContent: 'center', padding: .5, backgroundColor: 'silver' }}>
            <TouchableOpacity style={{ backgroundColor: 'grey', width: '100%', height: '100%', justifyContent: 'center' }} onPress={() => buttonPressed(krw, setKrw, text, setFirstTime, firstTime)}>
                <Text style={{ textAlign: 'center', fontSize: 35, color: 'white' }}>{text}</Text>
            </TouchableOpacity>
        </View >
    )
}
export default function AddAmountScreen({ navigation }) {
    const [myr, setMyr] = useState('0.00')
    const [billDetail, setBillDetail] = useState({})
    const [billStatus, setBillStatus] = useState('UPDATE')
    const [firstTime, setFirstTime] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const changeBill = () => {
        if (!isLoading) {
            const billStatus = navigation.getParam('billStatus', 'NO-ID')
            const floatAmount = (parseFloat(myr) * 100).toFixed(0)
            const amount = Dinero({ amount: parseInt(floatAmount), currency: 'MYR' }).getAmount()
            const newBill = { ...billDetail, amount: amount }
            if (billStatus == 'UPDATE') {
                dispatch(updateBill({ bill: newBill, billCreated }))
            } else {
                dispatch(addBill({ bill: newBill, billCreated }))
            }
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
        const result = window.confirm("Are you sure you want to delete this bill?");
        if (result) {
            dispatch(billsAction.removeBill({ billId: billDetail.id }))
            navigation.goBack()

        }
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', backgroundColor: Colors.primaryColor, paddingTop: 15 }}>

            <View>
                <Text style={{ color: 'white', fontSize: 16, padding: 10, fontWeight: 'bold' }}>Set Amount</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20, borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: billStatus != "UPDATE" ? .5 : 1 / 3 }}>
                        <TouchableOpacity style={{ padding: 5, paddingLeft: 0 }} onPress={backButtonPressed}>
                            <Text style={{ paddingLeft: 20, color: Colors.primaryColor, textAlign: 'left' }}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    {billStatus === 'UPDATE' &&
                        <View style={{ flex: 1 / 3 }}>
                            <TouchableOpacity style={{ padding: 5, paddingLeft: 0 }} onPress={deleteButtonPressed}>
                                <Text style={{ paddingLeft: 20, color: 'red', textAlign: 'center' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>}

                    <View style={{ flex: billStatus != "UPDATE" ? .5 : 1 / 3, paddingRight: 20 }}>
                        <TouchableOpacity style={{ padding: 5, paddingRight: 0 }} onPress={changeBill}>
                            <Text style={{ color: Colors.primaryColor, textAlign: 'right' }}>{billStatus == 'UPDATE' ? 'Update' : 'Create'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 10, flex: 1 }}>

                    <View style={{ flex: .1, backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 20 }}>{billDetail.companyName}</Text>
                        <Text style={{ fontSize: 16 }}>{billDetail.ref1}{billDetail.ref2 != '' && ` (${billDetail.ref2})`}</Text>
                    </View>
                    <View style={{ flex: .2, backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 20 }}>
                        {
                            isLoading ?
                                <ActivityIndicator size='large' color={Colors.primaryColor} /> :
                                <Text style={{ fontSize: 60, textAlign: 'right' }}>RM{myr}</Text>
                        }
                    </View>

                    <View style={{ flex: .7, justifyContent: 'flex-end' }}>
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
                </View>
            </View>
        </ScrollView >
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

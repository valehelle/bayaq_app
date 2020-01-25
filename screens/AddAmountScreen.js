import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { updateBill } from '../features/bills/billsSaga'
import { useDispatch, useSelector } from 'react-redux';


const buttonPressed = (myr, setMyr, text) => {
    if (text == 'del') {
        const amount = myr.includes(".") ? myr : `${myr}.`
        setMyr(amount)
    } else if (text == 'clr') {
        setMyr(`0`)
    } else {
        const amount = myr == 0 ? text : `${myr}${text}`
        setMyr(amount)
    }

}
const _button = (text, krw, setKrw) => {
    return (
        <View style={{ flex: 1 / 3, alignItems: 'center', justifyContent: 'center', }}>
            <TouchableOpacity style={{ backgroundColor: '#C6676E', borderRadius: 100 / 2, width: 70, height: 70, alignItems: 'center', justifyContent: 'center', }} onPress={() => buttonPressed(krw, setKrw, text)}>
                <Text style={{ textAlign: 'center', fontSize: 35, color: 'white' }}>{text}</Text>
            </TouchableOpacity>
        </View >
    )
}
export default function AddAmountScreen({ navigation }) {
    const [myr, setMyr] = useState(0)
    const [billDetail, setBillDetail] = useState({})
    const dispatch = useDispatch()
    const changeBill = () => {
        const newBill = { ...billDetail, amount: parseFloat(myr) }
        dispatch(updateBill({ bill: newBill, billCreated }))
    }
    useEffect(() => {
        const billDetail = navigation.getParam('bill', 'NO-ID')
        setBillDetail(billDetail)
    }, [])
    const billCreated = () => {
        navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: .1, backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 60, textAlign: 'right' }}>{myr}<Text style={{ fontSize: 12 }}>MYR</Text></Text>
            </View>
            <View style={{ flex: .8, backgroundColor: '#CD2E3A', justifyContent: 'center' }}>
                <View style={{ flex: .2, flexDirection: 'row' }}>
                    {_button(1, myr, setMyr)}
                    {_button(2, myr, setMyr)}
                    {_button(3, myr, setMyr)}
                </View>
                <View style={{ flex: .2, flexDirection: 'row' }}>
                    {_button(4, myr, setMyr)}
                    {_button(5, myr, setMyr)}
                    {_button(6, myr, setMyr)}
                </View>
                <View style={{ flex: .2, flexDirection: 'row' }}>
                    {_button(7, myr, setMyr)}
                    {_button(8, myr, setMyr)}
                    {_button(9, myr, setMyr)}
                </View>
                <View style={{ flex: .2, flexDirection: 'row' }}>
                    {_button('clr', myr, setMyr)}
                    {_button(0, myr, setMyr)}
                    {_button('.', myr, setMyr)}
                </View>
            </View>
            <View style={{ flex: .1 }}>
                <Text>{billDetail.amount}</Text>
                <TouchableOpacity onPress={changeBill}><Text>Submit</Text></TouchableOpacity>
            </View>
        </View>
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
        backgroundColor: '#fff',
    },
});

import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity as TouchableOpacityHandler } from 'react-native-gesture-handler'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import billsSlice, { isBillLoadingSelector, billsSelector, totalBillsAmountSelector, selectedBillsSelector, isSuccessBillSelector } from '../features/bills/billsSlice'
import { invoiceSelector } from '../features/invoices/invoiceSlice'
import { fetchInvoice } from '../features/invoices/invoiceSaga'
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import userSlice, { userInfoSelector } from '../features/accounts/userSlice'
import { useNavigation, useRoute } from '@react-navigation/native';
import { getBill, getBillAmount } from '../features/bills/billsSaga'
import { getUserInfo } from '../features/accounts/userSaga'
const billsAction = billsSlice.actions
const userAction = userSlice.actions
import Dinero from 'dinero.js'
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { banks } from '../constants/Banks'
var moment = require('moment');
const screenWidth = Math.round(Dimensions.get('window').width);
import Modal from 'react-native-modal';
import { electricity, water, telco, other } from '../constants/Bills'
import * as Animatable from 'react-native-animatable';

const toFormatSafe = (d) => {
  const [units, subunits] = d
    .toRoundedUnit(2)
    .toString()
    .split(".");
  const stringified = subunits
    ? [units, subunits.padEnd(2, "0")].join(".")
    : [units, "00"].join(".");

  return `${stringified}`;
}


const BillList = () => {
  const dispatch = useDispatch()
  const bills = useSelector(state => billsSelector(state))
  const userInfo = useSelector(state => userInfoSelector(state))
  const amount = useSelector(state => totalBillsAmountSelector(state))
  const selectedBills = useSelector(state => selectedBillsSelector(state))
  const loading = useSelector(state => isBillLoadingSelector(state))
  const navigation = useNavigation();
  const isBillSelected = (id) => {
    return selectedBills.filter((bill) => bill.id == id).length > 0 ? true : false
  }

  const isBillLoading = (id) => {
    return bills.find((bill) => bill.id == id).loading
  }

  const billPressed = (bill) => {
    const newBill = { ...bill, amount: Dinero({ amount: bill.amount }).toFormat("0.00") }
    navigation.navigate('AddAmount', { bill: newBill, billStatus: 'UPDATE' })
  }
  const payBillsPressed = () => {
    if (selectedBills.length >= 1) {
      if (true) {
        const allBillsFinishedLoading = bills.find((bill) => bill.loading === true)
        if (allBillsFinishedLoading == undefined) {

          navigation.navigate('Checkout', { selectedBills: selectedBills })

        } else {
          alert('Please wait until all bills finish getting the latest data.')
        }

      } else {
        alert('For now we only allow payment up to RM500.')
      }
    } else {
      alert('You need to pay a minimum of 1 bills.')
    }

  }

  useEffect(() => {
    if (userInfo.token != '') {
      dispatch(billsAction.getBill({ isAdd: false }))
    }


  }, [userInfo.token])

  const billCheckPressed = (bill) => {
    if (bill.amount > 0) {
      isBillSelected(bill.id) ? dispatch(billsAction.removeSelectedBills({ bill })) : dispatch(billsAction.setSelectedBills({ bill }))

    } else {
      alert('Please add the amount to the bill.')
    }
  }



  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingLeft: 20, paddingTop: 90 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'grey' }}>Bills</Text>
        <View style={{ marginTop: 10, flex: 1 }}>
          {loading ?
            <View style={{ height: '70%', justifyContent: 'center' }}>
              <ActivityIndicator size={25} color={Colors.secondaryColor} style={{ paddingTop: 20, paddingBottom: 10 }} />
              <Text style={{ textAlign: 'center' }}>Getting your bills.</Text>
            </View>
            :
            <ScrollView showsVerticalScrollIndicator={false} style={{}}>
              {
                bills.length > 0 ? bills.map((bill, index) => {
                  return (
                    <Animatable.View animation="fadeInUp" key={bill.id} delay={index * 150}>
                      <View style={{ flexDirection: 'row' }}  >
                        <TouchableOpacity style={{ flex: .1, justifyContent: 'center', }} onPress={() => billCheckPressed(bill)}>
                          {isBillLoading(bill.id) ? <ActivityIndicator size={31} color={Colors.secondaryColor} /> : isBillSelected(bill.id) ? <MaterialCommunityIcons style={{}} name="checkbox-marked-circle" color={isBillSelected(bill.id) ? Colors.secondaryColor : "lightgrey"} size={31} /> : <MaterialCommunityIcons name="checkbox-blank-circle-outline" color={Colors.secondaryColor} size={31} />}
                        </TouchableOpacity>

                        <View style={{
                          flex: .9, backgroundColor: 'white',


                          marginTop: 10,
                          paddingLeft: 10
                        }}>
                          <View style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderBottomColor: 'lightgrey',
                            paddingBottom: 5,
                          }}>

                            <View style={{ flex: .4, flexGrow: 1 }}>

                              <Text style={{ fontSize: 16, fontWeight: '600', color: isBillSelected(bill.id) ? 'black' : "black" }}>{bill.companyName}</Text>
                              <Text style={{ paddingVertical: 5, fontSize: 14, color: isBillSelected(bill.id) ? 'black' : "black" }}>{bill.ref1}{bill.ref2 != null && ` (${bill.ref2})`}</Text>

                            </View>

                            <View style={{ flex: .6, }}>
                              <Text style={{ paddingRight: 20, fontSize: 16, fontWeight: 'bold', textAlign: 'right', color: isBillSelected(bill.id) ? 'black' : "black" }}>RM {toFormatSafe(Dinero({ amount: bill.amount }))}</Text>
                              <TouchableOpacity style={{ paddingRight: 20, paddingVertical: 5 }} onPress={() => !isBillLoading(bill.id) && billPressed(bill)} >
                                <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'right', color: isBillSelected(bill.id) ? Colors.secondaryColor : Colors.secondaryColor }}>Edit</Text>

                              </TouchableOpacity>

                            </View>
                          </View>

                        </View>
                      </View>
                    </Animatable.View>
                  )
                })
                  : <View style={{ paddingVertical: 10, minHeight: 150, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14 }}>You don't have any bills yet.</Text>
                    <Text style={{ fontSize: 14, marginTop: 10 }}>Click <Text style={{ fontWeight: 'bold' }}>+</Text> button to add your bill.</Text>
                  </View>
              }
              <View style={{ height: 100 }} />
            </ScrollView>
          }
        </View>

        <View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white', paddingBottom: 10, paddingRight: 20, }}>
          <Text style={{ fontWeight: '600', fontSize: 20, textAlign: 'right' }}>Total RM {toFormatSafe(Dinero({ amount: amount }))}</Text>
          <TouchableOpacity onPress={payBillsPressed} style={{ paddingHorizontal: 10, backgroundColor: Colors.secondaryColor, borderRadius: 5, paddingVertical: 10, marginTop: 5 }}>
            <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center', fontSize: 20 }}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  )
}





function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const shortName = (name) => {
  const firstName = name.split(" ")[0]
  if (firstName != "") {
    return `Hello ${capitalizeFirstLetter(firstName)}`
  } else {
    return ""
  }

}
const billList = [
  {
    title: 'Water',
    bills: water,
    image: require('../assets/images/water.png'),
    icon: <Feather name="droplet" size={40} color="white" style={{ alignSelf: 'center' }} />
  },
  {
    title: 'Electricity',
    bills: electricity,
    image: require('../assets/images/electricity.png'),
    icon: <SimpleLineIcons name="energy" size={40} color="white" style={{ alignSelf: 'center' }} />
  },
  {
    title: 'Telco',
    bills: telco,
    image: require('../assets/images/telco.png'),
    icon: <Feather name="phone" size={40} color="white" style={{ alignSelf: 'center' }} />
  },
  {
    title: 'Other',
    bills: other,
    image: require('../assets/images/others.png'),
    icon: <Feather name="wifi" size={40} color="white" style={{ alignSelf: 'center' }} />
  },
]
export default function HomeScreen() {
  const dispatch = useDispatch()
  const [selectedTab, setSelectedTab] = useState('Home')
  const userInfo = useSelector(state => userInfoSelector(state))

  const isSuccess = useSelector(state => isSuccessBillSelector(state))
  const [isPayment, setIsPayment] = useState(false)
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false)
  const [referrenceID, setReferrenceID] = useState('')

  const navigation = useNavigation();

  const addBillPressed = ({ bills, title, image }) => {
    navigation.navigate('SelectBill', { bills, title, image })
  }
  const router = useRoute()
  useEffect(() => {
    if (router.params) {
      const { isPayment, paymentSuccess, referrenceID } = router.params
      setIsPayment(isPayment)
      setIsPaymentSuccess(paymentSuccess)
      setReferrenceID(referrenceID)
    }
  }, [router.params])

  useEffect(() => {
    dispatch(getUserInfo())
    isSuccess && setSelectedTab('Invoice')

  }, [])

  const viewReceiptPressed = () => {
    setIsPayment(false)
    navigation.navigate("Receipt")
  }
  const cancelPressed = () => {
    setIsPayment(false)
  }

  const bank = banks.find((bank) => bank.code == userInfo.profile.bankCode)
  const amount = useSelector(state => totalBillsAmountSelector(state))
  const selectedBills = useSelector(state => selectedBillsSelector(state))

  return (
    <View style={{ flex: 1, backgroundColor: Colors.headerColor }}>
      <ImageBackground resizeMode="cover" source={require('../assets/images/main.png')} style={{ flex: .4 }}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.3)', paddingTop: Constants.statusBarHeight }}>

          <View style={{ height: '100%', justifyContent: 'center', marginTop: 20 }}>
            {userInfo.profile.name != "" && <Animatable.Text animation="fadeInDown" style={{ marginBottom: 70, height: 100, width: '100%', color: 'white', fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>{shortName(userInfo.profile.name)}</Animatable.Text>}
          </View>
        </View>
      </ImageBackground>
      <View style={{ flex: .8, backgroundColor: 'white' }}>
        <BillList />
        <View style={{ position: 'absolute', top: -75, height: 150 }}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ height: '100%' }} contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10 }}>
            {
              billList.map((bill, index) => (
                <Animatable.View animation="slideInRight" key={bill.title} delay={index * 150}>
                  <BillCard onPress={() => addBillPressed({ bills: bill.bills, title: bill.title, image: bill.image })} icon={bill.icon} title={bill.title} />
                </Animatable.View>
              ))
            }

          </ScrollView>
        </View>
      </View>
      <Modal isVisible={isPayment} backdropOpacity={.3}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ backgroundColor: 'white', borderRadius: 5, padding: 20, minHeight: 300 }}>
            <TouchableOpacity onPress={cancelPressed}>
              <MaterialIcons name="cancel" size={30} color="black" style={{ alignSelf: 'flex-end' }} />
            </TouchableOpacity>
            {isPaymentSuccess ?
              <>
                <MaterialCommunityIcons name="checkbox-marked-circle" size={100} color="green" style={{ alignSelf: 'center' }} />
                <Text style={{ textAlign: 'center', fontSize: 30, marginTop: 10 }}>RM {toFormatSafe(Dinero({ amount: amount + (selectedBills.length * 99) }))}</Text>
                <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 10 }}>Your payment is complete!</Text>
                <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 30 }}>Referrence ID:</Text>
                <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 5, marginBottom: 20 }}>{referrenceID}</Text>
                <TouchableOpacity onPress={viewReceiptPressed} style={{ paddingHorizontal: 10, backgroundColor: Colors.secondaryColor, borderRadius: 5, paddingVertical: 10, marginTop: 5 }}>
                  <Text style={{ color: 'white', textAlign: 'center' }}>View receipt</Text>
                </TouchableOpacity>
              </>
              :
              <>
                <MaterialCommunityIcons name="cancel" size={100} color="red" style={{ alignSelf: 'center', marginTop: 30 }} />
                <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 10 }}>You payment was unsuccessfull.</Text>
              </>
            }

          </View>

        </View>
      </Modal>
    </View >
  );
}

const BillCard = ({ first, last, icon, title, onPress }) => {
  return (
    <TouchableOpacityHandler activeOpacity={.5} onPress={onPress} style={{ paddingHorizontal: 10, width: screenWidth / 3.5 }}>
      <View style={{ backgroundColor: Colors.secondaryColor, borderRadius: 10, height: '100%', justifyContent: 'center' }}>
        <View style={{ height: 40 }}>
          {icon}
        </View>
        <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', marginTop: 10 }}>{title}</Text>
        <MaterialIcons name="add" size={30} color="white" style={{ alignSelf: 'center', marginTop: 10 }} />
      </View>
    </TouchableOpacityHandler>
  )
}

HomeScreen.navigationOptions = {
  header: null,
};
HomeScreen.path = ''

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.headerColor,
  },
});

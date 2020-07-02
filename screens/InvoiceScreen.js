import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Colors from '../constants/Colors'
import { useSelector, useDispatch } from 'react-redux'
import userSlice, { userInfoSelector } from '../features/accounts/userSlice'
import invoiceSlice, { invoiceSelector, isFetchingInvoiceSelector } from '../features/invoices/invoiceSlice'
const invoiceActions = invoiceSlice.actions
import Dinero from 'dinero.js'
var moment = require('moment');

import Constants from 'expo-constants';


const InvoiceList = ({ navigation }) => {
  const dispatch = useDispatch()
  const userInfo = useSelector(state => userInfoSelector(state))
  const invoices = useSelector(state => invoiceSelector(state))
  const isFetchingInvoice = useSelector(state => isFetchingInvoiceSelector(state))


  useEffect(() => {
    if (userInfo.token != '') {
      dispatch(invoiceActions.fetchInvoice())
    }


  }, [userInfo.token])
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
  return (
    <View style={{ backgroundColor: 'white' }}>
      <View>
        {isFetchingInvoice ?

          <View style={{ height: '100%', justifyContent: 'center', alignContent: 'center' }}>
            <ActivityIndicator size='large' color={Colors.secondaryColor} />
          </View>

          :


          <ScrollView>
            {invoices.length > 0 && invoices.map((invoice) => {
              return (
                <View key={invoice.ref_id} style={{ marginTop: 10, paddingBottom: 10, paddingHorizontal: 20 }}>

                  <Text style={{ fontSize: 14, fontWeight: '600' }}>Date  <Text style={{ color: 'grey' }}>{moment.utc(invoice.paid_at).local().format('LLLL')}</Text></Text>
                  <View style={{ flexDirection: 'row', backgroundColor: Colors.secondaryColor, borderRadius: 5, paddingVertical: 10, paddingLeft: 10, paddingRight: 10, marginTop: 5 }}>
                    <View style={{ flex: .3, borderRightWidth: 1, borderRightColor: 'white' }}>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: 'white', paddingLeft: 5 }}>Transaction Number: {invoice.ref_id}</Text>

                    </View>


                    <View style={{ flex: .7 }}>

                      {invoice.bills.map((bill) => {
                        return (
                          <View key={bill.id} style={{ paddingLeft: 10, marginBottom: 1 }}>
                            <View style={{ flexDirection: 'row' }}>
                              <Text style={{ color: 'white', fontSize: 14, fontWeight: '600', flex: .6, }}>{bill.company_name}</Text>
                              <Text style={{ color: 'white', fontSize: 14, textAlign: 'right', flex: .4, justifyContent: 'flex-end', alignSelf: 'flex-end' }}>RM{toFormatSafe(Dinero({ amount: bill.amount }))}</Text>

                            </View>
                            <Text style={{ color: 'white', fontSize: 12 }}>{bill.ref1}</Text>
                            <Text style={{ color: 'white', fontSize: 12 }}>{bill.ref2}</Text>

                          </View>
                        )
                      })}
                      <Text style={{ color: 'white', fontSize: 12, textAlign: 'right', marginTop: 10 }}>Service Fee: RM {toFormatSafe(Dinero({ amount: invoice.service_charge }))}</Text>
                      <Text style={{ color: 'white', fontSize: 14, fontWeight: '600', textAlign: 'right', marginTop: 5 }}>Total: RM {toFormatSafe(Dinero({ amount: invoice.amount }))}</Text>
                    </View>
                  </View>
                </View>
              )
            })
            }
          </ScrollView>
        }

      </View>
    </View >
  )
}



export default function InvoiceScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.headerColor }}>
      <View style={{ flex: .4, paddingTop: Constants.statusBarHeight, }}>
        <View style={{ flex: 1 }}>
          <View style={{ height: '100%' }}>
            <Text style={{ marginTop: 60, width: '100%', color: 'white', fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>Receipts</Text>

          </View>
        </View>
      </View>
      <View style={{ flex: .8, backgroundColor: 'white' }}>
        <InvoiceList />
      </View>
    </View >
  );
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: Colors.primaryColor,
  },
});



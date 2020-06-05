import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView
} from 'react-native';
import Colors from '../constants/Colors'
import { invoiceSelector } from '../features/invoices/invoiceSlice'
import { fetchInvoice } from '../features/invoices/invoiceSaga'
import { useSelector, useDispatch } from 'react-redux'
import userSlice, { userInfoSelector } from '../features/accounts/userSlice'
import Dinero from 'dinero.js'

var moment = require('moment');

const userAction = userSlice.actions
import Constants from 'expo-constants';


const InvoiceList = ({ navigation }) => {
  const dispatch = useDispatch()
  const userInfo = useSelector(state => userInfoSelector(state))
  const invoices = useSelector(state => invoiceSelector(state))

  useEffect(() => {
    if (userInfo.token != '') {
      dispatch(fetchInvoice())
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
      <View style={{ paddingBottom: 10 }}>
        <ScrollView>
          {invoices.length > 0 && invoices.map((invoice) => {
            return (
              <View key={invoice.ref_id} style={{ flexGrow: 1, marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey', paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 14, fontWeight: '600' }}>Reference ID: {invoice.ref_id}</Text>
                <Text style={{ fontSize: 14, fontWeight: '600' }}>Paid At: {moment.utc(invoice.paid_at).local().format('LLLL')}</Text>

                {invoice.bills.map((bill) => {
                  return (
                    <View key={bill.id} style={{ paddingLeft: 10, marginTop: 5 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', flex: .6 }}>{bill.company_name}</Text>
                        <Text style={{ fontSize: 12, textAlign: 'right', flex: .4 }}>RM{toFormatSafe(Dinero({ amount: bill.amount }))}</Text>

                      </View>
                      <Text style={{ fontSize: 14 }}>{bill.ref1}{bill.ref2 != null && ` (${bill.ref2})`}</Text>
                    </View>
                  )
                })}
                <Text style={{ fontSize: 12, color: 'grey', textAlign: 'right', marginTop: 10 }}>Service Fee: RM {toFormatSafe(Dinero({ amount: invoice.bills.length * 50 }))}</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', textAlign: 'right', marginTop: 5 }}>Total: RM {toFormatSafe(Dinero({ amount: invoice.amount }))}</Text>

              </View>
            )
          })
          }
        </ScrollView>
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



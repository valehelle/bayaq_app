import { createSlice, createSelector } from '@reduxjs/toolkit'

export const billsSelector = createSelector(
    state => state.bills,
    bills => bills.list
)

export const selectedBillsSelector = createSelector(
    state => state.bills,
    bills => bills.selectedBills
)

export const totalBillsAmountSelector = createSelector(
    state => state.bills,
    bills => bills.selectedBills.reduce(reducer, 0)
)

export const isSuccessBillSelector = createSelector(
    state => state.bills,
    bills => bills.success
)


const reducer = (accumulator, bill) => accumulator + bill.amount;


const billsSlice = createSlice({
    name: 'bills',
    initialState: {
        list: [],
        selectedBills: [],
        success: false,
    },
    reducers: {
        setIsSuccess: {
            reducer(state, action) {
                state.success = action.payload.isSuccess
            }
        },
        addBill: {
            reducer(state, action) {
                const bill = action.payload
                const list = state.list
                list.push(bill)
                state.selectedBills = list.filter((bill) => bill.amount > 0)

            }
        },
        setBill: {
            reducer(state, action) {
                const bills = action.payload
                state.list = bills
                state.selectedBills = bills.filter((bill) => bill.amount > 0)
            }
        },
        updateBill: {
            reducer(state, action) {
                const newBill = action.payload
                const billIndex = state.list.findIndex((bill) => bill.id == newBill.id)
                const list = state.list
                list[billIndex] = newBill
                state.selectedBills = list.filter((bill) => bill.amount > 0)
            }
        },
        payBills: {
            reducer(state, action) {
                state
            }
        },
        setSelectedBills: {
            reducer(state, action) {
                state.selectedBills = state.list.filter((bill) => bill.amount > 0)
            }
        },
        removeBill: {
            reducer(state, action) {
                const { billId } = action.payload
                state.selectedBills = state.list.filter((bill) => bill.id != billId)
                state.list = state.list.filter((bill) => bill.id != billId)
            }
        }
    }
})



export default billsSlice
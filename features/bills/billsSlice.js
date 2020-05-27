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


export const isAutoUpdateSelector = createSelector(
    state => state.bills,
    bills => bills.autoUpdate
)

export const isBillLoadingSelector = createSelector(
    state => state.bills,
    bills => bills.loading
)


const reducer = (accumulator, bill) => accumulator + bill.amount;


const billsSlice = createSlice({
    name: 'bills',
    initialState: {
        list: [],
        selectedBills: [],
        success: false,
        autoUpdate: true,
        loading: true,
    },
    reducers: {
        setBillStatus: {
            reducer(state, action) {
                const { id, loading } = action.payload
                const bills = state.list
                state.list = bills.map((bill) => {
                    const newLoading = bill.id === id ? loading : bill.loading ? bill.loading : false
                    return { ...bill, loading: newLoading }
                }
                )

            }
        },
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
                state.list = state.list.filter((bill) => bill.id != billId)
                state.selectedBills = state.list.filter((bill) => bill.amount > 0)
            }
        },
        autoUpdate: {
            reducer(state, action) {
                state.autoUpdate = false
            }
        },
        getBill: {
            reducer(state, action) {
                state.loading = true
            }
        },
        getBillSuccess: {
            reducer(state, action) {
                state.loading = false
            }
        },
    }
})



export default billsSlice
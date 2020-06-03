import { createSlice, createSelector } from '@reduxjs/toolkit'

export const userInfoSelector = createSelector(
    state => state.user,
    user => user
)


const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: '',
        fullName: '',
        token: null,
        profile: {
            bankCode: 0,
            email: '',
            name: ''
        }
    },
    reducers: {
        addUserInfo: {
            reducer(state, action) {
                const { email, fullName } = action.payload
                state.email = email
                state.fullName = fullName
            }
        },
        setUserProfile: {
            reducer(state, action) {
                state.profile.email = action.payload.email
                state.profile.bankCode = action.payload.bank_code
                state.profile.name = action.payload.name

            }
        },
        setUserToken: {
            reducer(state, action) {
                const { token } = action.payload
                state.token = token
            }
        },
        userLogout: {
            reducer(state, action) {
                state.token = ''
            }
        },
        setUserBank: {
            reducer(state, action) {
                state.profile.bankCode = action.payload.bankCode
            }
        },
    }
})



export default userSlice
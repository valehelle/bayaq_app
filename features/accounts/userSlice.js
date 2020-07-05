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
        isRegister: false,
        isLogin: false,
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
                state.isRegister = true
            }
        },
        setUserProfile: {
            reducer(state, action) {
                state.profile.email = action.payload.email
                state.profile.bankCode = action.payload.bank_code
                state.profile.name = action.payload.name
                state.isLogin = false
            }
        },
        setUserToken: {
            reducer(state, action) {
                const { token } = action.payload
                state.token = token
                state.isRegister = false
                state.isLogin = false
            }
        },
        userLogin: {
            reducer(state, action) {
                state.isLogin = true
            }
        },
        userLoginFail: {
            reducer(state, action) {
                state.isLogin = false
            }
        },
        registerFail: {
            reducer(state, action) {
                state.isRegister = false
            }
        },
        userLogout: {
            reducer(state, action) {
                state.token = ''
                state.isLogin = false
            }
        },
        setUserBank: {
            reducer(state, action) {
                state.profile.bankCode = action.payload.bankCode
            }
        },
        resetPassword: {
            reducer(state, action) {
                state
            }
        },
    }
})



export default userSlice
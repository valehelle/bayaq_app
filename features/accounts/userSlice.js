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
        token: '',
        profile: {
            bank_code: 0,
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
                state.profile = action.payload
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
                state.token = ""
            }
        }
    }
})



export default userSlice
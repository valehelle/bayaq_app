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
        token: ''
    },
    reducers: {
        addUserInfo: {
            reducer(state, action) {
                const { email, fullName } = action.payload
                state.email = email
                state.fullName = fullName
            }
        },
        setUserToken: {
            reducer(state, action) {
                const { token } = action.payload
                state.token = token
            }
        }
    }
})



export default userSlice
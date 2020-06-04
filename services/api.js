//const BASE_URL = 'http://localhost:3000'
const BASE_URL = 'https://boiling-island-04628.herokuapp.com'

const getUrl = (path) => {
    return BASE_URL + path
}
const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

const fetchRequest = (path, config) => {
    const url = getUrl(path)
    return fetch(url, config).catch((error) => {
        return error
    });
}


export const payBill = (body, token) => {

    const path = '/pay_bills'
    const config = {
        method: 'POST',
        "headers": {
            'Authorization': `Bearer ${token}`,
            ...headers,
        },
        body: JSON.stringify({ ...body })
    }


    return fetchRequest(path, config)
}

export const wakeUp = () => {

    const path = '/wakeup'
    const config = {
        method: 'get',
        "headers": {
            ...headers,
        },
    }


    return fetchRequest(path, config)
}

export const getBillAmountAPI = (body) => {

    const path = `/bill/amount?billerCode=${body.billerCode}&account=${body.account}`
    const config = {
        method: 'GET',
        "headers": {
            ...headers,
        },
    }


    return fetchRequest(path, config)
}

export const registerAPI = (body) => {

    const path = `/users/sign_up`
    const config = {
        method: 'POST',
        "headers": {
            ...headers,
        },
        body: JSON.stringify({ ...body })
    }


    return fetchRequest(path, config)
}

export const loginAPI = (body) => {

    const path = `/users/sign_in`
    const config = {
        method: 'POST',
        "headers": {
            ...headers,
        },
        body: JSON.stringify({ ...body })
    }


    return fetchRequest(path, config)
}


export const createBillAPI = (body, token) => {

    const path = `/bills`
    const config = {
        method: 'POST',
        "headers": {
            'Authorization': `Bearer ${token}`,
            ...headers,
        },
        body: JSON.stringify({ ...body })
    }


    return fetchRequest(path, config)
}

export const deleteBillAPI = (body, token) => {

    const path = `/bills`
    const config = {
        method: 'DELETE',
        "headers": {
            'Authorization': `Bearer ${token}`,
            ...headers,
        },
        body: JSON.stringify({ ...body })
    }


    return fetchRequest(path, config)
}

export const updateBillAPI = (body, token) => {

    const path = `/bills`
    const config = {
        method: 'PUT',
        "headers": {
            'Authorization': `Bearer ${token}`,
            ...headers,
        },
        body: JSON.stringify({ ...body })
    }


    return fetchRequest(path, config)
}

export const getBillsAPI = (token) => {

    const path = `/bills`
    const config = {
        method: 'GET',
        "headers": {
            'Authorization': `Bearer ${token}`,
            ...headers,
        }
    }


    return fetchRequest(path, config)
}


export const getInvoicesAPI = (token) => {

    const path = `/invoice`
    const config = {
        method: 'GET',
        "headers": {
            'Authorization': `Bearer ${token}`,
            ...headers,
        }
    }


    return fetchRequest(path, config)
}

export const getUserProfile = ({ token }) => {
    const path = `/user`
    const config = {
        method: 'GET',
        "headers": {
            'Authorization': `Bearer ${token}`,
            ...headers,
        }
    }


    return fetchRequest(path, config)
}

export const setBankCode = (body, token) => {

    const path = `/user/bank`
    const config = {
        method: 'PUT',
        "headers": {
            'Authorization': `Bearer ${token}`,
            ...headers,
        },
        body: JSON.stringify({ ...body })

    }


    return fetchRequest(path, config)
}
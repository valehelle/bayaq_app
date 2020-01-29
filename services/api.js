const BASE_URL = 'http://localhost:3000'
//const BASE_URL = 'https://cmms.peinfra.com/cmms-staging/mobile/aduan'
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


export const payBill = (body) => {

    const path = '/pay_bills'
    const config = {
        method: 'POST',
        "headers": {
            ...headers,
        },
        body: JSON.stringify({ ...body })
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

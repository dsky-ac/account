const ERC20_ABI = require('./token.json')
const axios = require('axios')
const { ethers } = require('ethers')

const network = {
    '128': {
        label: 'Heco',
        value: '128',
        url: 'https://http-mainnet.hecochain.com'
    },
    '56': {
        label: 'BSC',
        value: '56',
        url: 'https://bsc-dataseed1.binance.org'
    },
}
async function getTvlList(chainId) {
    const res = await axios.get("https://info.mdex.one/pair/tvl?chain_id=" + chainId)
    let tvlLsit = {}
    res.data.result.map(item => {
        tvlLsit[item.address] = item
    })
    return tvlLsit
}
async function getTokenPriceList(chainId) {
    const token = await axios.get("https://info.mdex.one/pair/token/all?chain_id=" + chainId)
    const tokenPrice = await axios.get("https://info.mdex.one/pair/token/price?chain_id=" + chainId)
    const tvlList = await getTvlList(chainId)
    let tokensList = token.data.result.map(tokenItem => {
        tokenItem.tvl = 0
        tokenItem.addressArr.map((address) => {
            const tvl = Number(tvlList[address]?.tvl)
            if (tvl && tvl > 0) {
                tokenItem.tvl += tvl / 2
            }
        })
        tokenPrice.data.result.map((priceItem) => {
            if (tokenItem.tokenAddress === priceItem.tokenAddress) {
                tokenItem.price = priceItem.price ? Number(priceItem.price) : 0
            }
        })
        return {
            tokenAddress: tokenItem.tokenAddress,
            symbol: tokenItem.tokenSymbol,
            price: tokenItem.price,
            tvl: tokenItem.tvl,
        }
    })
    return tokensList
}
async function contractct(chainId, address, account) {
    const provider = new ethers.providers.JsonRpcProvider(network[chainId].url)
    const tokenContract = new ethers.Contract(address, ERC20_ABI, provider)
    const balance = await tokenContract.balanceOf(account)
    const decimal = await tokenContract.decimals();
    const tokenBalance = ethers.utils.formatUnits(balance, decimal)
    return Number(tokenBalance).toFixed(5)
}

// tokenAddress 代币地址
// 钱包地址
const account = {
    56: '0xcEA6D1c73733074eD2D3BdD32b9186B60D60E6f5',
    128: '0xbB663e54106F61923b30c321210a9ff816Be4495'
}

async function getTokenBalanceList(chainId) {
    let priceList = await getTokenPriceList(chainId)
    let accountToken = []
    console.log('触发', priceList.length, '网络' + chainId)
    // let list = priceList.slice(0,20)
    for (const item of priceList) {
        const tp = Number(item.price)
        const balance = await contractct(chainId, item.tokenAddress, account[chainId])
        if (balance > 0) {
            console.log('get ', item.tokenAddress)
            let usd = (balance * tp).toFixed(2)
            let value = Object.assign(item, { balance: balance, usd })
            accountToken.push(value)
        }
    }
    // 输出结果
    console.table(accountToken)
    return accountToken
}

// 获取lp
async function getLPBalanceList(chainId) {
    const res = await axios.get("https://info.mdex.one/pair/all?chain_id=" + chainId)
    let accountLP = []
    for (const item of res.data.result) {
        const address_price = 1
        const tvl = Number(item.tvl)
        const balance = await contractct(chainId, item.address, account[chainId])
        if (balance > 0) {
            let usd = (tvl / address_price) * balance
            let value = Object.assign(item, { price: address_price, balance: balance, usd })
            accountLP.push(value)
        }
    }
    console.table(accountLP)
    return accountLP
}

getTokenBalanceList(56)
// getLPBalanceList(56)

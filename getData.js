const axios = require('axios')
const { ethers } = require('ethers')
const fs = require('fs')
const network = {
    '128': {
        label: 'Heco',
        value: '128',
        url: 'http://rpc.mezz.fi/heco'
    },
    '56': {
        label: 'BSC',
        value: '56',
        url: 'https://bsc-dataseed1.binance.org'
    },
}
// 钱包地址
const account = {
    56: '0xcEA6D1c73733074eD2D3BdD32b9186B60D60E6f5',
    128: '0xbB663e54106F61923b30c321210a9ff816Be4495'
}

const FACTORY_ADDRESS = "0xb0b670fc1F7724119963018DB0BfA86aDb22d941"; //Factory 地址
const ROUTER_ADDRESS = "0x0f1c2D1FDD202768A4bDa7A38EB0377BD58d278E"; //Router 地址

// Factory 和 Pair 合约的 ABI
const FACTORY_ABI = [
    "function allPairsLength() external view returns (uint)",
    "function allPairs(uint) external view returns (address)"
];
const PAIR_ABI = [
    "function token0() external view returns (address)",
    "function token1() external view returns (address)",
    "function name() external view returns (string)",
    "function balanceOf(address owner) external view returns (uint256)",
    "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
    "function totalSupply() external view returns (uint256)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function nonces(address owner) external view returns (uint256)",
    "function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external"
];

const ERC20_ABI = [
    "function balanceOf(address owner) external view returns (uint256)",
    'function decimals() external view returns (uint8)'
];

const ROUTER_ABI = [
    "function removeLiquidity(address tokenA, address tokenB, uint liquidity, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB)",
    "function removeLiquidityWithPermit(address tokenA, address tokenB, uint liquidity, uint amountAMin, uint amountBMin, address to, uint deadline, bool approveMax, uint8 v, bytes32 r, bytes32 s) external returns (uint amountA, uint amountB)"
];

const provider = new ethers.providers.JsonRpcProvider(network[128].url);

async function getAllPairs(factoryAddress) {
    try {
        const factoryContract = new ethers.Contract(factoryAddress, FACTORY_ABI, provider);

        // 获取所有 Pair 的数量
        const pairCount = await factoryContract.allPairsLength();
        console.log(`Total Pairs: ${pairCount}`);

        const pairAddresses = [];
        for (let i = 0; i < pairCount; i++) {
            const pairAddress = await factoryContract.allPairs(i);
            pairAddresses.push(pairAddress);
            // console.log(`Pair ${i}: ${pairAddress}`);
        }
        console.log('getAllPairs success')
        return pairAddresses;
    } catch (error) {
        console.error("Error fetching pairs:", error);
        throw error;
    }
}
const allow = [
    '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd', //ETH
    '0x5ee41ab6edd38cdfb9f6b4e6cf7f75c87e170d98', //TUSD
    '0x9362bbef4b8313a8aa9f0c9808b80577aa26b73b', //USDC
    '0x66a79d23e58475d2738179ca52cd0b41d73f0bea', //HBTC
    '0xa71edc38d189767582c38a3145b5873052c3e47a', //USDT
    '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f', //WHT
]
const tokenPrice = {
    '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd': 0,
    '0x5ee41ab6edd38cdfb9f6b4e6cf7f75c87e170d98' : 1,
    '0x9362bbef4b8313a8aa9f0c9808b80577aa26b73b': 1,
    '0x66a79d23e58475d2738179ca52cd0b41d73f0bea': 0,
    '0xa71edc38d189767582c38a3145b5873052c3e47a': 1,
    '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f': 0
}
const tvlData = {}
async function main() {
    try {
        // 获取所有 Pair 地址
        const pairs = await getAllPairs(FACTORY_ADDRESS);
        const res = await axios.get('https://info.mdex.one/pair/token/price?chain_id=128')
        const ETH = res.data.result.find(item => item.tokenAddress === '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd');
        tokenPrice['0x64ff637fb478863b7468bc97d30a5bf3a428a1fd'] =  ETH.price
        const btc = res.data.result.find(item => item.tokenAddress === '0x66a79d23e58475d2738179ca52cd0b41d73f0bea');
        tokenPrice['0x66a79d23e58475d2738179ca52cd0b41d73f0bea'] =  btc.price
        const wht = res.data.result.find(item => item.tokenAddress === '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f');
        tokenPrice['0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f'] =  wht.price
        let index = 0
        for (const pairAddress of pairs) {
            const pairContract = new ethers.Contract(pairAddress, PAIR_ABI, provider);
            const token0 = await pairContract.token0();
            const token1 = await pairContract.token1();
            const userBalance = await pairContract.balanceOf(account[128]);
            console.log('start index', ++index)
            if(!allow.includes(token0) && !allow.includes(token1)) {
                continue
            }
            if(userBalance > 0) {
                const totalSupply = await pairContract.totalSupply();
                if(allow.includes(token0)) {
                    const tokenContract = new ethers.Contract(token0, ERC20_ABI, provider);
                    const decimals = await tokenContract.decimals(); 
                    const amountOutMin = await tokenContract.balanceOf(pairAddress)
                    const tokenAmount = ethers.utils.formatUnits(amountOutMin, decimals)
                    const totalTVL =  tokenAmount * tokenPrice[token0] * 2
                    const userTVL  = userBalance/totalSupply * totalTVL
                    if (userTVL > 0.5) {
                        tvlData[pairAddress] = userTVL
                        tvlData[pairAddress]['token0'] = token0
                        tvlData[pairAddress]['token1'] = token1
                    }
                } else {
                    const tokenContract = new ethers.Contract(token1, ERC20_ABI, provider);
                    const decimals = await tokenContract.decimals(); 
                    const amountOutMin = await tokenContract.balanceOf(pairAddress)
                    const tokenAmount = ethers.utils.formatUnits(amountOutMin, decimals)
                    const totalTVL =  tokenAmount * tokenPrice[token1] * 2
                    const userTVL  = userBalance/totalSupply * totalTVL
                    if (userTVL > 0.5) {
                        tvlData[pairAddress] = userTVL
                        tvlData[pairAddress]['token0'] = token0
                        tvlData[pairAddress]['token1'] = token1
                    }
                }
            }
            
        }
        fs.writeFileSync(`./data//hecoLP.json`, JSON.stringify(tvlData), 'utf-8')
    } catch (error) {
        console.error("Error in main:", error);
    }
}
main()
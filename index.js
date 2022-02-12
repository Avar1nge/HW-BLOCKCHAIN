var Tx = require("ethereumjs-tx").Transaction;
const Web3 = require('web3');

const web3 = new Web3('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');

const sendFrom = '0x890c9E24D565B75868a2810Ba7632f8e7Be53F32';
const sendTo = '0xc53D6C0148ddC28Efe623Ab3aD54da5C7779b25C';

const privateKey = Buffer.from('*priv-key*', 'hex');

web3.eth.getTransactionCount(sendFrom, (error, txCount) => {
    const txDTO = {
        nonce: web3.utils.toHex(txCount),
        from: sendFrom,
        to: sendTo,
        value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
        gasLimit: web3.utils.toHex(100000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        data: web3.utils.toHex('Parkhomchuk Oleksandr')
    };
    const tx = new Tx(txDTO, { chain: 'ropsten' });
    tx.sign(privateKey);

    const serializedTransaction = tx.serialize();
    const txHEX = '0x' + serializedTransaction.toString('hex');

    web3.eth.sendSignedTransaction(txHEX, (error, txHash) => {
        console.log('txHash:', txHash);
    })
})
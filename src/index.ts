import fs from "fs"
import {Readable} from "stream"

import nodes from "./nodes.json"
import apiConfig from "./apiconfig.json"
import { SingleNode } from "./singleNode"

const jsoncsv = require("json-csv")

function getPort(node: any) {
    if (node.port) return node.port

    if (node.protocol === 'http') {
        return '10332'
    }
    return  '10331'
}

const requests = nodes.map(async node => {
    const protocol = node.protocol || 'http'
    const port = getPort(node)

    const url = `${protocol}://${node.url}:${port}`
    console.log(`
    --------------------- Requesting ${url} ---------------------
    `)

    const singleNode = new SingleNode(url)

    const claimgas = await singleNode.claimGas()
    const getaccountstate = await singleNode.getAccountState()
    const dumpprivatekey = await singleNode.dumpPrivateKey()
    const getapplicationlog = await singleNode.getApplicationLog()
    const getassetstate = await singleNode.getAssetState()
    const listplugins = await singleNode.listPlugins()
    const getbestblockhash = await singleNode.getBestBlockHash()
    const getbalance = await singleNode.getBalance()
    const getblock = await singleNode.getBlock()
    const getblockcount = await singleNode.getBlockCount()
    const getblockhash = await singleNode.getBlockHash()
    const getblockheader = await singleNode.getBlockHeader()
    const getblocksysfee = await singleNode.getBlockSysFee()
    const getclaimable = await singleNode.getClaimable()
    const getconnectioncount = await singleNode.getConnectionCount()
    const getcontractstate = await singleNode.getContractState()
    const getmetricblocktimestamp = await singleNode.getMetricBlockTimestamp()
    const getnep5balances = await singleNode.getNEP5Balances()
    const getnep5transfers = await singleNode.getNEP5Transfers()
    const getnewaddress = await singleNode.getNewAddress()
    const getrawmempool = await singleNode.getRawMemPool()
    const getrawtransaction = await singleNode.getRawTransaction()
    const getstorage = await singleNode.getStorage()
    const gettransactionheight = await singleNode.getTransactionHeight()
    const gettxout = await singleNode.getTxOut()
    const getpeers = await singleNode.getPeers()
    const getunspents = await singleNode.getUnspents()
    const getversion = await singleNode.getVersion()
    const getvalidators = await singleNode.getValidators()
    const getwalletheight = await singleNode.getWalletHeight()
    const importprivatekey = await singleNode.importPrivateKey()
    const invokefunction = await singleNode.invokeFunction()
    const invokescript = await singleNode.invokeScript()
    const listaddress = await singleNode.listAddress()
    const sendrawtransaction = await singleNode.sendRawTransaction()
    const sendfrom = await singleNode.sendFrom()
    const sendtoaddress = await singleNode.sendToAddress()
    const sendmany = await singleNode.sendMany()
    const submitblock = await singleNode.submitBlock()
    const validateaddress = await singleNode.validateAddress()

    return {
        url,
        api: {
            claimgas,
            getaccountstate,
            getapplicationlog,
            dumpprivatekey,
            getassetstate,
            listplugins,
            getbestblockhash,
            getbalance,
            getblock,
            getblockcount,
            getblockhash,
            getblockheader,
            getblocksysfee,
            getclaimable,
            getconnectioncount,
            getcontractstate,
            getmetricblocktimestamp,
            getnep5balances,
            getnep5transfers,
            getnewaddress,
            getrawmempool,
            getrawtransaction,
            getstorage,
            gettransactionheight,
            gettxout,
            getpeers,
            getunspents,
            getversion,
            getvalidators,
            getwalletheight,
            importprivatekey,
            invokefunction,
            invokescript,
            listaddress,
            sendrawtransaction,
            sendfrom,
            sendtoaddress,
            sendmany,
            submitblock,
            validateaddress
        }
    }
})

Promise.all(requests).then(async finishedRequests => {
    const options = {
        fields: [
            {name: 'url', label: 'node'},
            {name: 'api.claimgas.status', label: 'claimgas'},
            {name: 'api.dumpprivatekey.status', label: 'dumpprivatekey'},
            {name: 'api.getaccountstate.status', label: 'getaccountstate'},
            {name: 'api.getapplicationlog.status', label: 'getapplicationlog'},
            {name: 'api.getassetstate.status', label: 'getassetstate'},
            {name: 'api.listplugins.status', label: 'listplugins'},
            {name: 'api.getbestblockhash.status', label: 'getbestblockhash'},
            {name: 'api.getbalance.status', label: 'getbalance'},
            {name: 'api.getblock.status', label: 'getblock'},
            {name: 'api.getblockcount.status', label: 'getblockcount'},
            {name: 'api.getblockhash.status', label: 'getblockhash'},
            {name: 'api.getblockheader.status', label: 'getblockheader'},
            {name: 'api.getblocksysfee.status', label: 'getblocksysfee'},
            {name: 'api.getclaimable.status', label: 'getclaimable'},
            {name: 'api.getconnectioncount.status', label: 'getconnectioncount'},
            {name: 'api.getcontractstate.status', label: 'getcontractstate'},
            {name: 'api.getmetricblocktimestamp.status', label: 'getmetricblocktimestamp'},
            {name: 'api.getnep5balances.status', label: 'getnep5balances'},
            {name: 'api.getnep5transfers.status', label: 'getnep5transfers'},
            {name: 'api.getnewaddress.status', label: 'getnewaddress'},
            {name: 'api.getrawmempool.status', label: 'getrawmempool'},
            {name: 'api.getrawtransaction.status', label: 'getrawtransaction'},
            {name: 'api.getstorage.status', label: 'getstorage'},
            {name: 'api.gettransactionheight.status', label: 'gettransactionheight'},
            {name: 'api.gettxout.status', label: 'gettxout'},
            {name: 'api.getpeers.status', label: 'getpeers'},
            {name: 'api.getunspents.status', label: 'getunspents'},
            {name: 'api.getversion.status', label: 'getversion'},
            {name: 'api.getvalidators.status', label: 'getvalidators'},
            {name: 'api.getwalletheight.status', label: 'getwalletheight'},
            {name: 'api.importprivatekey.status', label: 'importprivatekey'},
            {name: 'api.invokefunction.status', label: 'invokefunction'},
            {name: 'api.invokescript.status', label: 'invokescript'},
            {name: 'api.listaddress.status', label: 'listaddress'},
            {name: 'api.sendrawtransaction.status', label: 'sendrawtransaction'},
            {name: 'api.sendfrom.status', label: 'sendfrom'},
            {name: 'api.sendtoaddress.status', label: 'sendtoaddress'},
            {name: 'api.sendmany.status', label: 'sendmany'},
            {name: 'api.submitblock.status', label: 'submitblock'},
            {name: 'api.validateaddress.status', label: 'validateaddress'}
        ]
    }

    console.log(finishedRequests)

    const out = fs.createWriteStream("output.csv")

    const readable = Readable.from(finishedRequests)
    readable
        .pipe(jsoncsv.stream(options))
        .pipe(out)
})

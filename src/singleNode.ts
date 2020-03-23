import { MatrixRPC } from "./matricRpc"
import {sc} from "@cityofzion/neon-core";

function singleNodeResponse(status: boolean | string, response?: any) {
    return { status, response }
}

async function catchWrapper(client: MatrixRPC, method: Function, ...args: any[]) {
    let result
    try {
        result = args && args.length ? await method.apply(client, args) : await method.apply(client)
        console.log(`[${method.name.toUpperCase()} SUCCEEDED]`)
        return singleNodeResponse('✔', result)
    } catch (e) {
        // console.log("[ERROR TRACE] -", e)

        const message = e.message
        console.log(`[${method.name.toUpperCase()} FAILED] -`, message)

        // if (e.message.includes("timeout")) return singleNodeResponse(false, 'timeout')
        return singleNodeResponse('✘', message)
    }
}

export class SingleNode {
    private client: MatrixRPC

    public plugins = ["RpcWallet", "SimplePolicy", "ApplicationLogs", "CoreMetrics"]
    public address = "AJBENSwajTzQtwyJFkiJSv7MAaaMc7DsRz"
    public assetID = "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b"
    public hash = "773dd2dae4a9c9275290f89b56e67d7363ea4826dfd4fc13cc01cf73a44b0d0e"
    public txid = "92b1ecc0e8ca8d6b03db7fe6297ed38aa5578b3e6316c0526b414b453c89e20d"
    public index = 10000
    public blockNumbers = 10
    public endHeight = 460000


    constructor(url: string) {
        this.client = new MatrixRPC(url, )
    }

    public async listPlugins() {
        return await catchWrapper(this.client, this.client.listPlugins)
    }

    public async getApplicationLog() {
        return await catchWrapper(this.client, this.client.getApplicationLog, this.txid)
    }

    public async ping() {
        return await this.client.ping()
    }

    public async getBestBlockHash() {
        return await catchWrapper(this.client, this.client.getBestBlockHash)
    }

    public async getAccountState() {
        return await catchWrapper(this.client, this.client.getAccountState, this.address)
    }

    public async claimGas() {
        return await catchWrapper(this.client, this.client.claimGas, this.address)
    }

    public async dumpPrivateKey() {
        return await catchWrapper(this.client, this.client.dumpPrivateKey, this.address)
    }

    public async getAssetState() {
        return await catchWrapper(this.client, this.client.getAssetState, this.assetID)
    }

    public async getBalance() {
        const assetID = "025d82f7b00a9ff1cfe709abe3c4741a105d067178e645bc3ebad9bc79af47d4"
        return await catchWrapper(this.client, this.client.getBalance, assetID)
    }

    public async getBlock() {
        return await catchWrapper(this.client, this.client.getBlock, this.hash)
    }

    public async getBlockCount() {
        return await catchWrapper(this.client, this.client.getBlockCount)
    }

    public async getBlockHash() {
        return await catchWrapper(this.client, this.client.getBlockHash, this.index)
    }

    public async getBlockHeader() {
        return await catchWrapper(this.client, this.client.getBlockHeader, this.hash)
    }

    public async getBlockSysFee() {
        return await catchWrapper(this.client, this.client.getBlockSysFee, this.index)
    }

    public async getClaimable() {
        return await catchWrapper(this.client, this.client.getClaimable, this.address)
    }

    public async getConnectionCount() {
        return await catchWrapper(this.client, this.client.getConnectionCount)
    }

    public async getContractState() {
        const scriptHash = "dc675afc61a7c0f7b3d2682bf6e1d8ed865a0e5f"
        return await catchWrapper(this.client, this.client.getContractState, scriptHash)
    }

    public async getMetricBlockTimestamp() {
        return await catchWrapper(this.client, this.client.getMetricBlockTimestamp, this.blockNumbers, this.endHeight)
    }

    public async getNEP5Balances() {
        return await catchWrapper(this.client, this.client.getNEP5Balances, this.address)
    }

    public async getNEP5Transfers() {
        return await catchWrapper(this.client, this.client.getNEP5Transfers, this.address)
    }

    public async getNewAddress() {
        return await catchWrapper(this.client, this.client.getNewAddress)
    }

    public async getRawMemPool() {
        return await catchWrapper(this.client, this.client.getRawMemPool)
    }

    public async getRawTransaction() {
        return await catchWrapper(this.client, this.client.getRawTransaction, this.txid)
    }

    public async getStorage() {
        const scriptHash = "03febccf81ac85e3d795bc5cbd4e84e907812aa3"
        const key = "5065746572"
        return await catchWrapper(this.client, this.client.getStorage, scriptHash, key)
    }

    public async getTransactionHeight() {
        return await catchWrapper(this.client, this.client.getTransactionHeight, this.txid)
    }

    public async getTxOut() {
        const txid = "f4250dab094c38d8265acc15c366dc508d2e14bf5699e12d9df26577ed74d657"
        const n = 0
        return await catchWrapper(this.client, this.client.getTxOut, txid, n)
    }

    public async getPeers() {
        return await catchWrapper(this.client, this.client.getPeers)
    }

    public async getUnspents() {
        return await catchWrapper(this.client, this.client.getUnspents, this.address)
    }

    public async getVersion() {
        return await catchWrapper(this.client, this.client.getVersion)
    }

    public async getValidators() {
        return await catchWrapper(this.client, this.client.getValidators)
    }

    public async getWalletHeight() {
        return await catchWrapper(this.client, this.client.getWalletHeight)
    }

    public async importPrivateKey() {
        return await catchWrapper(this.client, this.client.importPrivateKey)
    }

    public async invokeFunction() {
        const scriptHash = "af7c7328eee5a275a3bcaee2bf0cf662b5e739be"
        const operation = "balanceOf"
        const params = [
            {
                "type": "Hash160",
                "value": "91b83e96f2a7c4fdf0c1688441ec61986c7cae26"
            }
        ]
        return await catchWrapper(this.client, this.client.invokeFunction, scriptHash, operation, params)
    }

    public async invokeScript() {
        const script = "00046e616d656724058e5e1b6008847cd662728549088a9ee82191"
        return await catchWrapper(this.client, this.client.invokeScript, script)
    }

    public async listAddress() {
        return await catchWrapper(this.client, this.client.listAddress)
    }

    public async sendRawTransaction() {
        const hex = "80000001195876cb34364dc38b730077156c6bc3a7fc570044a66fbfeeea56f71327e8ab0000029b7cffdaa674beae0f930ebe6085af9093e5fe56b34a5c220ccdcf6efc336fc500c65eaf440000000f9a23e06f74cf86b8827a9108ec2e0f89ad956c9b7cffdaa674beae0f930ebe6085af9093e5fe56b34a5c220ccdcf6efc336fc50092e14b5e00000030aab52ad93f6ce17ca07fa88fc191828c58cb71014140915467ecd359684b2dc358024ca750609591aa731a0b309c7fb3cab5cd0836ad3992aa0a24da431f43b68883ea5651d548feb6bd3c8e16376e6e426f91f84c58232103322f35c7819267e721335948d385fae5be66e7ba8c748ac15467dcca0693692dac"
        return await catchWrapper(this.client, this.client.sendRawTransaction, hex)
    }

    public async sendFrom() {
        return await catchWrapper(this.client, this.client.sendFrom, this.assetID, this.address, this.address, 0)
    }

    public async sendToAddress() {
        return await catchWrapper(this.client, this.client.sendToAddress, this.assetID, this.address, 0)
    }

    public async sendMany() {
        const outputsArray = [
            {
                "asset": "025d82f7b00a9ff1cfe709abe3c4741a105d067178e645bc3ebad9bc79af47d4",
                "value": 1,
                "address": "AbRTHXb9zqdqn5sVh4EYpQHGZ536FgwCx2"
            },
            {
                "asset": "025d82f7b00a9ff1cfe709abe3c4741a105d067178e645bc3ebad9bc79af47d4",
                "value": 1,
                "address": "AbRTHXb9zqdqn5sVh4EYpQHGZ536FgwCx2"
            }
        ]
        const fee = 0
        const address = "AbRTHXb9zqdqn5sVh4EYpQHGZ536FgwCx2"
        return await catchWrapper(this.client, this.client.sendMany, outputsArray, fee, address)
    }

    public async submitBlock() {
        const hex = "000000000000000000000000000000000000000000000000000000000000000000000000845c34e7c1aed302b1718e914da0c42bf47c476ac4d89671f278d8ab6d27aa3d65fc8857000000001dac2b7c00000000be48d3a3f5d10013ab9ffee489706078714f1ea2010001510400001dac2b7c00000000400000455b7b226c616e67223a227a682d434e222c226e616d65223a22e5b08fe89a81e882a1227d2c7b226c616e67223a22656e222c226e616d65223a22416e745368617265227d5d0000c16ff28623000000da1745e9b549bd0bfa1a569971c77eba30cd5a4b00000000400001445b7b226c616e67223a227a682d434e222c226e616d65223a22e5b08fe89a81e5b881227d2c7b226c616e67223a22656e222c226e616d65223a22416e74436f696e227d5d0000c16ff286230008009f7fd096d37ed2c0e3f7f0cfc924beef4ffceb680000000001000000019b7cffdaa674beae0f930ebe6085af9093e5fe56b34a5c220ccdcf6efc336fc50000c16ff2862300be48d3a3f5d10013ab9ffee489706078714f1ea201000151"
        return await catchWrapper(this.client, this.client.submitBlock, hex)
    }

    public async validateAddress() {
        return await catchWrapper(this.client, this.client.validateAddress, this.address)
    }
}

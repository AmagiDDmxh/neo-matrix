import { rpc } from "@cityofzion/neon-core"

const { Query, RPCClient } = rpc

export interface IPlugin {
    name: string,
    version: string,
    interfaces: string[]
}

interface IOutputsArray {
    asset: string
    value: string | number
    address: string
}

export class MatrixQuery extends Query {
    public static create(method: string, ...params: any[]) {
        return new Query({ method, params })
    }

    public static listPlugins() {
        return this.create("listplugins")
    }

    public static getApplicationLog(txid: string) {
        return this.create("getapplicationlog", txid)
    }

    public static getBlockHeader(hash: string, verbose= 1) {
        return this.create("getblockheader",hash, verbose)
    }

    public static getMetricBlockTimestamp(blockNumbers: number | string, endHeight= 10) {
        return this.create("getmetricblocktimestamp", blockNumbers, endHeight)
    }

    static getNEP5Balances(address: string) {
        return this.create("getnep5balances", address)
    }

    static getNEP5Transfers(address: string) {
        return this.create("getnep5transfers", address)
    }

    static getTransactionHeight(txid: string) {
        return this.create("gettransactionheight", txid)
    }

    static claimGas(address: string | undefined) {
        return this.create("claimgas", address)
    }

    static dumpPrivKey(address: string) {
        return this.create("dumpprivkey", address)
    }

    static getBalance(asset_id: string) {
        return this.create("getbalance", asset_id)
    }

    static getNewAddress() {
        return this.create("getnewaddress")
    }

    static getUnclaimedGas() {
        return this.create("getunclaimedgas")
    }

    static getWalletHeight() {
        return this.create("getwalletheight")
    }

    static sendMany(outputsArray: IOutputsArray[], fee = 0, changeAddress?: string) {
        return this.create("sendMany", outputsArray, fee, changeAddress)
    }
    static sendToAddress(assetID: string, address: string, value: string | number, fee = 0) {
        return this.create("sendToAddress", assetID, address, value, fee)
    }
    static sendFrom(assetID: string, fromAddress: string, toAddress: string, fee = 0) {
        return this.create("sendFrom", assetID, fromAddress, toAddress, fee)
    }
    static listAddress() {
        return this.create("listAddress")
    }
    static importPrivateKey() {
        return this.create("importPrivateKey")
    }
}

export class MatrixRPC extends RPCClient {
    private async req(query: MatrixQuery) {
        const response = await this.execute(query, { timeout: 10000 })
        return response.result
    }

    public async listPlugins(): Promise<IPlugin[]> {
        return await this.req(MatrixQuery.listPlugins())
    }

    public async getApplicationLog(txid: string): Promise<any> {
        return await this.req(MatrixQuery.getApplicationLog(txid))
    }

    public async getBlockHeader(hash: string, verbose = 1): Promise<any> {
        return await this.req(MatrixQuery.getBlockHeader(hash, verbose))
    }

    public async getMetricBlockTimestamp(blockNumbers: number | string, endHeight= 10) {
        return await this.req(MatrixQuery.getMetricBlockTimestamp(blockNumbers, endHeight))
    }

    public async getNEP5Balances(address: string) {
        return await this.req(MatrixQuery.getNEP5Balances(address))
    }

    public async getNEP5Transfers(address: string) {
        return await this.req(MatrixQuery.getNEP5Transfers(address))
    }

    public async getTransactionHeight(txid: string) {
        return await this.req(MatrixQuery.getTransactionHeight(txid))
    }

    /* API require rpcWallet plugin */
    public async claimGas(address?: string) {
        return await this.req(MatrixQuery.claimGas(address))
    }

    public async dumpPrivateKey(address: string) {
        return await this.req(MatrixQuery.dumpPrivKey(address))
    }

    public async getBalance(asset_id: string) {
        return await this.req(MatrixQuery.getBalance(asset_id))
    }

    public async getNewAddress() {
        return await this.req(MatrixQuery.getNewAddress())
    }

    public async getUnclaimedGas() {
        return await this.req(MatrixQuery.getUnclaimedGas())
    }

    public async getWalletHeight() {
        return await this.req(MatrixQuery.getWalletHeight())
    }

    public async importPrivateKey() {
        return await this.req(MatrixQuery.importPrivateKey())
    }

    public async listAddress() {
        return await this.req(MatrixQuery.listAddress())
    }

    public async sendFrom(assetID: string, fromAddress: string, toAddress: string, fee = 0) {
        return await this.req(MatrixQuery.sendFrom(assetID, fromAddress, toAddress, fee))
    }

    public async sendToAddress(assetID: string, address: string, value: string | number, fee = 0) {
        return await this.req(MatrixQuery.sendToAddress(assetID, address, value, fee))
    }

    public async sendMany(outputsArray: IOutputsArray[], fee: number, changeAddress?: string) {
        return await this.req(MatrixQuery.sendMany(outputsArray, fee, changeAddress))
    }
}

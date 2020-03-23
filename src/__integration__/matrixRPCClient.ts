import { MatrixRPC, MatrixQuery } from "../../src/matricRpc"

const TESTNET_URLS = [
    "https://seed11.ngd.network:20331",
    "https://test1.cityofzion.io:443",
    "https://test2.cityofzion.io:443",
    "https://test3.cityofzion.io:443",
    "http://seed3.neo.org:20332",
    "http://seed4.neo.org:20332",
    "http://seed5.neo.org:20332"
]

let client: MatrixRPC
const address = "ALq7AWrhAueN6mJNqk6FHJjnsEoPRytLdW"
const contractHash = "5b7074e873973a6ed3708862f219a6fbf4d1c411"

beforeAll(async () => {
    client = new MatrixRPC(TESTNET_URLS[0])
})

describe("Matrix RPC Methods", () => {
    test("listPlugins", async () => {
        const result = await client.listPlugins()
        expect(Array.isArray(result)).toBeTruthy()
    })

    test("getApplicationLog", async () => {
        const txid = "92b1ecc0e8ca8d6b03db7fe6297ed38aa5578b3e6316c0526b414b453c89e20d"
        const result = await client.getApplicationLog(txid)

        expect(result).toBeCalledWith(
            expect.objectContaining({
                txid: expect.stringContaining(txid),
                execution: expect.arrayContaining([
                    "trigger",
                    "contract",
                    "vmstate",
                    "gas_consumed",
                    "stack",
                    "notifications"
                ])
            })
        )
    })


})


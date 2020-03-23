import { MatrixRPC } from "../matricRpc"

const TEST_URL = 'http://seed1.ngd.network:10332'

describe('matrix rpc methods', () => {
    let client: MatrixRPC

    beforeEach(() => {
        client = new MatrixRPC(TEST_URL)

    })
});

import {
    BaseContract,
    Context,
    ContractDefinition,
    ContractMessageRequest,
    ContractQueryRequest,
    createContract,
    Snip20Contract,
} from "@stakeordie/griptape.js";

const counterDef: ContractDefinition = {
    queries: {
        getCount(): ContractQueryRequest {
            return { get_count: {} };
        }
    },

    messages: {
        increment(): ContractMessageRequest {
            const handleMsg = { increment: {} };
            return {
                handleMsg
            };
        }
    }
}

const sefiDef = {
    queries: {
        getBalance({ address, key }: Context) {
            return { balance: { address, key } }
        }
    }
}

interface CounterContract extends BaseContract {
    getCount(): Promise<{ count: number }>;
    increment(): Promise<void>;
}

export const counter = createContract<CounterContract>({
    id: 'counter',
    at: 'secret1w97ynhe099cs5p433dvlaqhsxrszudz2n3f56h',
    definition: counterDef
});

createContract<Snip20Contract>({
    id: 'sefi',
    at: 'secret12q2c5s5we5zn9pq43l0rlsygtql6646my0sqfm',
    definition: sefiDef
});
import {QueryResultInterface} from "../../../../../SharedContext/Application/Query/QueryResultInterface";

export class FindCustomerQueryResult implements QueryResultInterface {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly availableCredit: number
    ) {}

    result(): any[] {
        return [
            {
                id: this.id,
                name: this.name,
                email: this.email,
                availableCredit: this.availableCredit
            }
        ];
    }

}
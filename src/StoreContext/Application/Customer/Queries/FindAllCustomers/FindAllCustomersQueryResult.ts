import { QueryResultInterface } from "../../../../../SharedContext/Application/Query/QueryResultInterface";
import {Customer} from "../../../../Domain/Customer/Customer";

export class FindAllCustomersQueryResult implements QueryResultInterface {
    private customers: Customer[];

    constructor(customers: Customer[]) {
        this.customers = customers;
    }

    result(): Customer[] {
        return this.customers;
    }
}
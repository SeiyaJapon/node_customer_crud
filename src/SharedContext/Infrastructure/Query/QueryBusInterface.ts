import {QueryInterface} from "../../Application/Query/QueryInterface";
import {QueryResultInterface} from "../../Application/Query/QueryResultInterface";

export interface QueryBusInterface {
    ask(query: QueryInterface): Promise<QueryResultInterface>;
}
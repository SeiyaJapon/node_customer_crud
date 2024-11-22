import {Customer} from "../Customer";
import {CustomerId} from "../ValueObjects/CustomerId";

export interface CustomerRepositoryInterface {
    save(customer: Customer): Promise<Customer>;
    find(id: CustomerId): Promise<Customer | null>;
    findAll(): Promise<Customer[]>;
    update(customer: Customer): Promise<Customer>;
    delete(id: CustomerId): Promise<void>;
}
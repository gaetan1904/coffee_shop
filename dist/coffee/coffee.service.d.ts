import { Repository } from 'typeorm';
import { Coffee } from './coffee.entity';
export declare class CoffeeService {
    private coffeeRepository;
    constructor(coffeeRepository: Repository<Coffee>);
    findAll(): Promise<Coffee[]>;
    findOne(id: number): Promise<Coffee>;
    create(coffee: Coffee): Promise<Coffee>;
    update(id: number, coffee: Coffee): Promise<void>;
    remove(id: number): Promise<void>;
}

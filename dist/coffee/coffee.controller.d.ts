import { CoffeeService } from './coffee.service';
import { Coffee } from './coffee.entity';
export declare class CoffeeController {
    private readonly coffeeService;
    constructor(coffeeService: CoffeeService);
    findAll(): Promise<Coffee[]>;
    findOne(id: number): Promise<Coffee>;
    create(coffee: Coffee): Promise<Coffee>;
    update(id: number, coffee: Coffee): Promise<void>;
    remove(id: number): Promise<void>;
}

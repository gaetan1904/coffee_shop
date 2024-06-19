import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee } from './coffee.entity';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private coffeeRepository: Repository<Coffee>,
  ) {}

  findAll(): Promise<Coffee[]> {
    return this.coffeeRepository.find();
  }

  findOne(id: number): Promise<Coffee> {
    return this.coffeeRepository.findOneBy({ id });
  }

  create(coffee: Coffee): Promise<Coffee> {
    return this.coffeeRepository.save(coffee);
  }

  async update(id: number, coffee: Coffee): Promise<void> {
    await this.coffeeRepository.update(id, coffee);
  }

  async remove(id: number): Promise<void> {
    await this.coffeeRepository.delete(id);
  }
}

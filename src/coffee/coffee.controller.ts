import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { Coffee } from './coffee.entity';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from 'src/users/users.entity';

@Controller('coffee')
@UseGuards(RolesGuard)
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get()
  findAll(): Promise<Coffee[]> {
    return this.coffeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Coffee> {
    return this.coffeeService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() coffee: Coffee): Promise<Coffee> {
    return this.coffeeService.create(coffee);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() coffee: Coffee): Promise<void> {
    return this.coffeeService.update(id, coffee);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: number): Promise<void> {
    return this.coffeeService.remove(id);
  }
}

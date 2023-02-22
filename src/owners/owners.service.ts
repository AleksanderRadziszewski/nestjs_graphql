import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
  ) {}
  create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const newOwner = this.ownerRepository.create(createOwnerInput);
    return this.ownerRepository.save(newOwner);
  }

  findAll(): Promise<Owner[]> {
    return this.ownerRepository.find({ relations: ['pets'] });
  }

  findOne(id: number): Promise<Owner> {
    return this.ownerRepository.findOneOrFail({ where: { id } });
  }
}

import { NotFoundException } from '@nestjs/common';
import { getPagination, getPagingData } from '../utils/paginate';
import { BaseEntity, DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

export abstract class BaseService<TEntity extends BaseEntity> {
  constructor(private readonly repository: Repository<TEntity>) {}

  create(entity: DeepPartial<TEntity>) {
    const data = this.repository.create(entity);
    return this.repository.save(data);
  }

  findAll() {
    return this.repository.find();
  }

  async paginate(pageIndex: number, pageSize: number, condition?: any) {
    const { skip, limit } = getPagination(pageSize, pageIndex);
    const data = await this.repository.findAndCount({
      skip: skip,
      take: limit,
      where: condition,
    });
    return getPagingData(data, pageIndex, limit);
  }

  async findById(id: number) {
    const data = await this.repository.findOneBy({
      id,
    } as unknown as FindOptionsWhere<TEntity>);
    if (!data) throw new NotFoundException();
    return data;
  }

  async update(id: number, entity: DeepPartial<TEntity>) {
    const data = await this.findById(id);
    return this.repository.save(Object.assign(data, entity));
  }

  async delete(id: number | number[]) {
    await this.repository.delete(id);
    return null;
  }
}

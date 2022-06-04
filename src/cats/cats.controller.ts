import * as NestCommon from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './cats.types';
import { Response } from 'express';

@NestCommon.Controller('cats')
export class CatsController {
  @NestCommon.Post()
  @NestCommon.Header('Cache-control', 'none')
  @NestCommon.HttpCode(200)
  create(
    @NestCommon.Body() createCatDto: CreateCatDto,
    @NestCommon.Res() res: Response,
  ) {
    console.log(createCatDto);
    return res.json({ message: 'This is a cute cat' });
  }

  @NestCommon.Get()
  async findAll(): Promise<any[]> {
    return [];
  }

  @NestCommon.Get(':id')
  findOne(@NestCommon.Param('id') id: string): string {
    return `This action returns as #${id} cat`;
  }

  @NestCommon.Put(':id')
  update(
    @NestCommon.Param('id') id: string,
    @NestCommon.Body() updateCatDto: UpdateCatDto,
  ) {
    console.log(updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @NestCommon.Delete(':id')
  remove(@NestCommon.Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}

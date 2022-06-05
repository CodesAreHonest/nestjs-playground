import * as NestCommon from '@nestjs/common';
import { Cat } from './interface/cats.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Response } from 'express';
import { CatsService } from './cats.service';

@NestCommon.Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

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
  async findAll(): Promise<Cat[]> {
    throw new NestCommon.HttpException(
      'Forbidden',
      NestCommon.HttpStatus.FORBIDDEN,
    );

    return this.catsService.findAll();
  }

  @NestCommon.Get(':id')
  findOne(
    @NestCommon.Param(
      'id',
      new NestCommon.ParseIntPipe({
        errorHttpStatusCode: NestCommon.HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: string,
  ): string {
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

import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class ParseInt extends ValidationPipe {
  async transform(value: string): Promise<number> {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('parameter must be number');
    }
    return val;
  }
}

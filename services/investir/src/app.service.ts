import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      service: 'investir',
      description: 'Investir au Gabon',
      version: '0.1.0',
      status: 'running',
    };
  }
}

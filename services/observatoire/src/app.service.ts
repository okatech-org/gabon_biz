import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      service: 'observatoire',
      description: 'Observatoire Economie Numerique',
      version: '0.1.0',
      status: 'running',
    };
  }
}

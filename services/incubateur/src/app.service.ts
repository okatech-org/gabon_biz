import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      service: 'incubateur',
      description: 'Incubateur Digital (SING 2.0)',
      version: '0.1.0',
      status: 'running',
    };
  }
}

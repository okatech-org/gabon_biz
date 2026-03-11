import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      service: 'entrepreneur',
      description: 'Guichet Unique Entrepreneur',
      version: '0.1.0',
      status: 'running',
    };
  }
}

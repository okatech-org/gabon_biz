import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      service: 'innovation-hub',
      description: 'Innovation Hub (KIMBA 2.0)',
      version: '0.1.0',
      status: 'running',
    };
  }
}

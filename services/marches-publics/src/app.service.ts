import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      service: 'marches-publics',
      description: 'Marchés Publics Numériques',
      version: '0.1.0',
      status: 'running',
    };
  }
}

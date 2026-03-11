import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      service: 'filieres',
      description: 'Filieres Sectorielles',
      version: '0.1.0',
      status: 'running',
    };
  }
}

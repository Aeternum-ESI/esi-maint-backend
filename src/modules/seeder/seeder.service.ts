import { AssetsService } from '../assets/assets.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeederService {
  constructor(private readonly assetsService: AssetsService) {}
  async seed() {
    console.log(this.assetsService.create.toString());
    await this.assetsService.create({
      name: 'Test',
      inventoryCode: 'Test',
      type: 'EQUIPMENT',
    });
  }
}

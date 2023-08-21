// import { Injectable } from '@nestjs/common';
// import * as DataLoader from 'dataloader';
// import { In, Repository } from 'typeorm';
// import { LeagueLogo } from './entities/league-logo.entity';

// @Injectable()
// export class LogoLoader {
//   constructor(
//     private readonly batchLogos: DataLoader<number, LeagueLogo>,
//     private leagueLogoRepository: Repository<LeagueLogo>,
//   ) {
//     this.batchLogos = new DataLoader<number, LeagueLogo>(async (ids) => {
//       //const logos = await this.leagueLogoRepository.findByIds(ids as number[]);
//       const logos = await this.leagueLogoRepository.findBy({ id: In(ids) });
//       const logoMap = new Map(logos.map((logo) => [logo.id, logo]));
//       return ids.map((id) => logoMap.get(id));
//     });
//   }

//   public async loadLogo(id: number): Promise<LeagueLogo> {
//     console.log('loadLogo');
//     return this.batchLogos.load(id);
//   }

//   //public async loadLogos(ids: number[]): Promise<LeagueLogo[]> {
//   public async loadLogos(ids: number[]) {
//     console.log('loadLogos');
//     return this.batchLogos.loadMany(ids);
//   }
// }

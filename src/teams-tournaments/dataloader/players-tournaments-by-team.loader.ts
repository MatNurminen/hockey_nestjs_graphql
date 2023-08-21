// import { Injectable, Scope } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import DataLoader from 'dataloader';
// import { In, Repository } from 'typeorm';
// import { PlayerTournament } from '../../players-tournaments/entities/player-tournament.entity/player-tournament.entity';
// import { TeamTournament } from '../entities/team-tournament.entity/team-tournament.entity';

// @Injectable({ scope: Scope.REQUEST })
// export class PlayersTournamentsByTeamLoader extends DataLoader<
//   number,
//   PlayerTournament[]
// > {
//   constructor(
//     @InjectRepository(TeamTournament)
//     private readonly teamsTournamentsRepository: Repository<TeamTournament>,
//   ) {
//     super((keys) => this.batchLoadFn(keys));
//   }

//   private async batchLoadFn(
//     teamsTournamentsIds: readonly number[],
//   ): Promise<PlayerTournament[][]> {
//     const teamsTournamentsWithPlayersTournaments =
//       await this.teamsTournamentsRepository.find({
//         select: ['id'],
//         order: {
//           id: 'ASC',
//         },
//         relations: {
//           playersTournaments: true,
//         },
//         where: {
//           id: In(teamsTournamentsIds as number[]),
//         },
//       });

//     return teamsTournamentsWithPlayersTournaments.map(
//       (teamTournament) => teamTournament.playersTournaments,
//     );
//   }
// }

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { League } from './entities/league.entity';
import { LeaguesService } from './leagues.service';
import { mockLeagueDto } from './dto/mock-league.dto';

type MockType<T> = { [P in keyof T]?: jest.Mock<{}> };

describe('CustomerService', () => {
  let service: LeaguesService;
  const leagueRepositoryMock: MockType<Repository<League>> = {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeaguesService,
        {
          provide: getRepositoryToken(League),
          useValue: leagueRepositoryMock,
        },
      ],
    }).compile();
    service = module.get<LeaguesService>(LeaguesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should find all leagues', async () => {
      const leagues = [
        {
          id: 1,
          name: 'Kontinental Hockey League',
          short_name: 'KHL',
          start_year: 2012,
          end_year: null,
          color: null,
          is_local: false,
        },

        {
          id: 2,
          name: 'Liiga',
          short_name: 'Liiga',
          start_year: 2012,
          end_year: null,
          color: null,
          is_local: false,
        },
      ];
      leagueRepositoryMock.find.mockReturnValue(leagues);
      const foundLeagues = await service.findAll();
      expect(foundLeagues).toContainEqual({
        id: 1,
        name: 'Kontinental Hockey League',
        short_name: 'KHL',
        start_year: 2012,
        end_year: null,
        color: null,
        is_local: false,
      });
      expect(leagueRepositoryMock.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should find a league', async () => {
      leagueRepositoryMock.findOne.mockReturnValue(mockLeagueDto);
      const foundLeague = await service.findOne(mockLeagueDto.id);
      expect(foundLeague).toMatchObject(mockLeagueDto);
      expect(leagueRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: mockLeagueDto.id },
      });
    });
  });
});

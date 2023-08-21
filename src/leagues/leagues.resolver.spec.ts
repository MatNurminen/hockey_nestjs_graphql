import { Test, TestingModule } from '@nestjs/testing';
import { LogosByLeagueLoader } from './dataloader/league-logos-by-league.loader';
import { TournamentsByLeagueLoader } from './dataloader/tournaments-by-league.loader';
import { CreateLeagueInput } from './dto/create-league.input';
import { League } from './entities/league.entity';
import { LeaguesResolver } from './leagues.resolver';
import { LeaguesService } from './leagues.service';

const mockLeague: League = {
  id: 1,
  name: 'league',
  short_name: 'lea',
  start_year: 2021,
  end_year: null,
  color: '#CC3300',
  is_local: true,
  logos: [],
  tournaments: [],
};

describe('LeaguesResolver', () => {
  let resolver: LeaguesResolver;
  let service: LeaguesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeaguesResolver,
        {
          provide: LeaguesService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: TournamentsByLeagueLoader,
          useValue: {},
        },
        {
          provide: LogosByLeagueLoader,
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<LeaguesResolver>(LeaguesResolver);
    service = module.get<LeaguesService>(LeaguesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return all leagues', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([mockLeague]);
    const result = await resolver.findAll();
    expect(Array.isArray(result)).toEqual(true);
    expect(result[0].start_year).toBe(2021);
  });

  it('should return a league', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockLeague);

    expect(await resolver.findOne(1)).toBe(mockLeague);
    expect((await resolver.findOne(1)).id).toEqual(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should create user', async () => {
    const createLeagueInput: CreateLeagueInput = {
      name: 'league',
      short_name: 'lea',
      start_year: 2021,
      end_year: null,
      color: '#CC3300',
      is_local: true,
    };
    jest.spyOn(service, 'create').mockResolvedValue(mockLeague);

    const result = await resolver.create(createLeagueInput);
    expect(service.create).toHaveBeenCalledWith(createLeagueInput);
    expect(result).toEqual(mockLeague);
  });
});

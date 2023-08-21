import { Tournament } from '../../tournaments/entities/tournament.entity';
import { LeagueLogo } from '../../league-logos/entities/league-logo.entity';
import { League } from '../entities/league.entity';

export const mockLeagueDto: League = {
  id: 1,
  name: 'League',
  short_name: 'LEG',
  color: 'white',
  start_year: 2021,
  end_year: null,
  is_local: true,
  logos: [new LeagueLogo()],
  tournaments: [new Tournament()],
};

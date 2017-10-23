import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 0,  nick_name: 'Zero' },
      { id: 11, nick_name: 'Nakasar' },
      { id: 12, nick_name: 'Pascal' },
      { id: 13, nick_name: 'Laurent' },
      { id: 14, nick_name: 'Celeritas' },
      { id: 15, nick_name: 'Magneta' },
      { id: 16, nick_name: 'RubberMan' },
      { id: 17, nick_name: 'Dynama' },
      { id: 18, nick_name: 'Dr IQ' },
      { id: 19, nick_name: 'Magma' },
      { id: 20, nick_name: 'Tornado' }
    ];
    return {users};
  }
}

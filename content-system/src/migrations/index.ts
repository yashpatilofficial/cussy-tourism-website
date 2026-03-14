import * as migration_20260314_183139_init_postgres from './20260314_183139_init_postgres';
import * as migration_20260314_191255_add_subscribers_collection from './20260314_191255_add_subscribers_collection';

export const migrations = [
  {
    up: migration_20260314_183139_init_postgres.up,
    down: migration_20260314_183139_init_postgres.down,
    name: '20260314_183139_init_postgres',
  },
  {
    up: migration_20260314_191255_add_subscribers_collection.up,
    down: migration_20260314_191255_add_subscribers_collection.down,
    name: '20260314_191255_add_subscribers_collection'
  },
];

import * as migration_20260314_183139_init_postgres from './20260314_183139_init_postgres';

export const migrations = [
  {
    up: migration_20260314_183139_init_postgres.up,
    down: migration_20260314_183139_init_postgres.down,
    name: '20260314_183139_init_postgres'
  },
];

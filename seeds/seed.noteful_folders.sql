TRUNCATE noteful_folders RESTART IDENTITY CASCADE;

INSERT INTO noteful_folders (name)
VALUES
  ('Important'), 
  ('Super'), 
  ('Spangley');

    --execute: psql -U [dbAdmin] -d [dbName] -f ./seeds/seed.noteful_folders.sql
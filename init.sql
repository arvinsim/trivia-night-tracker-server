-- Creating Tables
DROP TABLE IF EXISTS players;
CREATE TABLE players
(
    id serial not null
        constraint players_pk
            primary key,
    name text
);

DROP TABLE IF EXISTS scores;
CREATE TABLE scores
(
    id serial not null
        constraint table_name_pk
            primary key,
    score integer,
    player_id integer
        constraint table_name_players_id_fk
            references players,
    date_created timestamp
);

-- Insert data
INSERT INTO players (name)
VALUES ('John')
RETURNING id as john_id;

INSERT
INTO scores(score, player_id, date_created)
VALUES (111, 1, now()),
       (122, 1, now()),
       (133, 1, now());

INSERT INTO players (name)
VALUES ('Jane')
RETURNING id as jane_id;

INSERT
INTO scores(score, player_id, date_created)
VALUES (211, 2, now()),
       (222, 2, now()),
       (233, 2, now());

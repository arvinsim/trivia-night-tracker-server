SELECT DATABASE "postgres"

# Creating Tables
START TRANSACTION;
DROP TABLE IF EXISTS players;
CREATE TABLE players
(
    id   serial not null
        constraint players_pk
            primary key,
    name text
);

DROP TABLE IF EXISTS scores;
CREATE TABLE scores
(
    id           serial not null
        constraint table_name_pk
            primary key,
    score        integer,
    player_id    integer
        constraint table_name_players_id_fk
            references players,
    date_created timestamp
);
END TRANSACTION;

# Insert data
START TRANSACTION;
INSERT INTO players(name)
VALUES ("John")
RETURNING id  AS p_id;

INSERT INTO scores(score, player_id, date_created)
VALUES (111, p_id,1607751459)

INSERT INTO scores(score, player_id, date_created)
VALUES (122, p_id,1607837857)

INSERT INTO scores(score, player_id, date_created)
VALUES (133, p_id,1607924257)

INSERT INTO players(name)
VALUES ("Jane")
RETURNING id AS p_id;

INSERT INTO scores(score, player_id, date_created)
VALUES (211, p_id,1607751459)

INSERT INTO scores(score, player_id, date_created)
VALUES (222, p_id,1607837857)

INSERT INTO scores(score, player_id, date_created)
VALUES (233, p_id,1607924257)
END TRANSACTION;


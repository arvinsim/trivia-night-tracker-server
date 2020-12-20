const { ApolloServer, gql } = require("apollo-server");

const POSTGRES_VERSION = "13.1";
const POSTGRES_HOST = "127.0.0.1";
const POSTGRES_USER = "docker";
const POSTGRES_PASSWORD = "docker";
const POSTGRES_DATABASE = "postgres";

const pg = require("knex")({
  client: "pg",
  version: POSTGRES_VERSION,
  connection: {
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE,
  },
});

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  scalar Date

  type Score {
    id: Int
    score: Int
    playerId: Int
    dateCreated: Date
  }

  type Player {
    id: Int
    name: String
    scores: [Score]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    players: [Player]
    scores: [Score]
  }
`;

async function getScores() {
  try {
    return await pg
      .select(
        "id",
        "score",
        "player_id as playerId",
        "date_created as dateCreated"
      )
      .from("scores");
  } catch (error) {
    console.log("Error getting scores");
    return [];
  }
}

async function getPlayers() {
  try {
    return await pg
      .select("players.id as id", "name", "scores.score as score")
      .from("players")
      .leftJoin("scores", "players.id", "scores.player_id");
  } catch (error) {
    console.log("Error getting scores");
    return [];
  }
}

/*
const players = [
  {
    id: 1,
    name: "Kate Chopin",
    scores: [],
  },
  {
    id: 2,
    name: "Paul Auster",
    scores: [
      {
        id: 2,
        score: 222,
        dateCreated: 1608219972,
      },
    ],
  },
];
 */

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    players: getPlayers,
    scores: getScores,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server
  .listen({
    port: 3006,
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });

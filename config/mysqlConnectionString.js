var mysqlConnectionString = {
  connection: {
    dev: {
      host: "localhost",
      user: "root",
      password: "P@ssword@12",
      database: "testdb",
      multipleStatements: true,
    },

    qa: {
      host: "localhost",
      user: "root",
      password: "",
      database: "swadesi_projects",
    },

    prod: {
      host: "localhost",
      user: "root",
      password: "",
      database: "swadesi",
    },
  },
};

module.exports.mysqlConnectionString = mysqlConnectionString;

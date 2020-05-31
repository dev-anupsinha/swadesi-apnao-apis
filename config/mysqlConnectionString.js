var mysqlConnectionString = {
  connection: {
    dev: {
      host: "den1.mysql3.gear.host",
      user: "sbswadesiapnao",
      password: "Cn4m9a!biiA~",
      database: "sbswadesiapnao",
      multipleStatements: true,
    },

    qa: {
      host: "localhost",
      user: "root",
      password: "P@ssword@12",
      database: "testdb",
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

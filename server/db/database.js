module.exports = {
  development: {
    use_env_variable: "DB"
  },
  test: {
    use_env_variable: "DB"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};
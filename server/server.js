import sql from "mssql";

// config for your database
var config = {
  user: "MAR",
  password: "Mar#2022",
  server: "10.28.59.206",
  database: "WMS_METRO",
  requestTimeout: 20000,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

sql.connect(config, function (err) {
  if (err) console.log(err);

  console.log("Connection successful");
  // create Request object
  // var request = new sql.Request();
});

export default sql;

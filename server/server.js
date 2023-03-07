import sql from "mssql";

// config for your database
var config = {
  user: "MAR",
  password: "Mar#2022",
  server: "10.28.59.206",
  database: "WMS_METRO",
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certsม
  }
};

sql.connect(config, function (err) {
  if (err) console.log(err);

  console.log("Connection successful");
  // create Request object
  var request = new sql.Request();

  // query to the database and get the records
  request.query("select * from V_LMSDATA", function (err, records) {
    if (err) console.log(err);
    console.log(records);
  });
});

export default sql;

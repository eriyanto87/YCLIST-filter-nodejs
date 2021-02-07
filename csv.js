const csv = require("csvtojson");
const numbers = require("./numbers.json");
const converter = require("json-2-csv");
const fs = require("fs");

csv()
  .fromFile("./yclist_company_names.csv")
  .then((jsonObj) => {
    let filteredArr = [];
    jsonObj.map((name) => filteredArr.push(name.company_name));
    //console.log(filteredArr);
    numbers.map((contacts) => {
      if (
        !filteredArr.includes(contacts["Company Name"]) &&
        contacts["on_dnc"] !== "Y"
      ) {
        fs.writeFile("out.json", JSON.stringify(contacts), function (err) {
          if (err) {
            return console.log(err);
          }
          console.log(contacts);
          // console.log("The file was saved!");
        });
        converter.json2csv(contacts, (err, csv) => {
          if (err) {
            throw err;
          }
          console.log(csv);
        });
      }
    });
  });

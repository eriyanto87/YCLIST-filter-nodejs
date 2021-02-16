const fs = require("fs");
const readline = require("readline");
const stream = require("stream");

const csvFilterPath = "./yclist.csv";
const csvContactPath = "./combined.csv";

const instream = fs.createReadStream(csvFilterPath);
const outstream = new stream();
const rl = readline.createInterface(instream, outstream);

let filter = [];

rl.on("line", function (line) {
  filter.push(line);
});

rl.on("close", function () {
  // console.log('filter', filter);
  compareData(filter);
});

function compareData(filter) {
  const in2 = fs.createReadStream(csvContactPath);
  const out2 = new stream();
  const rl2 = readline.createInterface(in2, out2);

  let contacts = [];

  rl2.on("line", function (line) {
    contacts.push(line);
  });

  rl2.on("close", function () {
    const newContacts = contacts.filter(
      (c) => !filter.includes(c.split(",")[0])
    );
    // console.log('contacts', newContacts);
    newContacts.forEach((d) => {
      fs.appendFile("new-combined.csv", d + "\n", function (err) {
        if (err) throw err;
        console.log("Added");
      });
    });
  });
}

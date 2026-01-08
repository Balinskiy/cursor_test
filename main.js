const { readCampaignsFromCsv } = require("./csv");
const { generateCampaignMessage, describePerson } = require("./logic");

const campaigns = readCampaignsFromCsv("./report.csv");

const messages = campaigns
  .map(generateCampaignMessage)
  .filter((message) => message != null);

for (const message of messages) {
  console.log(message);
}

function demo() {
  console.log(describePerson("Alex", 25));
  console.log(describePerson("Mia", 16));
  console.log(describePerson("", 22));
  console.log(describePerson("John", -5));
  console.log(describePerson(null, 19));
}

demo();

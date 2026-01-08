const { readCampaignsFromCsv } = require("./csv");
const {
  generateCampaignMessageWH,
  generateCampaignMessageTEST,
  generateCampaignMessageALERT,
  describePerson,
} = require("./logic");

const mode = (process.argv[2] || "wh").toLowerCase();

let generator;

if (mode === "alert") {
  generator = generateCampaignMessageALERT;
} else if (mode === "test") {
  generator = generateCampaignMessageTEST;
} else {
  generator = generateCampaignMessageWH;
}

const campaigns = readCampaignsFromCsv("./report.csv");

const messages = campaigns
  .map(generator)
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

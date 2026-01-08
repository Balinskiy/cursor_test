const fs = require("fs");

function readCampaignsFromCsv(path) {
  const text = fs.readFileSync(path, "utf8");
  const trimmed = text.trim();
  if (!trimmed) return [];

  const lines = trimmed.split(/\r?\n/);
  const headers = lines[0].split(",").map((h) => h.trim());

  const toNumber = (v) => {
    if (v == null) return NaN;
    const s = String(v).trim();
    if (!s) return NaN;
    const n = Number(s);
    return Number.isFinite(n) ? n : NaN;
  };

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split(",").map((p) => p.trim());
    const obj = {};

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = parts[j] ?? "";
    }

    obj.spend = toNumber(obj.spend);
    obj.conversions = toNumber(obj.conversions);
    obj.cpaTarget = toNumber(obj.cpaTarget);

    rows.push(obj);
  }

  return rows;
}

module.exports = { readCampaignsFromCsv };

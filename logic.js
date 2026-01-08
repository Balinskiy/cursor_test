function isAdult(age) {
    if (age == null) return false;
    if (age < 0) return false;
    return age >= 18;
  }
  
  function describePerson(name, age) {
    const missingName = name == null || name === "";
    if (missingName) return "Unknown person";
  
    const invalidAge = age == null || age < 0;
    if (invalidAge) return "Invalid age";
  
    const adultMessage = `${name} is an adult`;
    const notAdultMessage = `${name} is not an adult`;
    return isAdult(age) ? adultMessage : notAdultMessage;
  }
  
  function generateCampaignMessage(campaign) {
    if (!campaign) return null;
  
    const status = String(campaign.status ?? "").toLowerCase().trim();
    const name = String(campaign.name ?? "").trim();
    const channel = String(campaign.channel ?? "").trim();
  
    const spend = Number.isFinite(campaign.spend) ? campaign.spend : 0;
    const conversions = Number.isFinite(campaign.conversions) ? campaign.conversions : 0;
    const cpaTarget = Number.isFinite(campaign.cpaTarget) ? campaign.cpaTarget : NaN;
  
    const cpa = conversions > 0 ? spend / conversions : Infinity;
  
    const formatNum = (n) => (Number.isFinite(n) ? n.toFixed(2) : "n/a");
    const targetText = Number.isFinite(cpaTarget) ? cpaTarget : "n/a";
  
    if (status === "paused") {
      return `[INFO] ${name} ${channel} paused spend ${formatNum(spend)} conv ${conversions}`;
    }
  
    if (status !== "active") return null;
  
    if (!Number.isFinite(cpaTarget)) {
      return `[WARN] ${name} ${channel} CPA ${formatNum(cpa)} target n/a conv ${conversions}`;
    }
  
    const ok = cpa <= cpaTarget;
    const warning = !ok && cpa <= cpaTarget * 1.2;
    const level = ok ? "OK" : warning ? "WARN" : "DANGER";
  
    return `[${level}] ${name} ${channel} CPA ${formatNum(cpa)} target ${targetText} conv ${conversions}`;
  }
  
  module.exports = {
    isAdult,
    describePerson,
    generateCampaignMessage,
  };
  
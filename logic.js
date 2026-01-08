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
  
  function generateCampaignMessageWH(campaign) {
    if (!campaign) return null;
    if (campaign.status !== "active") return null;
  
    const spend = campaign.spend;
    const conversions = campaign.conversions;
    const target = campaign.cpaTarget;
  
    const cpa = conversions > 0 ? spend / conversions : Infinity;
  
    if (!Number.isFinite(target)) {
      return `[WARN] ${campaign.name} ${campaign.channel} CPA ${cpa.toFixed(2)} target n/a conv ${conversions}`;
    }
  
    if (cpa <= target) {
      return `[OK] ${campaign.name} ${campaign.channel} CPA ${cpa.toFixed(2)} target ${target} conv ${conversions}`;
    }
  
    if (cpa <= target * 1.2) {
      return `[WARN] ${campaign.name} ${campaign.channel} CPA ${cpa.toFixed(2)} target ${target} conv ${conversions}`;
    }
  
    return `[DANGER] ${campaign.name} ${campaign.channel} CPA ${cpa.toFixed(2)} target ${target} conv ${conversions}`;
  }
  
  function generateCampaignMessageTEST(campaign) {
    if (!campaign) return null;
  
    if (campaign.status === "paused") {
      return `[INFO] ${campaign.name} ${campaign.channel} paused spend ${campaign.spend.toFixed(2)} conv ${campaign.conversions}`;
    }
  
    return generateCampaignMessageWH(campaign);
  }
  
  function generateCampaignMessageALERT(campaign) {
    if (!campaign) return null;
    if (campaign.status !== "active") return null;
  
    const spend = campaign.spend;
    const conversions = campaign.conversions;
    const target = campaign.cpaTarget;
  
    const cpa = conversions > 0 ? spend / conversions : Infinity;
  
    if (Number.isFinite(target) && cpa <= target) return null;
  
    if (!Number.isFinite(target)) {
      return `[WARN] ${campaign.name} ${campaign.channel} CPA ${cpa.toFixed(2)} target n/a conv ${conversions}`;
    }
  
    if (cpa <= target * 1.2) {
      return `[WARN] ${campaign.name} ${campaign.channel} CPA ${cpa.toFixed(2)} target ${target} conv ${conversions}`;
    }
  
    return `[DANGER] ${campaign.name} ${campaign.channel} CPA ${cpa.toFixed(2)} target ${target} conv ${conversions}`;
  }  
  
  module.exports = {
    isAdult,
    describePerson,
    generateCampaignMessageWH,
    generateCampaignMessageTEST,
    generateCampaignMessageALERT,
  };
  
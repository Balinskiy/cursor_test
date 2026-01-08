WH mode
Show only active campaigns.
Return one message for each active campaign.
Compute CPA as spend / conversions.
If conversions is 0 then CPA is Infinity.
If CPA <= target then level is OK.
If CPA > target and <= target*1.2 then level is WARN.
If CPA > target*1.2 then level is DANGER.

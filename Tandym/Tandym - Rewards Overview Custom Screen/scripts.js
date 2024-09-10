// Merchant Inputs

const merchantName = "tandym"; // Retrieve your Shopify store name from your Tandym account manager
const manageAccountBtnText = "Manage Account"; // Text for the Manage Account button
const rewardsBtnText = "My Rewards"; // Text for the My Rewards button


function tandymOpenRewards() {
  Tapcart.actions.openScreen({
    destination: { type: "internal", url: "/loyalty" },
  });
}

function tandymOpenServicing() {
  Tapcart.actions.openScreen({
    destination: { type: "internal", url: "https://bytandym.com/app" },
  });
}

function setIframeSrcUrl(merchant) {
  let srcUrl = `https://www.bytandym.com/rewards-overview/${merchant}-rewards?tapcart=true`;
  let iframe = document.querySelector(".tandym-program");
  iframe.src = srcUrl;
}

function setManageAccountText(mangeAcctText) {
  let manageAccount = document.querySelector(".manage-account");
  console.log(manageAccount);
  manageAccount.innerHTML = mangeAcctText;
}


function setRewardsText(rewardsText) {
  let rewards = document.querySelector(".my-rewards");
  rewards.innerHTML = rewardsText;
}

let main = () => {
  setIframeSrcUrl(merchantName);
  setManageAccountText(manageAccountBtnText);
  setRewardsText(rewardsBtnText);
}

main();
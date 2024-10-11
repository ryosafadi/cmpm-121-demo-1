import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Incremental Game Project";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const beatButton = document.createElement("button");
beatButton.innerHTML = '<font size = "20">🥁</font>';
app.append(beatButton);

let counter: number = 0;

const beats = document.createElement("div");
beats.innerHTML = `<font size = "6">${counter} Beats</font>`;
app.append(beats);

let growthMult: number = 0;

const growthRate = document.createElement("div");
growthRate.innerHTML = `<font size = "6">(${growthMult} beats/sec)</font>`;
app.append(growthRate);

let upgradeACost: number = 10;
let upgradeBCost: number = 100;
let upgradeCCost: number = 1000;

const beatUpgradeA = document.createElement("button");
beatUpgradeA.innerHTML = `<font size = "5">Increase Autobeats (by 0.1 units/sec) (Cost: ${upgradeACost} beats)</font>`;
app.append(beatUpgradeA);
beatUpgradeA.disabled = true;

const beatUpgradeB = document.createElement("button");
beatUpgradeB.innerHTML = `<font size = "5">Increase Autobeats (by 2 units/sec) (Cost: ${upgradeBCost} beats)</font>`;
app.append(beatUpgradeB);
beatUpgradeB.disabled = true;

const beatUpgradeC = document.createElement("button");
beatUpgradeC.innerHTML = `<font size = "5">Increase Autobeats (by 50 units/sec) (Cost: ${upgradeCCost} beats)</font>`;
app.append(beatUpgradeC);
beatUpgradeC.disabled = true;

let upgradeAPurchases: number = 0;
let upgradeBPurchases: number = 0;
let upgradeCPurchases: number = 0;

const aPurchasesText = document.createElement("div");
aPurchasesText.innerHTML = `<font size = "6">You have purchased Upgrade A ${upgradeAPurchases} times</font>`;
app.append(aPurchasesText);

const bPurchasesText = document.createElement("div");
bPurchasesText.innerHTML = `<font size = "6">You have purchased Upgrade B ${upgradeBPurchases} times</font>`;
app.append(bPurchasesText);

const cPurchasesText = document.createElement("div");
cPurchasesText.innerHTML = `<font size = "6">You have purchased Upgrade C ${upgradeCPurchases} times</font>`;
app.append(cPurchasesText);

//Event Listener to increment counter when button is clicked
beatButton.addEventListener("click", () => {
    counter++;
    beats.innerHTML = `<font size = "6">${counter} Beats</font>`;
});

//Event Listeners to increase beat growth rate when respective button is clicked
beatUpgradeA.addEventListener("click", () => {
    counter -= upgradeACost;
    growthMult += 0.1;
    upgradeAPurchases++;
    upgradeACost *= 1.15;

    aPurchasesText.innerHTML = `<font size = "6">You have purchased Upgrade A ${upgradeAPurchases} times</font>`;
    beatUpgradeA.innerHTML = `<font size = "5">Increase Autobeats (by 0.1 units/sec) (Cost: ${upgradeACost} beats)</font>`;
    growthRate.innerHTML = `<font size = "6">(${growthMult.toFixed(1)} beats/sec)</font>`;
});

beatUpgradeB.addEventListener("click", () => {
    counter -= upgradeBCost;
    growthMult += 2;
    upgradeBPurchases++;
    upgradeBCost *= 1.15;

    bPurchasesText.innerHTML = `<font size = "6">You have purchased Upgrade B ${upgradeBPurchases} times</font>`;
    beatUpgradeB.innerHTML = `<font size = "5">Increase Autobeats (by 2 units/sec) (Cost: ${upgradeBCost} beats)</font>`;
    growthRate.innerHTML = `<font size = "6">(${growthMult.toFixed(1)} beats/sec)</font>`;
});

beatUpgradeC.addEventListener("click", () => {
    counter -= upgradeCCost;
    growthMult += 50;
    upgradeCPurchases++;
    upgradeCCost *= 1.15;

    cPurchasesText.innerHTML = `<font size = "6">You have purchased Upgrade C ${upgradeCPurchases} times</font>`;
    beatUpgradeC.innerHTML = `<font size = "5">Increase Autobeats (by 50 units/sec) (Cost: ${upgradeCCost} beats)</font>`;
    growthRate.innerHTML = `<font size = "6">(${growthMult.toFixed(1)} beats/sec</font>)`;
});

//Update counter by the proper amount every frame
let previousTime = performance.now();

function updateCounter(currentTime: number) {
    const deltaTime = (currentTime - previousTime) / 1000;
    previousTime = currentTime;

    counter += growthMult * deltaTime; 

    beats.innerHTML = `<font size="6">${Math.floor(counter)} Beats</font>`;

    requestAnimationFrame(updateCounter);
}

function checkVars() {
    if (counter >= upgradeACost) beatUpgradeA.disabled = false;
    else beatUpgradeA.disabled = true;

    if (counter >= upgradeBCost) beatUpgradeB.disabled = false;
    else beatUpgradeB.disabled = true;

    if (counter >= upgradeCCost) beatUpgradeC.disabled = false;
    else beatUpgradeC.disabled = true;

    requestAnimationFrame(checkVars);
}

requestAnimationFrame(checkVars);
requestAnimationFrame(updateCounter);
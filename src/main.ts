import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Drummin'!";
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
growthRate.innerHTML = `<font size = "6">(${growthMult} beats/second)</font>`;
app.append(growthRate);

let pedalUpgrade: number = 10;
let armUpgrade: number = 100;
let bonoboUpgrade: number = 1000;

const pedalButton = document.createElement("button");
pedalButton.innerHTML = `<font size = "5">Autopedal (0.1 units/sec) (Cost: ${pedalUpgrade} beats)</font>`;
app.append(pedalButton);
pedalButton.disabled = true;

const armButton = document.createElement("button");
armButton.innerHTML = `<font size = "5">Extra Arm (2 units/sec) (Cost: ${armUpgrade} beats)</font>`;
app.append(armButton);
armButton.disabled = true;

const bonoboButton = document.createElement("button");
bonoboButton.innerHTML = `<font size = "5">Bonobo! (50 units/sec) (Cost: ${bonoboUpgrade} beats)</font>`;
app.append(bonoboButton);
bonoboButton.disabled = true;

let pedalPurchases: number = 0;
let armPurchases: number = 0;
let bonoboPurchases: number = 0;

const pedalCount = document.createElement("div");
pedalCount.innerHTML = `<font size = "6">You have upgraded the autopedal ${pedalPurchases} times</font>`;
app.append(pedalCount);

const armCount = document.createElement("div");
armCount.innerHTML = `<font size = "6">You have ${armPurchases} extra arms</font>`;
app.append(armCount);

const bonoboCount = document.createElement("div");
bonoboCount.innerHTML = `<font size = "6">You have ${bonoboPurchases} bonobos</font>`;
app.append(bonoboCount);

//Event Listener to increment counter when button is clicked
beatButton.addEventListener("click", () => {
    counter++;
    beats.innerHTML = `<font size = "6">${counter} Beats</font>`;
});

//Event Listeners to increase beat growth rate when respective button is clicked
pedalButton.addEventListener("click", () => {
    counter -= pedalUpgrade;
    growthMult += 0.1;
    pedalPurchases++;
    pedalUpgrade *= 1.15;

    pedalCount.innerHTML = `<font size = "6">You have upgraded the autopedal ${pedalPurchases} times</font>`;
    pedalButton.innerHTML = `<font size = "5">Autopedal (0.1 units/sec) (Cost: ${pedalUpgrade} beats)</font>`;
    growthRate.innerHTML = `<font size = "6">(${growthMult.toFixed(1)} beats/sec)</font>`;
});

armButton.addEventListener("click", () => {
    counter -= armUpgrade;
    growthMult += 2;
    armPurchases++;
    armUpgrade *= 1.15;

    armCount.innerHTML = `<font size = "6">You have ${armPurchases} extra arms</font>`;
    armButton.innerHTML = `<font size = "5">Extra Arm (2 units/sec) (Cost: ${armUpgrade} beats)</font>`;
    growthRate.innerHTML = `<font size = "6">(${growthMult.toFixed(1)} beats/sec)</font>`;
});

bonoboButton.addEventListener("click", () => {
    counter -= bonoboUpgrade;
    growthMult += 50;
    bonoboPurchases++;
    bonoboUpgrade *= 1.15;

    bonoboCount.innerHTML = `<font size = "6">You have ${bonoboPurchases} bonobos</font>`;
    bonoboButton.innerHTML = `<font size = "5">Bonobo! (50 units/sec) (Cost: ${bonoboUpgrade} beats)</font>`;
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
    if (counter >= pedalUpgrade) pedalButton.disabled = false;
    else pedalButton.disabled = true;

    if (counter >= armUpgrade) armButton.disabled = false;
    else armButton.disabled = true;

    if (counter >= bonoboUpgrade) bonoboButton.disabled = false;
    else bonoboButton.disabled = true;

    requestAnimationFrame(checkVars);
}

requestAnimationFrame(checkVars);
requestAnimationFrame(updateCounter);
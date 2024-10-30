import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Drummin'!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const beatButton = document.createElement("h2");
beatButton.innerHTML = '🥁';
app.append(beatButton);

let counter: number = 0;

const beats = document.createElement("div");
beats.innerHTML = `<font size = "6">${counter} Beats</font>`;
app.append(beats);

let growthMult: number = 0;

const growthRate = document.createElement("div");
growthRate.innerHTML = `<font size = "6">(${growthMult} beats/second)</font>`;
app.append(growthRate);

beatButton.addEventListener("click", () => {
  beatButton.classList.add("shake"); // Inspired by: https://github.com/rozy-dixon/cmpm-121-demo-1/blob/main/src/main.ts

  counter++;
  beats.innerHTML = `<font size = "6">${counter} Beats</font>`;

  setTimeout(() => {
    beatButton.classList.remove("shake");
  }, 200);
});

interface Item {
  name: string;
  description: string;
  cost: number;
  rate: number;
  purchases: number;
  button: HTMLButtonElement;
  display: HTMLDivElement;
}

const availableItems: Item[] = [
  {
    name: "Autopedal",
    description: "Let your foot take a break as the autopedal keeps the beat!",
    cost: 10,
    rate: 0.1,
    purchases: 0,
    button: document.createElement("button"),
    display: document.createElement("div"),
  },
  {
    name: "Extra Arm",
    description: "Need a hand? How about an extra arm for those tricky solos!",
    cost: 100,
    rate: 2,
    purchases: 0,
    button: document.createElement("button"),
    display: document.createElement("div"),
  },
  {
    name: "Bonobo",
    description: "A curious Bonobo who knows just how to hit those drums.",
    cost: 1000,
    rate: 50,
    purchases: 0,
    button: document.createElement("button"),
    display: document.createElement("div"),
  },
  {
    name: "Magic Drumstick",
    description:
      "These enchanted sticks allow you to drum faster than ever before!",
    cost: 10000,
    rate: 200,
    purchases: 0,
    button: document.createElement("button"),
    display: document.createElement("div"),
  },
  {
    name: "Drum Machine AI",
    description:
      "An artificial intelligence to help you create complex rhythms effortlessly.",
    cost: 100000,
    rate: 5000,
    purchases: 0,
    button: document.createElement("button"),
    display: document.createElement("div"),
  },
];

const COST_MULT = 1.15;

for (const item of availableItems) {
  item.button.innerHTML = `${item.name} (Cost: ${item.cost} beats)`;
  item.button.title = item.description;
  item.button.disabled = true;

  item.button.addEventListener("click", () => {
    counter -= item.cost;
    growthMult += item.rate;
    item.purchases++;
    item.cost *= COST_MULT;

    item.button.innerHTML = `${item.name} (Cost: ${item.cost.toFixed(2)} beats)`;
    growthRate.innerHTML = `<font size="6">(${growthMult.toFixed(1)} beats/sec)</font>`;
    
    item.display.innerHTML = `You have purchased ${item.purchases} ${item.name}(s)`;
  });

  item.display = document.createElement("div");
  item.display.innerHTML = `You have purchased ${item.purchases} ${item.name}(s)`;
}

for (const item of availableItems) {
  app.append(item.button);
}

for (const item of availableItems) {
  app.append(item.display);
}

const CHEAT_AMOUNT = 100000;

const cheatButton = document.createElement("button");
cheatButton.innerHTML = `Cheat: Instant ${CHEAT_AMOUNT} beats!`;
app.append(cheatButton);

cheatButton.addEventListener("click", () => {
  counter += CHEAT_AMOUNT;
  beats.innerHTML = `<font size = "6">${counter} Beats</font>`;
});

let previousTime = performance.now();

function updateCounter(currentTime: number) {
  const deltaTime = (currentTime - previousTime) / 1000;
  previousTime = currentTime;

  counter += growthMult * deltaTime;

  beats.innerHTML = `<font size="6">${Math.floor(counter)} Beats</font>`;

  requestAnimationFrame(updateCounter);
}

function checkVars() {
  for (const item of availableItems) {
    if (counter >= item.cost) item.button.disabled = false;
    else item.button.disabled = true;
  }

  requestAnimationFrame(checkVars);
}

requestAnimationFrame(checkVars);
requestAnimationFrame(updateCounter);

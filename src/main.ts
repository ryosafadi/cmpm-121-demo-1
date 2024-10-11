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

//Event Listener to increment counter when button is clicked
beatButton.addEventListener("click", () => {
  counter++;
  beats.innerHTML = `<font size = "6">${counter} Beats</font>`;
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

for (const item of availableItems) {
  item.button.innerHTML = `${item.name} (Cost: ${item.cost} beats)`;
  item.button.title = item.description; //Flavor text when the button is hovered
  app.append(item.button);
  item.button.disabled = true;

  item.button.addEventListener("click", () => {
    counter -= item.cost;
    growthMult += item.rate;
    item.purchases++;
    item.cost *= 1.15;

    item.button.innerHTML = `${item.name} (Cost: ${item.cost.toFixed(2)} beats)`;
    growthRate.innerHTML = `<font size = "6">(${growthMult.toFixed(1)} beats/sec)</font>`;
  });
}

for (const item of availableItems) {
  item.display = document.createElement("div");
  item.display.innerHTML = `You have purchased ${item.purchases} ${item.name}s`;
  app.append(item.display);

  item.button.addEventListener("click", () => {
    item.display.innerHTML = `You have purchased ${item.purchases} ${item.name}s`;
  });
}

const cheatButton = document.createElement("button");
cheatButton.innerHTML = "Cheat: Instant 100000 beats!";
app.append(cheatButton);

cheatButton.addEventListener("click", () => {
  counter += 100000;
  beats.innerHTML = `<font size = "6">${counter} Beats</font>`;
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
  for (const item of availableItems) {
    if (counter >= item.cost) item.button.disabled = false;
    else item.button.disabled = true;
  }

  requestAnimationFrame(checkVars);
}

requestAnimationFrame(checkVars);
requestAnimationFrame(updateCounter);

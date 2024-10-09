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

const autoBeatButton = document.createElement("button");
autoBeatButton.innerHTML = '<font size = "20">Increase Autobeats</font>';
app.append(autoBeatButton);
autoBeatButton.disabled = true;

let counter: number = 0;

const beats = document.createElement("div");
beats.innerHTML = `<font size = "6">${counter} Beats</font>`;
app.append(beats);

//Event Listener to increment counter when button is clicked
beatButton.addEventListener("click", () => {
    counter++;
    beats.innerHTML = `<font size = "6">${counter} Beats</font>`;
});

let growthMult: number = 0;

//Event Listener to increase beat growth rate when button is clicked
autoBeatButton.addEventListener("click", () => {
    counter -= 10;
    growthMult++;
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
    if (counter >= 10) autoBeatButton.disabled = false;
    else autoBeatButton.disabled = true;
    requestAnimationFrame(checkVars);
}

requestAnimationFrame(checkVars);
requestAnimationFrame(updateCounter);
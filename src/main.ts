import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Incremental Game Project";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = '<font size = "20">🥁</font>';
app.append(button);

let counter: number = 0;

const beats = document.createElement("div");
beats.innerHTML = `<font size = "6">${counter} Beats</font>`;
app.append(beats);

//Event Listener to increment counter when button is clicked
button.addEventListener("click", () => {
    counter++;
    beats.innerHTML = `<font size = "6">${counter} Beats</font>`;
})
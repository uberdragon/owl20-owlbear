import OBR from "@owlbear-rodeo/sdk";
import he from 'he';
import { themeManager } from "./theme";
import "./style.css";

let prevChar = "prev"

const renderRoll = (request) =>{
    let html = '';
    const char = `${request.character}-${request.playerName}`;
    if (char !== prevChar) {
      // only show the character/player header if it changes.
      html = `<h3><span title="${he.encode(request.playerName)}" class=playerBubble style="background-color:${request.playerColor}"></span>${he.encode(request.character)}</h3>`
    }
    html += request.html;

    const element = document.querySelector("#rolls-list");
    const node = document.createElement("div");
    node.innerHTML = html;
    element.appendChild(node); 
    window.scrollTo(0, document.body.scrollHeight);
    prevChar = char;
}

const broadcastRoll = async (request) => {
    // load sound every time because I want to play 3 at a time if someone 3-clicked.
    const sound = new Audio('dice-89594.mp3');
    sound.load();
    sound.play();      
    request.playerColor = await OBR.player.getColor();
    request.playerName = await OBR.player.getName();

    OBR.broadcast.sendMessage("owl20.roll", request, {destination:"ALL"});
}

const broadcastHP = async (request) => {
    // This broadast can be picked up by other extensions.
    request.playerColor = await OBR.player.getColor();
    request.playerName = await OBR.player.getName();

    OBR.broadcast.sendMessage("owl20.hp", request, {destination:"ALL"});
}


addEventListener("message", (event) => { 
  //broadcastRoll(event) 
  switch(event.data.type) {
    case 'Beyond20_Roll':
      broadcastRoll(event.data.data);
      break;
    case 'Beyond20_UpdateHP':
      broadcastHP(event.data.data);
      break;      
    default:
      //Ignore unknown messages silently
  }
})

OBR.onReady(() => {
  console.log("owl20-owlbear: OBR Ready")
  OBR.broadcast.onMessage("owl20.roll", (event) => {
      renderRoll(event.data); 
  })
  themeManager()
  // sa-event : room is unique enough, but non identifyable.
  window.sa_event("room",{ slug: OBR.room.id.substring(0,4)});
})

window.OBR = OBR
import OBR from "@owlbear-rodeo/sdk";
import he from 'he';
import "./style.css";
import { themeManager } from "./theme";

const renderHP = (request) =>{
    /*
    what do i even want to render?
    do i need a framework/library?
    */
}

OBR.onReady(() => {
  OBR.broadcast.onMessage("owl20.hp", (event) => {
      renderHP(event.data); 
  })
  themeManager()
})

window.OBR = OBR
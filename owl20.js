import OBR from "@owlbear-rodeo/sdk";



const renderRoll = (html) =>{
    const element = document.querySelector("#rolls-list");
    const node = document.createElement("div");
    node.innerHTML = html;
    element.appendChild(node); 
    window.scrollTo(0, document.body.scrollHeight);
}

const broadcastRoll = (request) =>{
    // load sound every time because I want to play 5 at a time if someone 5-clicked.
    const sound = new Audio('dice-89594.mp3');
    sound.load();
    sound.play();      
    const html = `<h3>${request.character}</h3> ${request.html}`;
    OBR.broadcast.sendMessage("owl20.roll", html, {destination:"ALL"});
}

addEventListener("message", (event) => { 
  //broadcastRoll(event) 
  switch(event.data.type) {
    case 'Beyond20_Roll':
      console.log("owl20-owlbear: Broadcasting roll:", event.data.data);
      broadcastRoll(event.data.data);
      break;
    default:
      //Ignore unknown messages silently
  }
})




const themeManager  = async () => {
  const setTheme = (theme) => {
      console.log(theme)
      document.body.setAttribute('data-theme',theme.mode);
  }
  let theme = await OBR.theme.getTheme();
  setTheme(theme)
  OBR.theme.onChange((theme) => {
    setTheme(theme)
  })
}


  
OBR.onReady(() => {
  console.log("owl20-owlbear: OBR Ready")
  OBR.broadcast.onMessage("owl20.roll", (event) => {
      renderRoll(event.data); 
  })
  themeManager()
})

window.OBR = OBR
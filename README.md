## DEV

Local development
* Install Beyond20 browser extension
* Whitelist Https://www.owlbear.com in Beyond20 browser extension
* Install Owl20 browser extension
* `npm run dev`
* add http://localhost:5173/manifest.json as an owlbear extension.



Who's controlling who?
```mermaid
graph TD
    beyond20-->www.dndbeyond.com
    beyond20-->www.owlbear.com
    owl20-->www.owlbear.com
    owl20-->iframe
    iframe-->owlbear-extension

    subgraph www.owlbear.com
        iframe
        owlbear-extension
    end    
```

Data Flow
```mermaid
graph TD
  mouse-click-->beyond20-internal-event-->DOM-event-->Transform-->window.postMessage-->OBR.broadcast-->Display

    subgraph owlbear.com
        DOM-event
        subgraph iframe[iframe:owlbear extension]
            window.postMessage
            OBR.broadcast
            Display[Display to all members in the room]
        end    
    end    

    subgraph dndbeyond.com
        mouse-click
    end    

    subgraph beyond20[Beyond20 browwer ext]
        beyond20-internal-event
    end   

    subgraph owl20[Owl20 Browser ext]
        Transform[Broadcast DOM event to iframe]
    end    

```

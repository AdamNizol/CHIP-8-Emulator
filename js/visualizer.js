class visualizer{
  constructor(em){
    this.em = em; //reference to parent emulator object
  }

  init(){
    this.generatePixels();

    document.getElementById("resetColours").onclick = () => {
      document.getElementById("primaryColour").value = "#ffffff";
      document.getElementById("secondaryColour").value = "#000000";
      this.em.updateScreen();
    }

    document.getElementById("primaryColour").onchange = () => { this.em.updateScreen(); }
    document.getElementById("secondaryColour").onchange = () => { this.em.updateScreen(); }

    document.getElementById("stepBackBtn").onclick = () => {this.em.undo()}
    document.getElementById("stepForwardBtn").onclick = () => {this.em.emulationLoop();}
    document.getElementById("playPauseBtn").onclick = () => {this.em.togglePause()}

    document.getElementById("legacyCheck").onchange = () => {
      if(document.getElementById("legacyCheck").checked){
        this.em.legacyMode = true;
      }else{
        this.em.legacyMode = false;
      }
    }
    document.getElementById("testing").onclick = () => {
      chip.initializeData();
      testInstructions();
    }
    document.getElementById("loadBtn").onclick = () => {
      this.em.loadProgram(document.getElementById('code').value);
      this.updatePaused(1);
      this.updateHistory();
    }

    document.getElementById("loadFileBtn").onclick = () => {document.getElementById("fileInput").click()}
    document.getElementById("fileInput").onchange = () => {
      let reader = new FileReader();
      //reader.readAsText(document.getElementById("fileInput").files[0]);
      //reader.readAsBinaryString(document.getElementById("fileInput").files[0]);
      reader.readAsArrayBuffer(document.getElementById("fileInput").files[0]);
      reader.onloadend = (event) => {
        let ia = new Uint8Array(reader.result);
        let output = [...ia].map((n) => ("00" + parseInt(("00000000"+n.toString(2)).slice(-8), 2).toString(16)).slice(-2) ).join(' ');
        output = this.fixHexCodeSpacing(output);
        console.log(output);
        document.getElementById("code").innerHTML = output;
      }
    }

    document.getElementById("loadAssemblyFileBtn").onclick = () => {document.getElementById("assemblyFileInput").click()}
    document.getElementById("assemblyFileInput").onchange = () => {
      let reader = new FileReader();
      reader.readAsText(document.getElementById("assemblyFileInput").files[0]);
      //reader.readAsBinaryString(document.getElementById("fileInput").files[0]);
      //reader.readAsArrayBuffer(document.getElementById("fileInput").files[0]);
      reader.onloadend = (event) => {
        let output = reader.result;
        let aCompiler = new chip8Compiler();
        output = aCompiler.compileMneonicToOpcodes(output);
        //console.log(output);
        document.getElementById("code").innerHTML = output;
      }
    }

    document.getElementById("speedSlider").oninput = () => {
      let val = document.getElementById("speedSlider").value;
      if(val < 1){
        this.em.speed = 10- 10*val;
      }else{
        this.em.speed = 1 - (val-1)
      }
    }
    document.getElementById("resetSpeed").onclick = () => {document.getElementById("speedSlider").value = 1; this.em.speed = 1;};

    //keyboard events:
    document.addEventListener('keydown', (e) => {
      switch(e.key){
        case 'x': //0
          if(!this.em.keyInput['0']){
            //console.log("0 t");
            this.em.keyInput['0'] = true;
          }
          break;
        case '1': //1
          if(!this.em.keyInput['1']){
            //console.log("1 t");
            this.em.keyInput['1'] = true;
          }
          break;
        case '2': //2
          if(!this.em.keyInput['2']){
            //console.log("2 t");
            this.em.keyInput['2'] = true;
          }
          break;
        case '3': //3
          if(!this.em.keyInput['3']){
            //console.log("3 t");
            this.em.keyInput['3'] = true;
          }
          break;
        case 'q': //4
          if(!this.em.keyInput['4']){
            //console.log("4 t");
            this.em.keyInput['4'] = true;
          }
          break;
        case 'w': //5
          if(!this.em.keyInput['5']){
            //console.log("5 t");
            this.em.keyInput['5'] = true;
          }
          break;
        case 'e': //6
          if(!this.em.keyInput['6']){
            //console.log("6 t");
            this.em.keyInput['6'] = true;
          }
          break;
        case 'a': //7
          if(!this.em.keyInput['7']){
            //console.log("7 t");
            this.em.keyInput['7'] = true;
          }
          break;
        case 's': //8
          if(!this.em.keyInput['8']){
            //console.log("8 t");
            this.em.keyInput['8'] = true;
          }
          break;
        case 'd': //9
          if(!this.em.keyInput['9']){
            //console.log("9 t");
            this.em.keyInput['9'] = true;
          }
          break;
        case 'z': //a
          if(!this.em.keyInput['a']){
            //console.log("a t");
            this.em.keyInput['a'] = true;
          }
          break;
        case 'c': //b
          if(!this.em.keyInput['b']){
            //console.log("b t");
            this.em.keyInput['b'] = true;
          }
          break;
        case '4': //c
          if(!this.em.keyInput['c']){
            //console.log("c t");
            this.em.keyInput['c'] = true;
          }
          break;
        case 'r': //d
          if(!this.em.keyInput['d']){
            //console.log("d t");
            this.em.keyInput['d'] = true;
          }
          break;
        case 'f': //e
          if(!this.em.keyInput['e']){
            //console.log("e t");
            this.em.keyInput['e'] = true;
          }
          break;
        case 'v': //f
          if(!this.em.keyInput['f']){
            //console.log("f t");
            this.em.keyInput['f'] = true;
          }
          break;
      }
      //console.log("down: "+ e.key);
    });
    document.addEventListener('keyup', (e) => {
      switch(e.key){
        case 'x': //0
          if(this.em.keyInput['0']){
            //console.log("0 f");
            this.em.keyInput['0'] = false;
          }
          break;
        case '1': //1
          if(this.em.keyInput['1']){
            //console.log("1 f");
            this.em.keyInput['1'] = false;
          }
          break;
        case '2': //2
          if(this.em.keyInput['2']){
            //console.log("2 f");
            this.em.keyInput['2'] = false;
          }
          break;
        case '3': //3
          if(this.em.keyInput['3']){
            //console.log("3 f");
            this.em.keyInput['3'] = false;
          }
          break;
        case 'q': //4
          if(this.em.keyInput['4']){
            //console.log("4 f");
            this.em.keyInput['4'] = false;
          }
          break;
        case 'w': //5
          if(this.em.keyInput['5']){
            //console.log("5 f");
            this.em.keyInput['5'] = false;
          }
          break;
        case 'e': //6
          if(this.em.keyInput['6']){
            //console.log("6 f");
            this.em.keyInput['6'] = false;
          }
          break;
        case 'a': //7
          if(this.em.keyInput['7']){
            //console.log("7 f");
            this.em.keyInput['7'] = false;
          }
          break;
        case 's': //8
          if(this.em.keyInput['8']){
            //console.log("8");
            this.em.keyInput['8'] = false;
          }
          break;
        case 'd': //9
          if(this.em.keyInput['9']){
            //console.log("9 f");
            this.em.keyInput['9'] = false;
          }
          break;
        case 'z': //a
          if(this.em.keyInput['a']){
            //console.log("a f");
            this.em.keyInput['a'] = false;
          }
          break;
        case 'c': //b
          if(this.em.keyInput['b']){
            //console.log("b f");
            this.em.keyInput['b'] = false;
          }
          break;
        case '4': //c
          if(this.em.keyInput['c']){
            //console.log("c f");
            this.em.keyInput['c'] = false;
          }
          break;
        case 'r': //d
          if(this.em.keyInput['d']){
            //console.log("d f");
            this.em.keyInput['d'] = false;
          }
          break;
        case 'f': //e
          if(this.em.keyInput['e']){
            //console.log("e f");
            this.em.keyInput['e'] = false;
          }
          break;
        case 'v': //f
          if(this.em.keyInput['f']){
            //console.log("f f");
            this.em.keyInput['f'] = false;
          }
          break;
      }
      //console.log("up: "+e.key);
    });
  }

  generatePixels(){
    let pixels = document.getElementById("pixels");
    for(let i=0; i<32; i++){
      let row = document.createElement("div");
      row.className += "pixelRow"
      pixels.appendChild(row);

      for(let j=0; j<64; j++){
        let pixel = document.createElement("div");
        pixel.className += "pixel";
        row.appendChild(pixel);
      }
    }
  }

  setPixel(index, value){
    if(index < 64*32){
      let rowNum = Math.floor( (index)/64);
      let colNum = (index)%64;

      let pixelDom = document.getElementById("pixels").childNodes;
      pixelDom = pixelDom[rowNum+1].childNodes;
      pixelDom = pixelDom[colNum];
      //pixelDom is the pixel's DOM element
      if(value){
        pixelDom.style.backgroundColor = document.getElementById("primaryColour").value;
      }else{
        pixelDom.style.backgroundColor = document.getElementById("secondaryColour").value;
      }
    }
  }

  fixHexCodeSpacing(string){//joining bytes together to result sets of 2 bytes
    let deleteSpace = true;
    let output = "";
    let lastPosition = 0;
    for(let i = 0; i < string.length; i++){
      if(string[i] == ' '){
        if(deleteSpace == true){
          let currentByte = string.slice(lastPosition, i);
          output = output + currentByte;
          deleteSpace = false;
          lastPosition = i+1;
        }else{
          let currentByte = string.slice(lastPosition, i+1);
          output = output + currentByte.toString();
          deleteSpace = true;
          lastPosition = i+1;
        }
      }
      else if(i == string.length - 1){
        let currentByte = string.slice(lastPosition, i+1);
        output = output + currentByte.toString();
      }
    }
    return output;
  }

  runCode(){
    let lines = document.getElementById('code').value.split('\n');
    for(let i=0; i< lines.length; i++){
      this.em.executeInstruction(lines[i]);
    }
  }

  updatePaused(state){ //state is 1 if paused, 0 if not.
    if(state){//paused
      document.getElementById("playPauseBtn").style.backgroundImage = "url('Images/playBtn.png')";
      document.getElementById("playPauseBtn").title = "Play"
    }else{
      document.getElementById("playPauseBtn").style.backgroundImage = "url('Images/pauseBtn.png')";
      document.getElementById("playPauseBtn").title = "Pause"
    }
  }
  updateRegistersV(){
    let registerDoms = document.getElementById("registersV");
    for(let i=0; i<15; i++){
      registerDoms.children[i].children[1].innerHTML = this.em.registersV[i];
    }
    registerDoms.children[15].children[1].innerHTML = this.em.VF.toString();
  }
  updateRegisterI(){
    document.getElementById("registerI").children[0].children[1].innerHTML = this.em.registerI
  }
  updateRegisterDelay(){
    document.getElementById("registerDelay").children[0].children[1].innerHTML = this.em.registerDelay
  }
  updateRegisterSoundTimer(){
    document.getElementById("registerSoundTimer").children[0].children[1].innerHTML = this.em.registerSoundTimer
  }
  updateProgramCounter(){
    document.getElementById("programCounter").children[0].children[1].innerHTML = this.em.programCounter
  }
  updateStackPointer(){
    document.getElementById("stackPointer").children[0].children[1].innerHTML = this.em.stackPointer.toString(16)
  }
  updateStack(){}
  updateMemory(){}
  updateVF(){
    this.updateRegistersV();
    //document.getElementById("VF").children[0].children[1].innerHTML = this.em.VF.toString()
  }
  updateHistory(){
    let h = document.getElementsByClassName("historyIns");
    if(this.em.undoStack.length == 0){ //fill with 0000
      for(let i=0; i< h.length; i++){
        h[i].innerHTML = "0000"
      }
    }else{
      let usLen = this.em.undoStack.length
      for(let i = 0; i < Math.min(h.length, this.em.undoStack.length); i++){
        h[i].innerHTML = this.em.undoStack[usLen-1-i][0]
        //console.log("h:"+ this.em.undoStack[usLen-1-i][0].toString())
      }
      for(let i = Math.min(h.length, this.em.undoStack.length); i < h.length; i++){
        h[i].innerHTML = "0000"
        //console.log("h:"+ this.em.undoStack[usLen-1-i][0].toString())
      }

    }
    //console.log(parseInt(this.em.programCounter, 16))
    document.getElementById("nextIntruction").innerHTML = this.em.memory[parseInt(this.em.programCounter, 16) ] + this.em.memory[parseInt(this.em.programCounter, 16)+1 ]
  }

}

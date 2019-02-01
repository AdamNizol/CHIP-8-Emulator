class visualizer{
  constructor(em){
    this.em = em; //reference to parent emulator object
  }

  init(){
    this.generatePixels();
    document.getElementById("resetColours").onclick = function(){
      document.getElementById("primaryColour").value = "#ffffff";
      document.getElementById("secondaryColour").value = "#000000";
      chip.updateScreen();
    }
    document.getElementById("primaryColour").onchange = function(){ chip.updateScreen(); }
    document.getElementById("secondaryColour").onchange = function(){ chip.updateScreen(); }
    document.getElementById("stepBackBtn").onclick = function(){chip.undo()}
    document.getElementById("stepForwardBtn").onclick = function(){chip.emulationLoop();}
    document.getElementById("playPauseBtn").onclick = function(){chip.togglePause()}
    document.getElementById("loadBtn").onclick = function(){chip.loadProgram(document.getElementById('code').value); chip.vis.updatePaused(1)}
    document.getElementById("speedSlider").oninput = function(){
      if(this.value < 1){
        chip.speed = 10- 10*this.value;
      }else{
        chip.speed = 1 - (this.value-1)
      }
    }
    document.getElementById("resetSpeed").onclick = function(){document.getElementById("speedSlider").value = 1; chip.speed = 1;};
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

  runCode(){
    let lines = document.getElementById('code').value.split('\n');
    for(let i=0; i< lines.length; i++){
      chip.executeInstruction(lines[i]);
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
    for(let i=0; i<16; i++){
      registerDoms.children[i].children[1].innerHTML = this.em.registersV[i]
    }
  }
  updateRegisterI(){}
  updateRegisterDelay(){}
  updateRegisterSoundTimer(){}
  updateProgramCounter(){}
  updateStackPointer(){}
  updateStack(){}
  updateMemory(){}
  updateVF(){}

}
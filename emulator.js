class emulator{
  constructor(){
    this.pixels = this.separatePixels(title);
    this.vis = new visualizer();
  }

  start(){
    this.vis.init();
    this.updateScreen();
  }


  //Updates the screen given a binary array and a starting index
  updateScreen(pix = this.pixels, start = 0){
    for(let i=0; (i<pix.length)&&(i+start < 64*32); i++){
      this.pixels[(i+start)] = pix[i]; //update pixel in internal screen state
      this.vis.setPixel((i+start), pix[i]); //update pixel in visualizer
    }
  }

  executeInstruction(ins){ //ins is a 4-character string with each character beteen 0-1 or a-f/A-F
    switch(ins[0]){
      case "0":
        switch(ins.substring(1,4)){

          case "0E0":// 00E0 - CLS - Clear the display
          case "0e0":
            this.updateScreen(new Array(64*32));
            //when the undo stack is implemented. add to it here
            break;
        }
        break;

      case "1":
        break;

      case "2":
        break;

      case "3":
        break;

      case "4":
        break;

      case "5":
        break;

      case "6":
        break;

      case "7":
        break;

      case "8":
        break;

      case "9":
        break;

      case "a":
      case "A":
        break;

      case "b":
      case "B":
        break;

      case "c":
      case "C":
        break;

      case "d":
      case "D":
        break;

      case "e":
      case "E":
        break;

      case "f":
      case "F":
        break;

    }
  }

  separatePixels(pixString){ //converts binary string into an int array
    let result = [];
    for(let i=0;i<pixString.length;i++){
      result.push(parseInt(pixString[i],2));
    }
    return result;
  }

}
let chip = new emulator();

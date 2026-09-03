import {GUI} from 'lil-gui'

class Controls {
  gui?: GUI
  _targetIndex: number = 0
  params: any =  {
    isTimePaused: false,
    debugTime: 0,
    stopTransition: false,
    activeIndex: 0,
  }
  constructor() {
  }

  init (){
    this.gui = new GUI()

    const timeFolder = this.gui.addFolder('Time')
    timeFolder.open()
    let debugTimeController = timeFolder.add(this.params, 'debugTime', 0, 1000).name('Debug Time')
    debugTimeController.domElement.style.pointerEvents = 'none';
    debugTimeController.domElement.style.opacity = '0.5';
    timeFolder.add(this.params, 'isTimePaused').name('Pause Time').onChange((value: boolean) => {
      if(value){
        debugTimeController.domElement.style.pointerEvents = 'auto';
        debugTimeController.domElement.style.opacity = '1.0';
      } else {
        debugTimeController.domElement.style.pointerEvents = 'none';
        debugTimeController.domElement.style.opacity = '0.5';
      }
    })
  }
}

export default new Controls
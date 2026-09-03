import {GUI} from 'lil-gui'

class Controls {
  gui?: GUI
  _targetIndex: number = 0
  params: any =  {
    renderMode: 0,
    isTimePaused: false,
    debugTime: 0,
    stopTransition: false,
    activeIndex: 0,
  }
  constructor() {
  }

  init (onRenderModeChange: (mode: number) => void){
    this.gui = new GUI()

    this.gui.add(this.params, 'renderMode', {
      uvw: 0,
      innerShadow: 1,
      'simplex noise': 2,
    }).name('Render Mode').onChange(onRenderModeChange)

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
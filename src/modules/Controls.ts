import {GUI} from 'lil-gui'

export enum RenderMode {
  Uvw,
  InnerShadow,
  SimplexNoise,
}

type ControlParams = {
  renderMode: RenderMode
  isTimePaused: boolean
  debugTime: number
}

class Controls {
  gui?: GUI
  params: ControlParams =  {
    renderMode: RenderMode.Uvw,
    isTimePaused: false,
    debugTime: 0,
  }

  init(onRenderModeChange: (mode: RenderMode) => void) {
    this.dispose()
    this.gui = new GUI()

    this.gui.add(this.params, 'renderMode', {
      UVW: RenderMode.Uvw,
      'Inner shadow': RenderMode.InnerShadow,
      'Simplex noise': RenderMode.SimplexNoise,
    }).name('Render Mode').onChange(onRenderModeChange)

    const timeFolder = this.gui.addFolder('Time')
    timeFolder.open()
    const debugTimeController = timeFolder.add(this.params, 'debugTime', 0, 1000).name('Debug Time')
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

  dispose() {
    this.gui?.destroy()
    this.gui = undefined
  }
}

export default new Controls
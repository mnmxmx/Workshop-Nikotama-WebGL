import {GUI} from 'lil-gui'
import * as THREE from 'three'

class Controls {
    gui?: GUI
    params: any =  {
      uColor1: new THREE.Color(0xfed7f7),
      uColor2: new THREE.Color(0x00a3cc),
      uColor3: new THREE.Color(0xb683ce),
      uBgColor1: new THREE.Color(0xe0e8ff),
      uBgColor2: new THREE.Color(0x1c2c45),
      uColorParams: new THREE.Vector2(Math.random(), 0)
    }
    constructor() {
        
    }

    init (){
      this.gui = new GUI()
      // this.gui.add(this.params.uColorParams, 'x', 0, 2).name('Time')

      const particles = this.gui.addFolder('Particles')
      particles.addColor(this.params, 'uColor1')
      particles.addColor(this.params, 'uColor2')
      particles.addColor(this.params, 'uColor3')

      const background = this.gui.addFolder('Background')
      background.addColor(this.params, 'uBgColor1')
      background.addColor(this.params, 'uBgColor2')

    }
}

export default new Controls
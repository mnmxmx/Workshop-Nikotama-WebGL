import {GUI} from 'lil-gui'
import * as THREE from 'three'

class Controls {
    gui?: GUI
    params: any =  {
      uColor1: new THREE.Color(0xffffff),
      uColor2: new THREE.Color(0xffea00),
      uColor3: new THREE.Color(0xffffff),
      uColor4: new THREE.Color(0x00c785),
      uNoiseFactors1: new THREE.Vector3(0.47, 0.200, 0.000),
      // uNoiseFactors2: new THREE.Vector3(0.00, 0.031, 0.000),
      uColorFactor: new THREE.Vector3(1.345, 0.00, 4.09),
      getColors: () => {
        console.log(`
      uColor1: new THREE.Color(0x${this.params.uColor1.getHexString()}),
      uColor2: new THREE.Color(0x${this.params.uColor2.getHexString()}),
      uColor3: new THREE.Color(0x${this.params.uColor3.getHexString()}),
      uColor4: new THREE.Color(0x${this.params.uColor4.getHexString()}),
      uNoiseFactors1: new THREE.Vector3(${this.params.uNoiseFactors1.x.toFixed(2)}, ${this.params.uNoiseFactors1.y.toFixed(3)}, ${this.params.uNoiseFactors1.z.toFixed(3)}),
      uNoiseFactors2: new THREE.Vector3(${this.params.uNoiseFactors2.x.toFixed(2)}, ${this.params.uNoiseFactors2.y.toFixed(3)}, ${this.params.uNoiseFactors2.z.toFixed(3)}),
      uColorFactor: new THREE.Vector3(${this.params.uColorFactor.x.toFixed(2)}, ${this.params.uColorFactor.y.toFixed(2)}, ${this.params.uColorFactor.z.toFixed(2)}),
        `)
      }
    }
    constructor() {
      // uNoiseFactors1: new THREE.Vector3(0.78, 0.200, 0.000),
      // uNoiseFactors2: new THREE.Vector3(0.00, 0.031, 0.000),

      // uColor1: new THREE.Color(0xbed3fe),
      // uColor2: new THREE.Color(0xffe042),
      // uColor3: new THREE.Color(0x0055ff),
      // uColor4: new THREE.Color(0x000c66),
      // uNoiseFactors1: new THREE.Vector3(0.78, 0.112, 0.000),
      // uNoiseFactors2: new THREE.Vector3(0.00, 0.031, 0.000),
      // uColorFactor: new THREE.Vector3(1.34, 0.16, 5.30),
    }

    init (){
      this.gui = new GUI()
      // this.gui.add(this.params.uColorParams, 'x', 0, 2).name('Time')

      this.gui.addColor(this.params, 'uColor1')
      this.gui.addColor(this.params, 'uColor2')
      this.gui.addColor(this.params, 'uColor3')
      this.gui.addColor(this.params, 'uColor4')

      const folderNoise1 = this.gui.addFolder('Noise 1')
      folderNoise1.open()
      folderNoise1.add(this.params.uNoiseFactors1, 'x', 0, 2).name('Noise1 Scale')
      folderNoise1.add(this.params.uNoiseFactors1, 'y', 0, 0.2).name('Noise1 Intensity')

      // const folderNoise2 = this.gui.addFolder('Noise 2')
      // folderNoise2.open()
      // folderNoise2.add(this.params.uNoiseFactors2, 'x', 0, 10).name('Noise2 Scale')
      // folderNoise2.add(this.params.uNoiseFactors2, 'y', 0, 0.2).name('Noise2 Intensity')

      const folderColor = this.gui.addFolder('Color')
      folderColor.open()
      folderColor.add(this.params.uColorFactor, 'x', 0, 5).name('Color Gamma')
      folderColor.add(this.params.uColorFactor, 'y', -0.5, 0.5).name('Color Brightness')
      folderColor.add(this.params.uColorFactor, 'z', 1, 10).name('Color Scale')



      this.gui.add(this.params, 'getColors').name('Get Colors')
    }

}

export default new Controls
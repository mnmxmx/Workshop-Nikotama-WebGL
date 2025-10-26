import {GUI} from 'lil-gui'
import * as THREE from 'three'

class Controls {
    gui?: GUI
    params: any =  {
      uColor1: new THREE.Color(0xffffff),
      uColor2: new THREE.Color(0xfff8ad),
      uColor3: new THREE.Color(0xa3ffa5),
      uColor4: new THREE.Color(0x00a36d),
      uNoiseFactors1: new THREE.Vector3(3.19, 0.079, 0.000),
      uNoisePosScale: new THREE.Vector3(0.37, 1.00, 0.35),
      uColorFactor: new THREE.Vector4(0.73, -0.07, 5.076, 7.44),
      isTimePaused: false,
      debugTime: 0,
      getColors: () => {
        console.log(`
      uColor1: new THREE.Color(0x${this.params.uColor1.getHexString()}),
      uColor2: new THREE.Color(0x${this.params.uColor2.getHexString()}),
      uColor3: new THREE.Color(0x${this.params.uColor3.getHexString()}),
      uColor4: new THREE.Color(0x${this.params.uColor4.getHexString()}),
      uNoiseFactors1: new THREE.Vector3(${this.params.uNoiseFactors1.x.toFixed(2)}, ${this.params.uNoiseFactors1.y.toFixed(3)}, ${this.params.uNoiseFactors1.z.toFixed(3)}),
      uNoisePosScale: new THREE.Vector3(${this.params.uNoisePosScale.x.toFixed(2)}, ${this.params.uNoisePosScale.y.toFixed(2)}, ${this.params.uNoisePosScale.z.toFixed(2)}),
      uColorFactor: new THREE.Vector4(${this.params.uColorFactor.x.toFixed(2)}, ${this.params.uColorFactor.y.toFixed(2)}, ${this.params.uColorFactor.z.toFixed(2)}, ${this.params.uColorFactor.w.toFixed(2)}),
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
      folderNoise1.add(this.params.uNoiseFactors1, 'x', 0, 5).name('Noise1 Scale')
      folderNoise1.add(this.params.uNoiseFactors1, 'y', 0, 0.2).name('Noise1 Intensity')

      const folderNoiseScale = this.gui.addFolder('Noise Position Scale')
      folderNoiseScale.open()
      folderNoiseScale.add(this.params.uNoisePosScale, 'x', 0.0, 1.0).name('Noise Pos Scale X')
      folderNoiseScale.add(this.params.uNoisePosScale, 'y', 0.0, 1.0).name('Noise Pos Scale Y')
      folderNoiseScale.add(this.params.uNoisePosScale, 'z', 0.0, 1.0).name('Noise Pos Scale Z')


      const folderColor = this.gui.addFolder('Color')
      folderColor.open()
      folderColor.add(this.params.uColorFactor, 'x', 0, 5).name('Color Gamma')
      folderColor.add(this.params.uColorFactor, 'y', -0.5, 0.5).name('Color Brightness')
      folderColor.add(this.params.uColorFactor, 'z', 1, 10).name('Color Scale')
      folderColor.add(this.params.uColorFactor, 'w', 1.0, 10.0).name('Color Time Speed')

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

      this.gui.add(this.params, 'getColors').name('Get Colors')
    }

}

export default new Controls
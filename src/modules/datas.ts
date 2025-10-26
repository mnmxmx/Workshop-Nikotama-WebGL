import * as THREE from 'three'

export default [
  // 朝焼け
  {
    uColor1: new THREE.Color(0xfdfcfd),
    uColor2: new THREE.Color(0xc9c2ff),
    uColor3: new THREE.Color(0x70b5ff),
    uColor4: new THREE.Color(0x9ab3fe),
    uNoiseFactors1: new THREE.Vector3(2.14, 0.067, 0.000),
    uNoisePosScale: new THREE.Vector3(0.45, 1.00, 0.45),
    uColorFactor: new THREE.Vector4(1.03, 0.04, 7.51, 3.58),
  },
  // 夜
  {
    uColor1: new THREE.Color(0xffffff),
    uColor2: new THREE.Color(0xffe9ad),
    uColor3: new THREE.Color(0x99cef0),
    uColor4: new THREE.Color(0x008bc7),
    uNoiseFactors1: new THREE.Vector3(1.83, 0.084, 0.000),
    uNoisePosScale: new THREE.Vector3(0.52, 0.52, 0.49),
    uColorFactor: new THREE.Vector4(1.03, -0.03, 3.86, 10.00),
  },
  // 昼
  {
      uColor1: new THREE.Color(0xffffff),
      uColor2: new THREE.Color(0xfff8ad),
      uColor3: new THREE.Color(0xa3ffa5),
      uColor4: new THREE.Color(0x00a36d),
      uNoiseFactors1: new THREE.Vector3(3.19, 0.079, 0.000),
      uNoisePosScale: new THREE.Vector3(0.37, 1.00, 0.35),
      uColorFactor: new THREE.Vector4(0.73, -0.07, 5.076, 7.44),
  },

  // 夕焼け
  {
    uColor1: new THREE.Color(0xfdfeec),
    uColor2: new THREE.Color(0xfec35d),
    uColor3: new THREE.Color(0xff9b70),
    uColor4: new THREE.Color(0xffbd2e),
    uNoiseFactors1: new THREE.Vector3(5.00, 0.087, 0.000),
    uNoisePosScale: new THREE.Vector3(0.25, 0.90, 0.27),
    uColorFactor: new THREE.Vector4(1.00, 0.00, 4.09, 6.95),
  }
]
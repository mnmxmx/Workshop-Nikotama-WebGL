import * as THREE from "three";
import { PlaneConfigType } from "./planeConfigType";

export const resolution3 = new THREE.Vector2(672, 480)

const cubeSize = 288;

const width1 = 96

const heightF = 192

export const planeConfigs3: PlaneConfigType[] = [
  { // D
    rotation: new THREE.Euler(0, -Math.PI / 2, 0),
    offsetPos: new THREE.Vector2(0, 0),
    scale: new THREE.Vector2(1, 1),
    fboSize: new THREE.Vector2(cubeSize, cubeSize),
    screenPosition: new THREE.Vector2(-resolution3.x / 2 + cubeSize / 2 + width1 * 2 - cubeSize, resolution3.y / 2 - cubeSize / 2)
  },
  { // A
    rotation: new THREE.Euler(0, 0, 0),
    offsetPos: new THREE.Vector2(0, 0),
    scale: new THREE.Vector2(1, 1),
    fboSize: new THREE.Vector2(cubeSize, cubeSize),
    screenPosition: new THREE.Vector2(-resolution3.x / 2 + cubeSize / 2 + width1 * 2, resolution3.y / 2 - cubeSize / 2)
  },
  { //B
    rotation: new THREE.Euler(0, Math.PI / 2, 0),
    offsetPos: new THREE.Vector2(-0.5, 0),
    scale: new THREE.Vector2(1, 1),
    fboSize: new THREE.Vector2(cubeSize, cubeSize),
    screenPosition: new THREE.Vector2(-resolution3.x / 2 + cubeSize / 2 + width1 * 2 + cubeSize, resolution3.y / 2 - cubeSize / 2)
  },

  { // F
    rotation: new THREE.Euler(Math.PI / 2, 0, 0),
    offsetPos: new THREE.Vector2(0, 0.5),
    scale: new THREE.Vector2(1, heightF / cubeSize),
    fboSize: new THREE.Vector2(cubeSize, heightF),
    screenPosition: new THREE.Vector2(-resolution3.x / 2 + cubeSize / 2 + width1 * 2, resolution3.y / 2 - cubeSize - heightF * 0.5)
  },
]
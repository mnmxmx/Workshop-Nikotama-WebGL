import * as THREE from "three";
import { PlaneConfigType } from "./planeConfigType";

export const resolution2 = new THREE.Vector2(1536, 768)

const cubeSize = 384;

export const planeConfigs2: PlaneConfigType[] = [
  {
    rotation: new THREE.Euler(0, -Math.PI / 2, 0),
    offsetPos: new THREE.Vector2(0, 0),
    scale: new THREE.Vector2(1, 1),
    fboSize: new THREE.Vector2(cubeSize, cubeSize),
    screenPosition: new THREE.Vector2(-resolution2.x / 2 + cubeSize / 2, resolution2.y / 2 - cubeSize / 2)
  },
  {
    rotation: new THREE.Euler(0, 0, 0),
    offsetPos: new THREE.Vector2(0, 0),
    scale: new THREE.Vector2(1, 1),
    fboSize: new THREE.Vector2(cubeSize, cubeSize),
    screenPosition: new THREE.Vector2(-resolution2.x / 2 + cubeSize / 2 + cubeSize, resolution2.y / 2 - cubeSize / 2)
  },
  {
    rotation: new THREE.Euler(0, Math.PI / 2, 0),
    offsetPos: new THREE.Vector2(0, 0),
    scale: new THREE.Vector2(1, 1),
    fboSize: new THREE.Vector2(cubeSize, cubeSize),
    screenPosition: new THREE.Vector2(-resolution2.x / 2 + cubeSize / 2 + cubeSize * 2, resolution2.y / 2 - cubeSize / 2)
  },
  {
    rotation: new THREE.Euler(0, Math.PI, 0),
    offsetPos: new THREE.Vector2(0, 0),
    scale: new THREE.Vector2(1, 1),
    fboSize: new THREE.Vector2(cubeSize, cubeSize),
    screenPosition: new THREE.Vector2(-resolution2.x / 2 + cubeSize / 2 + cubeSize * 3, resolution2.y / 2 - cubeSize / 2)
  },
  {
    rotation: new THREE.Euler(Math.PI / 2, 0, 0),
    offsetPos: new THREE.Vector2(0, 0),
    scale: new THREE.Vector2(1, 1),
    fboSize: new THREE.Vector2(cubeSize, cubeSize),
    screenPosition: new THREE.Vector2(-resolution2.x / 2 + cubeSize / 2 + cubeSize, resolution2.y / 2 - cubeSize / 2 - cubeSize)
  },
]
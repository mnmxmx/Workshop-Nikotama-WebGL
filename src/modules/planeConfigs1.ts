import * as THREE from "three";
import { PlaneConfigType } from "./planeConfigType";
export const resolution1 = new THREE.Vector2(2000, 1440)

const cubeSize = 720;

const widthA = 200
const widthD = 360
const widthE = 360

export const planeConfigs1: PlaneConfigType[] = [
  // A
  {
    rotation: new THREE.Euler(0, -Math.PI / 2, 0),
    offsetPos: new THREE.Vector2(0.5, 0),
    scale: new THREE.Vector2(widthA / cubeSize, 1),
    fboSize: new THREE.Vector2(widthA, cubeSize),
    screenPosition: new THREE.Vector2(-resolution1.x / 2 + widthA / 2, resolution1.y / 2 - cubeSize / 2)
  },
  { // B
    rotation: new THREE.Euler(0, 0, 0),
    offsetPos: new THREE.Vector2(0, 0),
    scale: new THREE.Vector2(1, 1),
    fboSize: new THREE.Vector2(cubeSize, cubeSize),
    screenPosition: new THREE.Vector2(-resolution1.x / 2 + cubeSize / 2 + widthA, resolution1.y / 2 - cubeSize / 2)
  },
  { // C
    rotation: new THREE.Euler(0, Math.PI / 2, 0),
    offsetPos: new THREE.Vector2(0, 0),
    scale: new THREE.Vector2(1, 1),
    fboSize: new THREE.Vector2(cubeSize, cubeSize),
    screenPosition: new THREE.Vector2(-resolution1.x / 2 + cubeSize / 2 + widthA + cubeSize, resolution1.y / 2 - cubeSize / 2)
  },
  { // D
    rotation: new THREE.Euler(0, Math.PI, 0),
    offsetPos: new THREE.Vector2(-0.5, 0),
    scale: new THREE.Vector2(widthD / cubeSize, 1),
    fboSize: new THREE.Vector2(widthD, cubeSize),
    screenPosition: new THREE.Vector2(resolution1.x / 2 - widthD / 2, resolution1.y / 2 - cubeSize / 2)
  },
  { // E
    rotation: new THREE.Euler(Math.PI / 2, 0, 0),
    offsetPos: new THREE.Vector2(-0.5, 0.5),
    scale: new THREE.Vector2(0.5, 0.5),
    fboSize: new THREE.Vector2(widthE, widthE),
    screenPosition: new THREE.Vector2(-resolution1.x / 2 + widthE / 2 + widthA, resolution1.y / 2 - cubeSize / 2 - cubeSize + widthE / 2)
  },
  { // E
    rotation: new THREE.Euler(Math.PI / 2, 0, 0),
    offsetPos: new THREE.Vector2(0.5, 0),
    scale: new THREE.Vector2(0.5, 1),
    fboSize: new THREE.Vector2(widthE, cubeSize),
    screenPosition: new THREE.Vector2(-resolution1.x / 2 + widthE / 2 + widthE + widthA, resolution1.y / 2 - cubeSize / 2 - cubeSize)
  },
]
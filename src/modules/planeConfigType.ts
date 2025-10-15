import * as THREE from "three";

export type PlaneConfigType = {
  rotation: THREE.Euler;
  offsetPos: THREE.Vector2;
  scale: THREE.Vector2;
  fboSize: THREE.Vector2;
  screenPosition: THREE.Vector2;
};
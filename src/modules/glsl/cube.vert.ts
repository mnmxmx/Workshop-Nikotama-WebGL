export default `
varying vec2 vUv;
varying vec3 vPosition;
attribute vec3 initialPosition;

void main(){
  vUv = uv;
  vPosition = initialPosition;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
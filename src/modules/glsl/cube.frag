#include "./utils/hsv2rgb.glsl"
#include "./utils/rgb2hsv.glsl"
#include "./utils/snoise3d.glsl"

uniform float uTime;
uniform float uCubeScale;

varying vec3 vPosition;
varying vec2 vUv;

void main(){
  vec3 uvw = vPosition;
  uvw *= uCubeScale;
  uvw += 0.5;

  gl_FragColor = vec4(uvw, 1.0);
}
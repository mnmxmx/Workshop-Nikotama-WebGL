#include "./utils/hsv2rgb.glsl"
#include "./utils/rgb2hsv.glsl"
#include "./utils/snoise3d.glsl"

uniform float uTime;

varying vec3 vPosition;
varying vec2 vUv;

void main(){
  vec3 uvw = vPosition + 0.5;

  vec3 falloff = 1.0 - pow(smoothstep(0.0, 1.0, abs(vPosition)), vec3(2.0));
  float innerShadow = falloff.x * falloff.y * falloff.z;


  gl_FragColor = vec4(uvw, 1.0);
}
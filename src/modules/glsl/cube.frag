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

  #if RENDER_MODE == 1
    vec3 color = vec3(innerShadow);
  #elif RENDER_MODE == 2
    float noise = snoise3D(vec3(vPosition) + vec3(0.0, 0.0, uTime * 0.2));
    vec3 color = vec3(noise * 0.5 + 0.5);
  #else
    vec3 color = uvw;
  #endif

  gl_FragColor = vec4(color, 1.0);
}
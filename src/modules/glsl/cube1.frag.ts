export default `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;

uniform vec3 uNoiseFactors1;
// uniform vec3 uNoiseFactors2;

uniform vec3 uColorFactor;

varying vec2 vUv;
varying vec3 vPosition;

float noiseAmount = 0.0;

const float PI = 3.14159265359;

void main(){
  vec3 uvw = vPosition * 0.5 + 0.5;
  // uvw = floor(uvw * 8.0) / 8.0;

  float intensity = uNoiseFactors1.y;

  for(int i = 0; i < 12; i++){
    float noise = snoise3D(vec3(uvw * uNoiseFactors1.x + uTime * vec3(0.6, -0.4, 0.6) * 0.05));
    float noise2 = snoise3D(vec3(uvw * uNoiseFactors1.x * 1.3 + uTime * vec3(-0.3, 0.7, -0.5) * 0.05));
    float angle = noise * PI;
    float angle2 = noise2 * PI;

    float dx = cos(angle) * sin(angle2) * 0.2;
    float dy = sin(angle) * sin(angle2);
    float dz = cos(angle2) * 0.2;
    uvw += vec3(dx, dy, dz) * intensity;
  }

  float s = uColorFactor.z;

  uvw += uTime * 0.02;

  float sx = cos(uvw.x * s) * 0.5 + 0.5;
  float sy = cos(uvw.y * s) * 0.5 + 0.5;
  float sz = cos(uvw.z * s) * 0.5 + 0.5;

  vec3 color1 = mix(uColor2, uColor1, sx * sx);
  vec3 color2 = mix(uColor4, uColor3, sy * sy);
  vec3 color = mix(color1, color2, sz);

  float occX = 1.0 - pow(abs(vUv.x - 0.5) * 2.0, 2.0);
  float occY = 1.0 - pow(abs(vUv.y - 0.5) * 2.0, 2.0);
  float occ = 1.0 - occX * occY;
  occ = pow(occ, 0.5);

  // vec3 hsv = rgb2hsv(color);
  // hsv.g += occ * 0.2;
  // hsv.b -= occ * 0.05;
  // vec3 occColor = hsv2rgb(hsv);


  color = mix(color, pow(color, vec3(2.0)), occ);

  color = pow(color, vec3(uColorFactor.x)); // gamma 2.2
  color += uColorFactor.y; // brightness adjustment


  // #if IS_DEBUG == 1
  //   vec3 dx = dFdx(vPosition);
  //   vec3 dy = dFdy(vPosition);
  //   vec3 normal = normalize(cross(dx, dy));
  //   float light = dot(normalize(vec3(-2.0, 3.0, 1.0)), normal);
  //   color += light * 0.05;
  // #endif


  gl_FragColor = vec4(color, 1.0);
}
`
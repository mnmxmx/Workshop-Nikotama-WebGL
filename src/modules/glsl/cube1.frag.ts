export default `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;

uniform vec3 uNoiseFactors1;
uniform vec3 uNoisePosScale;

uniform vec4 uColorFactor;

varying vec2 vUv;
varying vec3 vPosition;

float noiseAmount = 0.0;

const float PI = 3.14159265359;

vec3 calcNewUvw(vec3 uvw, vec3 offset1, vec3 offset2) {
  float intensity = uNoiseFactors1.y / uNoiseFactors1.x;
  vec3 noiseScale = uNoisePosScale;

  for(int i = 0; i < 12; i++){
    float noise = snoise3D(vec3(uvw * uNoiseFactors1.x * noiseScale + uTime * offset1));
    float noise2 = snoise3D(vec3(uvw * uNoiseFactors1.x * noiseScale + uTime * offset2));
    float angle = noise * PI;
    float angle2 = noise2 * PI;

    float dx = cos(angle) * sin(angle2) * noiseScale.x;
    float dy = sin(angle) * sin(angle2) * noiseScale.y;
    float dz = cos(angle2) * noiseScale.z;
    uvw += vec3(dx, dy, dz) * intensity;
  }

  return uvw;
}

vec3 calcColor(vec3 uvw, vec3 c1, vec3 c2, vec3 c3, vec3 c4) {
  uvw += uTime * 0.02 * uColorFactor.w;

  float sx = cos((uvw.x + uvw.y) * uColorFactor.z) * 0.5 + 0.5;
  float sy = cos((uvw.y + uvw.z) * uColorFactor.z) * 0.5 + 0.5;
  float sz = cos((uvw.z + uvw.x) * uColorFactor.z) * 0.5 + 0.5;

  vec3 color1 = mix(c1, c2, sx);
  vec3 color2 = mix(color1, c3, sy);
  vec3 color = mix(color2, c4, sz);

  return color;
}

void main(){
  vec3 uvw = vPosition * 0.5 + 0.5;
  // uvw = floor(uvw * 8.0) / 8.0;

  vec3 newUvw_1 = uvw;

  float time = uTime * 0.05;

  newUvw_1 += time;

  newUvw_1 = calcNewUvw(newUvw_1, vec3(0.6, -0.4, 0.6) * 0.1, vec3(-0.3, 0.7, -0.5) * 0.1);

  newUvw_1 -= time;

  vec3 color = calcColor(newUvw_1, uColor1, uColor2, uColor3, uColor4);

  vec3 hsv = rgb2hsv(color);
  hsv.y += (newUvw_1.x + newUvw_1.y) * 0.05;
  hsv.z += (newUvw_1.x + newUvw_1.z) * 0.05;
  color = hsv2rgb(hsv);


  float occX = 1.0 - pow(abs(vUv.x - 0.5) * 2.0, 2.0);
  float occY = 1.0 - pow(abs(vUv.y - 0.5) * 2.0, 2.0);
  float occ = 1.0 - occX * occY;

  color = mix(color, pow(color, vec3(2.0)), occ);

  color = pow(color, vec3(uColorFactor.x)); // gamma 2.2
  color += uColorFactor.y; // brightness adjustment


  gl_FragColor = vec4(color, 1.0);
}
`
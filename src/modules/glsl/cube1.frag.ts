export default `
uniform vec2 uRotateDist;
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec3 uCubeScale;

uniform vec3 uNoiseFactors1;
uniform vec3 uNoisePosScale;

uniform vec4 uColorFactor;

varying vec2 vUv;
varying vec3 vPosition;

float noiseAmount = 0.0;

const float PI = 3.14159265359;

vec3 calcNewUvw(vec3 uvw, vec3 offset1, vec3 offset2) {
  float intensity = uNoiseFactors1.y / uNoiseFactors1.x * 1.5;
  vec3 noiseScale = uNoisePosScale;

  for(int i = 0; i < 6; i++){
    float noise = snoise3D(vec3(uvw * uNoiseFactors1.x * noiseScale + uTime * offset1 / uCubeScale.x));
    float noise2 = snoise3D(vec3(uvw * uNoiseFactors1.x * noiseScale + uTime * offset2 / uCubeScale.x));
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
  uvw += uTime * 0.02 * uColorFactor.w / uCubeScale.x;

  float sx = cos((uvw.x + uvw.y) * uColorFactor.z / uCubeScale.x) * 0.5 + 0.5;
  float sy = cos((uvw.y + uvw.z) * uColorFactor.z / uCubeScale.y) * 0.5 + 0.5;
  float sz = cos((uvw.z + uvw.x) * uColorFactor.z / uCubeScale.z) * 0.5 + 0.5;

  vec3 color1 = mix(c1, c2, sx);
  vec3 color2 = mix(color1, c3, sy);
  vec3 color = mix(color2, c4, sz);

  return color;
}

mat2 rotate2D(float angle) {
  float s = sin(angle);
  float c = cos(angle); 

  return mat2(
    c, -s,
    s,  c
  );
} 

void main(){
  vec3 uvw = vPosition;
  uvw.xy = rotate2D(PI / 4.0 * uRotateDist.x) * uvw.xy;
  uvw.yz = rotate2D(-PI / 4.0 * uRotateDist.y) * uvw.yz;
  uvw.zx = rotate2D(uTime * 0.2) * uvw.zx;
  uvw *= uCubeScale.x;

  vec3 newUvw_1 = uvw;

  float time = sin(uTime * 0.015 * PI) * 2.0 / uCubeScale.x;


  newUvw_1 += time;

  newUvw_1 = calcNewUvw(newUvw_1, vec3(0.6, -0.4, 0.6) * 0.05, vec3(-0.3, 0.7, -0.5) * 0.05);

  newUvw_1 -= time;

  vec3 color = calcColor(newUvw_1, uColor1, uColor2, uColor3, uColor4);

  vec3 hsv = rgb2hsv(color);
  hsv.y += (newUvw_1.x + newUvw_1.y) * 0.05;
  hsv.z += (newUvw_1.x + newUvw_1.z) * 0.05;
  color = hsv2rgb(hsv);


  vec3 uv3 = vPosition;

  float occX = 1.0 - pow(abs(uv3.x) * 2.0, 2.0);
  float occY = 1.0 - pow(abs(uv3.y) * 2.0, 2.0);
  float occZ = 1.0 - pow(abs(uv3.z) * 2.0, 2.0);
  float occ = occX * occY + occY * occZ + occZ * occX;

  color = mix(color, pow(color, vec3(2.0)), occ);

  color = pow(color, vec3(uColorFactor.x)); // gamma 2.2
  color += uColorFactor.y; // brightness adjustment

  gl_FragColor = vec4(color, 1.0);
}
`
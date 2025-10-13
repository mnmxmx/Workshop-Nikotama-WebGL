import * as THREE from "three";

export default class Plane {
  mesh?: THREE.Mesh
  fbo: THREE.WebGLRenderTarget = new THREE.WebGLRenderTarget(1, 1);
  camera: THREE.OrthographicCamera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 50);
  constructor(config: any) {
    this.camera.position.set(0, 0, 3);
    this.fbo.setSize(config.fboSize.x, config.fboSize.y)

    const geometry = new THREE.PlaneGeometry(1, 1);
    const _positionClone = geometry.attributes.position.clone();
    geometry.translate(0, 0, 0.5)
    geometry.translate(-config.offsetPos.x, -config.offsetPos.y, 0)
    geometry.scale(config.scale.x, config.scale.y, 1)
    geometry.translate(config.offsetPos.x, config.offsetPos.y, 0)
    geometry.rotateX(config.rotation.x)
    geometry.rotateY(config.rotation.y)
    geometry.setAttribute('initialPosition', _positionClone)

    const material = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        attribute vec3 initialPosition;

        void main(){
          vUv = uv;
          vPosition = position;
          gl_Position = vec4(initialPosition * 2.0, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main(){
        vec3 uvw = vPosition * 0.5 + 0.5;
        // uvw = floor(uvw * 8.0) / 8.0;
          gl_FragColor = vec4(uvw, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    })

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.frustumCulled = false;
  }

  render(renderer: THREE.WebGLRenderer){
    if(this.mesh){
      renderer.setRenderTarget(this.fbo);
      renderer.render(this.mesh, this.camera);
      renderer.setRenderTarget(null);
    }
  }
}
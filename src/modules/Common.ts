import * as THREE from "three"
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

class Common {
	$wrapper: HTMLElement | null = null
	$canvas: HTMLCanvasElement | null = null
	pixelRatio: number = 1
	camera: THREE.OrthographicCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 50)
	scene: THREE.Scene = new THREE.Scene()
	renderer?: THREE.WebGLRenderer
	
	constructor() {
		this.camera.position.set(0, 0, 3);
	}

	init({$wrapper, width, height}: { $wrapper: HTMLElement | null, width: number, height: number}) {

		this.renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true,
		});


		// this.controls = new OrbitControls( this.camera, this.renderer.domElement );
		// this.controls.dampingFactor = 0.05;
		// this.controls.enableDamping = true;

		this.$canvas = this.renderer.domElement;
		if($wrapper) $wrapper.appendChild(this.$canvas);
		this.renderer.setPixelRatio(this.pixelRatio);
		this.renderer.setClearColor(0xffffff, 1);

		this.setSize(width, height);
	}

	setSize(width: number, height: number) {
		this.renderer?.setSize(width, height);
		this.camera.left = -width / 2;
		this.camera.right = width / 2;
		this.camera.top = height / 2;
		this.camera.bottom = -height / 2;
		this.camera.updateProjectionMatrix();
	}
}

export default new Common();
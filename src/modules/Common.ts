import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

class Common {
	$wrapper: HTMLElement | null = null
	$canvas: HTMLCanvasElement | null = null
	pixelRatio: number = 1
	camera: THREE.OrthographicCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 50)
	debugCamera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
	scene: THREE.Scene = new THREE.Scene()
	renderer?: THREE.WebGLRenderer
	controls!: OrbitControls
	
	constructor() {
		this.camera.position.set(0, 0, 5);
		this.debugCamera.position.set(0, 0, 5);
	}

	init({$wrapper, width, height}: { $wrapper: HTMLElement | null, width: number, height: number}) {

		this.renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true,
		});

		this.controls = new OrbitControls( this.debugCamera, this.renderer.domElement );

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

		this.debugCamera.aspect = width / height;
		this.debugCamera.updateProjectionMatrix();
		this.controls.update();
	}
}

export default new Common();
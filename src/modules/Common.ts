import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

class Common {
	pixelRatio = 1
	camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 50)
	debugCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
	scene = new THREE.Scene()
	renderer?: THREE.WebGLRenderer
	controls?: OrbitControls
	
	constructor() {
		this.camera.position.set(0, 0, 5);
		this.debugCamera.position.set(0, 0, 3);
	}

	init({wrapper, canvas, width, height}: { wrapper: HTMLElement, canvas: HTMLCanvasElement, width: number, height: number}) {

		this.renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true,
				canvas
		});

		this.controls = new OrbitControls(this.debugCamera, this.renderer.domElement);

		if (!wrapper.contains(this.renderer.domElement)) wrapper.appendChild(this.renderer.domElement);
		this.renderer.setPixelRatio(this.pixelRatio);
		this.renderer.setClearColor(0xf1f1f1, 1);

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
		this.controls?.update();
	}

	dispose() {
		this.controls?.dispose()
		this.controls = undefined
		this.renderer?.dispose()
		this.renderer = undefined
	}
}

export default new Common();
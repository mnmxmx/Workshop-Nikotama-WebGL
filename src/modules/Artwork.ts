import common from "./Common";
import * as THREE from "three";
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { resolution1, planeConfigs1 } from "./planeConfigs1";
import { resolution2, planeConfigs2 } from "./planeConfigs2";
import { resolution3, planeConfigs3 } from "./planeConfigs3";
import type { PlaneConfigType } from "./planeConfigType";

import controls from "./Controls";

import cubeVert from './glsl/cube.vert'
import cubeFrag from './glsl/cube.frag'

type PlaneConfigSet = {
	resolution: THREE.Vector2
	planeConfigs: PlaneConfigType[]
}

const planeConfigs = {
	type1: {
		resolution: resolution1,
		planeConfigs: planeConfigs1
	},
	type2: {
		resolution: resolution2,
		planeConfigs: planeConfigs2
	},
	type3: {
		resolution: resolution3,
		planeConfigs: planeConfigs3
	}
} satisfies Record<string, PlaneConfigSet>

type CubeType = keyof typeof planeConfigs

interface ArtworkProps {
	wrapper: HTMLElement;
	canvas: HTMLCanvasElement;
}

function isCubeType(value: string | null): value is CubeType {
	return value !== null && value in planeConfigs
}

export default class Artwork{
	private readonly clock = new THREE.Clock()
	private readonly uniforms = {
		uTime: { value: 0 },
	}
	private animationFrame?: number
	private isDisposed = false
	private material?: THREE.ShaderMaterial
	private time = 0
	private cubeType: CubeType = 'type2'
	private isDebug = true

	constructor(private readonly props: ArtworkProps){
		const urlParams = new URLSearchParams(window.location.search);
		const cubeTypeParam = urlParams.get('cubeType');
		if (isCubeType(cubeTypeParam)) {
			this.cubeType = cubeTypeParam;
		}

		const debugParam = urlParams.get('debug');
		if (debugParam !== null) {
			this.isDebug = debugParam === 'true' || debugParam === '1';
		}

		controls.init((renderMode) => {
			if (this.material) {
				this.material.defines.RENDER_MODE = renderMode;
				this.material.needsUpdate = true
			}
		});
		
		this.init();
		this.loop()
	}

	private init(){
		common.init({
			wrapper: this.props.wrapper,
			canvas: this.props.canvas,
			width: planeConfigs[this.cubeType].resolution.x,
			height: planeConfigs[this.cubeType].resolution.y
		});

		const geometriesToMerge: THREE.BufferGeometry[] = [];

		const material = new THREE.ShaderMaterial({
			vertexShader: cubeVert,
			fragmentShader: cubeFrag,
			uniforms: this.uniforms,
			side: THREE.DoubleSide,
			defines: {
				IS_DEBUG: this.isDebug ? 1 : 0,
				RENDER_MODE: controls.params.renderMode,
			}
		})
		this.material = material

		planeConfigs[this.cubeType].planeConfigs.forEach((config) => {
			const debugGeometry = new THREE.PlaneGeometry(1, 1);
			debugGeometry.translate(0, 0, 0.5)
			debugGeometry.translate(-config.offsetPos.x, -config.offsetPos.y, 0)
			debugGeometry.scale(config.scale.x, config.scale.y, 1)
			debugGeometry.translate(config.offsetPos.x, config.offsetPos.y, 0)
			debugGeometry.rotateX(config.rotation.x)
			debugGeometry.rotateY(config.rotation.y)

			const initialPosition = debugGeometry.attributes.position.clone();
			debugGeometry.setAttribute('initialPosition', initialPosition)

			if(this.isDebug){
				const debugPlane = new THREE.Mesh(debugGeometry, material);
				common.scene.add(debugPlane)
			} else {
				const geometry = new THREE.PlaneGeometry(config.fboSize.x, config.fboSize.y)
				geometry.translate(config.screenPosition.x, config.screenPosition.y, 0);
				geometry.setAttribute('initialPosition', initialPosition)
				geometriesToMerge.push(geometry);
				debugGeometry.dispose()
			}
		})

		if(!this.isDebug){
			const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometriesToMerge);
			geometriesToMerge.forEach((geometry) => geometry.dispose())
			const mapPlane = new THREE.Mesh(mergedGeometry, material);
			common.scene.add(mapPlane);
		}
	}

	dispose() {
		this.isDisposed = true;
		if (this.animationFrame !== undefined) {
			cancelAnimationFrame(this.animationFrame)
		}
		common.scene.traverse((object) => {
			if (object instanceof THREE.Mesh) object.geometry.dispose()
		})
		common.scene.clear();
		this.material?.dispose()
		this.material = undefined
		controls.dispose()
		common.dispose()
	}

	private update(){
		const delta = this.clock.getDelta();
		common.renderer?.setRenderTarget(null);
		this.time += delta;

		if (controls.params.isTimePaused) {
			this.uniforms.uTime.value = controls.params.debugTime;
		} else {
			this.uniforms.uTime.value = this.time
		}
		if(this.isDebug) {
			common.renderer?.render(common.scene, common.debugCamera);
		} else {
			common.renderer?.render(common.scene, common.camera);
		}
	}

	private loop = () => {
		if(!this.isDisposed){
			this.update();
			this.animationFrame = window.requestAnimationFrame(this.loop);
		}
	}
}
import common from "./Common";
import * as THREE from "three";
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { resolution1, planeConfigs1 } from "./planeConfigs1";
import { resolution2, planeConfigs2 } from "./planeConfigs2";
import { resolution3, planeConfigs3 } from "./planeConfigs3";
import { PlaneConfigType } from "./planeConfigType";

import controls from "./Controls";

import cubeVert from './glsl/cube.vert'
import cube1Frag from './glsl/cube1.frag'
import utilsGlsl from './glsl/utils/utils.glsl'

const planeConfigs: Record<string, { resolution: THREE.Vector2; planeConfigs: PlaneConfigType[] }> = {
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
}


interface ArtworkProps {
    $wrapper: HTMLElement;
}

export default class Artwork{
	private props: ArtworkProps;
	private isDisposed: boolean | undefined;
	clock: THREE.Clock = new THREE.Clock();
	delta: number = 0;
	material: any
	cubeType: keyof typeof planeConfigs = 'type2'
	isDebug: boolean = true
	uniforms = {
		uTime: {
			value: Math.random() * 100
		},
		uColor1: { value: controls.params.uColor1 },
		uColor2: { value: controls.params.uColor2 },
		uColor3: { value: controls.params.uColor3 },
		uColor4: { value: controls.params.uColor4 },
		uNoiseFactors1: { value: controls.params.uNoiseFactors1 },
		uColorFactor: { value: controls.params.uColorFactor },
	}

	constructor(props: ArtworkProps){
		this.props = props;
		
		// Get URL query parameters
		const urlParams = new URLSearchParams(window.location.search);
		
		// Set cubeType from URL query, default to 'type2'
		const cubeTypeParam = urlParams.get('cubeType');
		if (cubeTypeParam && cubeTypeParam in planeConfigs) {
			this.cubeType = cubeTypeParam as keyof typeof planeConfigs;
		}
		
		// Set debug mode from URL query, default to true
		const debugParam = urlParams.get('debug');
		if (debugParam !== null) {
			this.isDebug = debugParam === 'true' || debugParam === '1';
		}

		if (this.isDebug){
			controls.init();
		}
		
		this.init();
	}

	init(){
		common.init({
			$wrapper: this.props.$wrapper,
			width: planeConfigs[this.cubeType].resolution.x,
			height: planeConfigs[this.cubeType].resolution.y
		});

		const geometriesToMerge: THREE.BufferGeometry[] = [];

		const material = new THREE.ShaderMaterial({
			vertexShader: cubeVert,
			fragmentShader: utilsGlsl + cube1Frag,
			uniforms: this.uniforms,
			side: THREE.DoubleSide,
			defines: {
				IS_DEBUG: this.isDebug ? 1 : 0
			}
		})

		planeConfigs[this.cubeType].planeConfigs.forEach((config) => {
			// const material = new THREE.MeshBasicMaterial({ map: plane.fbo.texture, side: THREE.DoubleSide })

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
			}
		})

		if(!this.isDebug){
			const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometriesToMerge);
			const mapPlane = new THREE.Mesh(mergedGeometry, material);
			common.scene.add(mapPlane);
		}
	}

	update(){
		this.delta = this.clock.getDelta();
		common.renderer?.setRenderTarget(null);
		this.uniforms.uTime.value += this.delta;

		if(this.isDebug) {
			common.renderer?.render(common.scene, common.debugCamera);
		} else {
			common.renderer?.render(common.scene, common.camera);
		}
	}

	loop(){
		if(!this.isDisposed){
			this.update();
			window.requestAnimationFrame(this.loop.bind(this));
		}
			
	}
}
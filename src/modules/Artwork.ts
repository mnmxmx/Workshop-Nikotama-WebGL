import common from "./Common";
import * as THREE from "three";
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { resolution1, planeConfigs1 } from "./planeConfigs1";
import { resolution2, planeConfigs2 } from "./planeConfigs2";
import { resolution3, planeConfigs3 } from "./planeConfigs3";
import type { PlaneConfigType } from "./planeConfigType";
import datas from "./datas";

import controls from "./Controls";

import cubeVert from './glsl/cube.vert'
import cubeFrag from './glsl/cube.frag'

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

type CubeType = keyof typeof planeConfigs

interface ArtworkProps {
	wrapper: HTMLElement;
	canvas: HTMLCanvasElement;
}


export default class Artwork{
	private props: ArtworkProps;
	private isDisposed = false;
	private animationFrame?: number;
	clock: THREE.Clock = new THREE.Clock();
	delta: number = 0;
	time: number = 100 * Math.random()
	material?: THREE.ShaderMaterial
	cubeType: CubeType = 'type2'
	isDebug: boolean = true
	intervalTimer?: ReturnType<typeof setInterval>
	progress: {
		current: number;
		target: number;
	} = {
		current: 0,
		target: 0
	}
	progressColor: {
		current: number;
		target: number;
	} = {
		current: 0,
		target: 0
	}
	uniforms = {
		uTime: {
			value: 43200
		},
		uRotateDist: { value: controls.params.uRotateDist },
		uColor1: { value: controls.params.uColor1 },
		uColor2: { value: controls.params.uColor2 },
		uColor3: { value: controls.params.uColor3 },
		uColor4: { value: controls.params.uColor4 },
		uNoiseFactors1: { value: controls.params.uNoiseFactors1 },
		uNoisePosScale: { value: controls.params.uNoisePosScale },
		uColorFactor: { value: controls.params.uColorFactor },
		uCubeScale: { value: new THREE.Vector3(1, 1, 1)}
	}

	constructor(props: ArtworkProps){
		this.props = props;
		
		// Get URL query parameters
		const urlParams = new URLSearchParams(window.location.search);
		
		// Set cubeType from URL query, default to 'type2'
		const cubeTypeParam = urlParams.get('cubeType');
		if (cubeTypeParam && cubeTypeParam in planeConfigs) {
			this.cubeType = cubeTypeParam as CubeType;
		}

		switch(this.cubeType) {
			case 'type1':
				controls.params.uRotateDist.set(-1, -1);
				this.uniforms.uCubeScale.value.x = 1.2;
				break;
			case 'type2':
				controls.params.uRotateDist.set(-1, 1);
				this.uniforms.uCubeScale.value.x = 1;
				break;
			case 'type3':
				controls.params.uRotateDist.set(1, -1);
				this.uniforms.uCubeScale.value.x = 0.9;
				break;
		}
		
		// Set debug mode from URL query, default to true
		const debugParam = urlParams.get('debug');
		if (debugParam !== null) {
			this.isDebug = debugParam === 'true' || debugParam === '1';
		}

		const colorIndexParam = Number.parseInt(urlParams.get('colorIndex') ?? '', 10);
		const colorIndex = Number.isInteger(colorIndexParam) && colorIndexParam >= 0 && colorIndexParam < datas.length
			? colorIndexParam
			: undefined;
		if (colorIndex !== undefined) {
			controls.setParams(colorIndex)
		}

		controls.init();


		if(colorIndex === undefined){
			// set different initial color based on cube type
			const activeIndiceArray: number[] = [];

			const time = Math.floor(Date.now() / 10000);
			// choose cubeIndex by using time as seed
			const cubeIndex1 = (time) % datas.length;
			const cubeIndex2 = (time + 4) % datas.length;
			const cubeIndex3 = (time + 8) % datas.length;

			activeIndiceArray.push(cubeIndex1, cubeIndex2, cubeIndex3);

			switch(this.cubeType) {
				case 'type1':
					controls._targetIndex = activeIndiceArray[0];
					controls.params.activeIndex = activeIndiceArray[0];
					controls.setParams(controls.params.activeIndex)
					break;
				case 'type2':
					controls._targetIndex = activeIndiceArray[1];
					controls.params.activeIndex = activeIndiceArray[1];
					controls.setParams(controls.params.activeIndex)
					break;
				case 'type3':
					controls._targetIndex = activeIndiceArray[2];
					controls.params.activeIndex = activeIndiceArray[2];
					controls.setParams(controls.params.activeIndex)
					break;
			}
			
		}
		
		this.init();
		this.loop()

		const intervalParam = Number.parseInt(urlParams.get('interval') ?? '', 10);
		const interval = Number.isInteger(intervalParam) && intervalParam > 0 ? intervalParam : 300;

		this.intervalTimer = setInterval(() => {
			controls.params.activeIndex = controls._targetIndex;
			controls._targetIndex = (controls._targetIndex + 1) % datas.length;
			this.progress.current = 0;
			this.progress.target = 1;

			this.progressColor.current = 0;
			this.progressColor.target = 1;
		}, 1000 * interval)
	}

	init(){
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
				IS_DEBUG: this.isDebug ? 1 : 0
			}
		})
		this.material = material

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
		if(this.intervalTimer){
			clearInterval(this.intervalTimer);
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

	update(){
		this.delta = this.clock.getDelta();
		common.renderer?.setRenderTarget(null);
		this.time += this.delta;

		if (controls.params.isTimePaused) {
			this.uniforms.uTime.value = controls.params.debugTime;
		} else {
			this.uniforms.uTime.value = this.time
		}

		this.progress.current += (this.progress.target - this.progress.current) * Math.min(1, this.delta * 1);
		this.progressColor.current += (this.progressColor.target - this.progressColor.current) * Math.min(1, this.delta);

		if (!controls.params.stopTransition) {
			controls.lerpParams(this.progressColor.current, this.progress.current);
		}

		if(this.isDebug) {
			common.renderer?.render(common.scene, common.debugCamera);
		} else {
			common.renderer?.render(common.scene, common.camera);
		}
	}

	loop = () => {
		if(!this.isDisposed){
			this.update();
			this.animationFrame = window.requestAnimationFrame(this.loop);
		}
	}
}
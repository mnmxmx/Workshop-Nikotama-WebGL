import common from "./Common";
import * as THREE from "three";
import Plane from './Plane'
import { resolution1, planeConfigs1 } from "./planeConfigs1";
import { resolution2, planeConfigs2 } from "./planeConfigs2";
import { resolution3, planeConfigs3 } from "./planeConfigs3";
import { PlaneConfigType } from "./planeConfigType";

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
	planes: Plane[] = [];
	cubeType: keyof typeof planeConfigs = 'type1'
	isDebug: boolean = true

	constructor(props: ArtworkProps){
		this.props = props;

		this.init();
	}

	init(){
		common.init({
			$wrapper: this.props.$wrapper,
			width: planeConfigs[this.cubeType].resolution.x,
			height: planeConfigs[this.cubeType].resolution.y
		});

		planeConfigs[this.cubeType].planeConfigs.forEach((config) => {
			const plane = new Plane(config);
			this.planes.push(plane);
			if(plane.mesh){


				if(this.isDebug){
					const geometry = new THREE.PlaneGeometry(1, 1);
					geometry.translate(0, 0, 0.5)
					geometry.translate(-config.offsetPos.x, -config.offsetPos.y, 0)
					geometry.scale(config.scale.x, config.scale.y, 1)
					geometry.translate(config.offsetPos.x, config.offsetPos.y, 0)
					geometry.rotateX(config.rotation.x)
					geometry.rotateY(config.rotation.y)
					const material = new THREE.MeshBasicMaterial({ map: plane.fbo.texture, side: THREE.DoubleSide })
					const debugPlane = new THREE.Mesh(geometry, material);
					common.scene.add(debugPlane)
					console.log(debugPlane)
				} else {
					const mapPlane = new THREE.Mesh(
						new THREE.PlaneGeometry(config.fboSize.x, config.fboSize.y),
						new THREE.MeshBasicMaterial({ map: plane.fbo.texture })
					)
					mapPlane.position.set(config.screenPosition.x, config.screenPosition.y, 0)
					common.scene.add(mapPlane)
				}
			}
		})
	}

	update(){
		this.delta = this.clock.getDelta();
		this.planes.forEach(plane => {
			plane.render(common.renderer!);
		})
		common.renderer?.setRenderTarget(null);

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
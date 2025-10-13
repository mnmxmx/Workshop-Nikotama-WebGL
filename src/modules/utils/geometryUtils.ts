import * as THREE from "three"

export const normalizeGeometry = (geometry: any): void => {
  geometry.computeBoundingBox();
  const box3 = geometry.boundingBox;

  const vector3 = new THREE.Vector3().copy(box3.max).sub(box3.min);
  const length = Math.max(vector3.z, Math.max(vector3.x, vector3.y));

  geometry.scale(
    1 / length, 1 / length, 1 / length
  );
}

export const checkOverlap = (mesh: THREE.Mesh | THREE.Group, otherMeshes: THREE.Mesh[] | THREE.Group[], scale: number = 1.1): boolean => {
  calcBoundingBox(mesh);

  // Get the bounding box of the current mesh
  const boundingBox1 = new THREE.Box3().setFromCenterAndSize(mesh.position, mesh.userData.boundingBox);
  boundingBox1.expandByScalar (scale);

  for (let otherMesh of otherMeshes) {
      // Get the bounding box of the other mesh
      const boundingBox2 = new THREE.Box3().setFromCenterAndSize(otherMesh.position, otherMesh.userData.boundingBox);

      // Check if the two bounding boxes intersect
      if (boundingBox1.intersectsBox(boundingBox2)) {
          return true; // Return true if there is an overlap
      }
  }

  return false; // Return false if there is no overlap
}


export const calcBoundingBox = (group: THREE.Group | THREE.Mesh) => {
  const boundingBox = new THREE.Box3().setFromObject(group);
  const size = new THREE.Vector3();
  boundingBox.getSize(size);

  group.userData.boundingBox = size; 
}

import * as THREE from 'three';

export class ServerNode {
    constructor( geometry, activeMaterial, inactiveMaterial, radius, longitude, latitude, size ) {
      // set attributes
      this.geometry = geometry;
      this.activeMaterial = activeMaterial;
      this.inactiveMaterial = inactiveMaterial;
      this.size = size;
      
      // get cartesian coordinates from longitude and latitude
      let x = radius * Math.cos(latitude) * Math.cos(longitude);
      let y = radius * Math.cos(latitude) * Math.sin(longitude);
      let z = radius * Math.sin(latitude);
      
      // create mesh  and set position
      this.mesh = new THREE.Mesh( this.geometry, this.activeMaterial );
      this.mesh.position.set(x, y, z);
      this.mesh.scale.set( size, size, size );
    }
  
    // Change node colour to active
    setActive() {
        this.mesh.material = this.activeMaterial;
    }

    // Change node colour to inactive
    setInactive() {
        this.mesh.material = this.inactiveMaterial;
    }

    // Retrieve node mesh
    getMesh() {
      return this.mesh;
    }
}
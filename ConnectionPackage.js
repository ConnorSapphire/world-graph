import * as THREE from 'three';

export class ConnectionPackage {
    constructor( geometry, material, points, size, latency ) {
        this.geometry = geometry;
        this.material = material;
        this.points = points;
        this.size = size;
        this.latency = latency;
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.position.set( this.points.at(0).x, this.points.at(0).y, this.points.at(0).z );

        this.timer = 0;
        this.current = 0;
        this.active = true;
    }

    update() {
        this.timer += 1;
        if (this.timer >= this.latency) {
            this.timer = 0;
            this.current += 1;
            if ( this.current < this.points.length ) {
                this.mesh.position.set( this.points.at(this.current).x, this.points.at(this.current).y, this.points.at(this.current).z );
            } else {
                this.mesh.visible = false;
                this.active = false;
            }
        }
    }
}
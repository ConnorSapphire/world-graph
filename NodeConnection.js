import * as THREE from 'three';
import { ServerNode } from './ServerNode.js';

export class NodeConnection {
    constructor( nodeStart, nodeEnd, worldRadius, arcScale, smoothness, material ) {
        // initialise attributes
        this.nodeStart = nodeStart;
        this.nodeEnd = nodeEnd;
        this.nodeStartVector = new THREE.Vector3( this.nodeStart.x, this.nodeStart.y, this.nodeStart.z )
        this.nodeEndVector = new THREE.Vector3( this.nodeEnd.x, this.nodeEnd.y, this.nodeEnd.z );
        this.worldRadius = worldRadius;
        this.arcScale = arcScale;
        this.arcRadius = this.worldRadius * this.arcScale;
        this.smoothness = smoothness
        this.material = material;

        // get midpoint between nodes
        this.unitVector = this.getUnitVector();
        
        // // get center of arc
        // this.centerPointVector = this.getCenterPoint();
        // this.geometry = new THREE.BufferGeometry().setFromPoints( this.points );

        // create line object
        this.points = this.getSmoothCurve();
        this.geometry = new THREE.TubeGeometry( 
            new THREE.CatmullRomCurve3(this.points),
            512,
            0.05,
            8,
            false
            );
        this.line = new THREE.Line( this.geometry, this.material );
    }

    // get directional vector from origin to center of arc as a Vector3
    getUnitVector() {
        // calculate midpoint between nodes
        const midX = (this.nodeStart.x + this.nodeEnd.x) / 2;
        const midY = (this.nodeStart.y + this.nodeEnd.y) / 2;
        const midZ = (this.nodeStart.z + this.nodeEnd.z) / 2;

        // calculate distance from origin to midpoint
        const originDistance = Math.sqrt( Math.pow( midX, 2 ) + Math.pow( midY, 2 ) + Math.pow( midZ, 2 ) );
        console.log(originDistance);

        // calculate unit vector
        const unitVector = new THREE.Vector3( midX / originDistance, midY / originDistance, midZ / originDistance );
        console.log(unitVector);
        console.log((Math.pow(unitVector.x, 2) + Math.pow(unitVector.y, 2) + Math.pow(unitVector.z, 2)));

        return unitVector;
    }

    // get center of arc as a Vector3
    getCenterPoint() {
        const x = this.unitVector.x * this.arcRadius;
        const y = this.unitVector.y * this.arcRadius;
        const z = this.unitVector.z * this.arcRadius;

        return new THREE.Vector3( x, y, z );
    }

    // get points along a smooth curve as an array of Vector3
    getSmoothCurve() {
        // calculate a normal ( taken from Geometry().computeFaceNormals() )
        let cb = new THREE.Vector3(), ab = new THREE.Vector3(), normal = new THREE.Vector3();
        cb.subVectors(new THREE.Vector3(), this.nodeEndVector);
        ab.subVectors(this.nodeStartVector, this.nodeEndVector);
        cb.cross(ab);
        normal.copy(cb).normalize();

        const angle = this.nodeStartVector.angleTo(this.nodeEndVector) - (Math.PI) * 2;
        const angleDelta = angle / (this.smoothness-1);
        let points = []
        for (let i = 0; i < this.smoothness; i++) {
            points.push(this.nodeStartVector.clone().applyAxisAngle(normal, angleDelta * i));
        }
        return points;
    }
}
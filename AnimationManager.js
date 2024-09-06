import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { randFloat, randInt } from 'three/src/math/MathUtils';
import { ServerNode } from './ServerNode.js';
import { NodeConnection } from './NodeConnection.js';
import { ConnectionPackage } from './ConnectionPackage.js';

export class AnimationManager {
    constructor(gridVisible) {
        // create scene
        this.scene = new THREE.Scene();

        // create camera
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera.position.setZ(30);
        
        // create renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('#bg'),
        });
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        // create light
        this.ambientLight = new THREE.AmbientLight( 0xFFFFFF );
        this.scene.add( this.ambientLight )

        // create grid
        if (gridVisible) {
            this.gridHelper = new THREE.GridHelper( 200, 50 );
            this.scene.add( this.gridHelper );
        }

        // create texture loader        
        this.loader = new THREE.TextureLoader();

        // create world
        this.worldRadius = 15;
        const worldGeometry = new THREE.SphereGeometry( this.worldRadius );
        const worldTexture = this.loader.load('./world-map.jpg');
        const worldMaterial = new THREE.MeshStandardMaterial({ map: worldTexture });
        this.world = new THREE.Mesh( worldGeometry, worldMaterial );

        // create group
        this.group = new THREE.Group();
        this.group.position.set( 0,0,0 );
        this.group.add( this.world );
        this.scene.add( this.group );

        // create node and line resources
        this.nodeGeometry = new THREE.SphereGeometry( 0.5 );
        this.activeNodeMaterial = new THREE.MeshStandardMaterial({ color: 0x00FF00 });
        this.inactiveNodeMaterial = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
        this.lineMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
        this.packageGeometry = new THREE.SphereGeometry(0.3);
        this.packageMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF });
        this.nodes = [];
        this.lines = [];
        this.packages = [];

        // set controls
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    }

    // Initialise animation loop
    animate() {
        this.renderer.setAnimationLoop(() => {
            // rotate all objects in group
            this.group.rotation.x += 0.001;
            this.group.rotation.y += 0.0005;
            this.group.rotation.z += 0.001;
        
            // randomly make a node inactive
            let index = randInt(0, 100000);
            if (index < this.nodes.length) {
              this.nodes.at(index).setInactive(); 
            }

            // move packages along lines
            this.packages.forEach(this.updatePackage);
      
            // render frame
            this.renderer.render( this.scene, this.camera );
        });
    }

    createNode( size, longitude, latitude ) {
        const node = new ServerNode( this.nodeGeometry, this.activeNodeMaterial, this.inactiveNodeMaterial, this.worldRadius, longitude, latitude, size );
        this.nodes.push( node );
        this.group.add( node.mesh );
    }

    createConnection( startNode, endNode ) {
        const line = new NodeConnection( startNode, endNode, this.worldRadius, 1.25, 100, this.lineMaterial );
        this.lines.push( line );
        this.group.add( line.line );
    }

    createPackage( line, size, latency ) {
        const connectionPackage = new ConnectionPackage( this.packageGeometry, this.packageMaterial, line.points, size, latency );
        this.packages.push( connectionPackage );
        this.group.add( connectionPackage.mesh );
    }

    updatePackage( value ) {
        value.update();
    }

    calculateRadians( degrees ) {
        const radians = (degrees * Math.PI) / 180;
        return radians;
    }

    createRandomNode() {
        const size = randFloat(0.3, 1);
        const longitude = randFloat(-3.14, 3.14);
        const latitude = randFloat(-3.14, 3.14);
        const node = new ServerNode( this.nodeGeometry, this.activeNodeMaterial, this.inactiveNodeMaterial, this.worldRadius, longitude, latitude, size );
        this.group.add( node.mesh );
        return node;
    }
      
    createRandomNodes( number ) {
        for (let i = 0; i < number; i++) {
            const node = this.createRandomNode();
            this.nodes.push( node );
            if ( i != 0 ) {
                this.createConnection( this.nodes.at( i-1 ), node );
                this.createPackage( this.lines.at( i-1 ), randFloat(0.5, 1), randInt( 5,30 ) );
            }
        }
    }
}
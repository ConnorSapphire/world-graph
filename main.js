import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { randFloat, randInt } from 'three/src/math/MathUtils';
import { ServerNode } from './ServerNode.js';
import { AnimationManager } from './AnimationManager.js';


const manager = new AnimationManager( true );

const nodes = manager.createRandomNodes( 50 );

manager.animate();

// const lineMaterial = new THREE.LineBasicMaterial({ color:0xFFFFFF });
// for (let i = 0; i < 500; i++) {
//   const linePoints = []
//   const startNode = nodes.at(i);
//   const endNode = i < 499 ? nodes.at( i+1 ) : nodes.at( 0 );
//   group.add( setArc3D( new THREE.Vector3(startNode.getMesh().position.x, startNode.getMesh().position.y, startNode.getMesh().position.z), new THREE.Vector3(endNode.getMesh().position.x, endNode.getMesh().position.y, endNode.getMesh().position.z ), 10, lineMaterial, true ));
// }

// function setArc3D(pointStart, pointEnd, smoothness, material, clockWise) {
//   // calculate a normal ( taken from Geometry().computeFaceNormals() )
//   var cb = new THREE.Vector3(), ab = new THREE.Vector3(), normal = new THREE.Vector3();
//   cb.subVectors(new THREE.Vector3(), pointEnd);
//   ab.subVectors(pointStart, pointEnd);
//   cb.cross(ab);
//   normal.copy(cb).normalize();


//   var angle = pointStart.angleTo(pointEnd); // get the angle between vectors
//   if (clockWise) angle = angle - Math.PI * 2;  // if clockWise is true, then we'll go the longest path
//   var angleDelta = angle / (smoothness - 1); // increment

//   var points = [];
//   for (var i = 0; i < smoothness; i++) {
//     points.push(pointStart.clone().applyAxisAngle(normal, angleDelta * i))  // this is the key operation
//   }

//   var geometry = new THREE.BufferGeometry().setFromPoints( points );

//   var arc = new THREE.Line(geometry, material);
//   return arc;
// }
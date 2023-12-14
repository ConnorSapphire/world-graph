import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { randFloat, randInt } from 'three/src/math/MathUtils';
import { ServerNode } from './ServerNode.js';
import { AnimationManager } from './AnimationManager.js';


const manager = new AnimationManager( true );

const nodes = manager.createRandomNodes( 10 );

manager.animate();
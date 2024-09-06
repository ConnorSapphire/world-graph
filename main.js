import './style.css'
import { AnimationManager } from './AnimationManager.js';
import { randFloat } from 'three/src/math/MathUtils.js';

const locations = { Sydney: [ -33.85994, 151.21399 ], NewYork: [ 40.7142700, -74.0059700 ], CapeTown: [ -33.9258400, 18.4232200 ] };

const manager = new AnimationManager( true );

// Object.values(locations).forEach((value) => {
//     const longitude = manager.calculateRadians(-1 * value.at(0));
//     const latitude = manager.calculateRadians(-1 * value.at(1));
//     manager.createNode( randFloat(0.3, 1), longitude, latitude );
// });

// let node = null;
// manager.nodes.forEach(value => {
//     if (node != null) {

//     }
// });

const nodes = manager.createRandomNodes( 10 );

manager.animate();
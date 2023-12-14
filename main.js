import './style.css'
import { AnimationManager } from './AnimationManager.js';


const manager = new AnimationManager( true );

const nodes = manager.createRandomNodes( 10 );

manager.animate();
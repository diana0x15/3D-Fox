import { RESOURCES_LOADED_EVENT } from "../Events.js";
import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Fox from "./Fox.js";
import * as THREE from "three";

/**
 * The class representing the world. This class sets up the environment * and all objects in the world.
 */
export default class World {
  constructor(axesHelper) {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    if (axesHelper) {
      this.scene.add(new THREE.AxesHelper(10));
    }

    // Setup the world only after all resources are ready.
    document.addEventListener(RESOURCES_LOADED_EVENT, () => {
      this.floor = new Floor();
      this.fox = new Fox();

      // Environment should be instantiated after the objects, so that
      // the environment map is applied to all objects.
      this.environment = new Environment();
    });
  }

  update() {
    if (this.fox) {
      this.fox.update();
    }
  }
}

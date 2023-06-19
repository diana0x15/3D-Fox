import { Sizes, Time } from "./Utils.js";
import { SIZES_UPDATE_EVENT, TIME_TICK_EVENT } from "./Events.js";
import Camera from "./Camera.js";
import * as THREE from "three";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Resources from "./Resources.js";
import sources from "./sources.js";

var experienceInstance = null;

/**
 * The singleton class representing the experience. This provides
 * global access to main app components, such as canvas, scene,
 * resources, camera, renderer, world, etc.
 */
export default class Experience {
  constructor(canvas) {
    if (experienceInstance) {
      return experienceInstance;
    }
    experienceInstance = this;

    if (!canvas) {
      console.error("Missing canvas element.");
      return;
    }

    // Setup
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    this.setupEventListeners();
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }

  setupEventListeners() {
    document.addEventListener(SIZES_UPDATE_EVENT, () => {
      this.resize();
    });

    document.addEventListener(TIME_TICK_EVENT, () => {
      this.update();
    });
  }
}

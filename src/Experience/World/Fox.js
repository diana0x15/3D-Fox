import Experience from "../Experience";
import * as THREE from "three";
import Debug from "../Debug.js";

/**
 * A representation of a 3D fox model.
 */
export default class Fox {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    this.resource = this.resources.items.foxModel;

    this.setModel();
    this.setAnimation();
    this.setDebug();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(0.02, 0.02, 0.02);
    this.scene.add(this.model);

    // Activate shadow on all meshes in the model.
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  setAnimation() {
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.model);

    // Setup all possible actions in the animation.
    this.animation.actions = {};
    this.animation.actions.idle = this.animation.mixer.clipAction(
      this.resource.animations[0]
    );
    this.animation.actions.walk = this.animation.mixer.clipAction(
      this.resource.animations[1]
    );
    this.animation.actions.run = this.animation.mixer.clipAction(
      this.resource.animations[2]
    );

    // By default, start the idle action.
    this.animation.actions.current = this.animation.actions.idle;
    this.animation.actions.current.play();

    // Start a new animation provided in a parameter.
    this.animation.play = (name) => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;
      console.log(oldAction);

      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(oldAction, /* duration= */ 1);

      this.animation.actions.current = newAction;
    };
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001);
  }

  setDebug() {
    if (this.debug.isActive) {
      this.debugFolder = this.debug.ui.addFolder("Fox");
      const debugObject = {
        idle: () => {
          this.animation.play("idle");
        },
        walk: () => {
          this.animation.play("walk");
        },
        run: () => {
          this.animation.play("run");
        },
      };
      this.debugFolder.add(debugObject, "idle");
      this.debugFolder.add(debugObject, "walk");
      this.debugFolder.add(debugObject, "run");
    }
  }
}

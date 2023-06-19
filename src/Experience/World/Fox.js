import Experience from "../Experience";
import * as THREE from "three";

/**
 * A representation of a 3D fox model.
 */
export default class Fox {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    this.foxResources = this.resources.items.foxModel;

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    this.model = this.foxResources.scene;
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
    this.animation.action = this.animation.mixer.clipAction(
      this.foxResources.animations[0]
    );
    this.animation.action.play();
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}

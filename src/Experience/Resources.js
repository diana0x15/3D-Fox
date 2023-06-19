import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RESOURCES_LOADED_EVENT } from "./Events";

export default class Resources {
  constructor(sources) {
    this.sources = sources;
    this.loaders = {};
    this.items = {};
    this.itemsCount = 0;

    this.setupLoaders();
    this.startLoading();
  }

  setupLoaders() {
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source, loadedFile) {
    if (!source || !loadedFile) {
      return;
    }

    this.items[source.name] = loadedFile;
    this.itemsCount++;

    // Trigger an event when all resouces are loaded.
    if (this.itemsCount == this.sources.length) {
      document.dispatchEvent(new Event(RESOURCES_LOADED_EVENT));
    }
  }
}

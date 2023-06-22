import * as lil from "lil-gui";

export default class Debug {
  constructor() {
    this.isActive = window.location.hash === "#debug";

    if (this.isActive) {
      this.ui = new lil.GUI();
    }
  }
}

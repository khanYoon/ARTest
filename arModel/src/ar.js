/* global AFRAME */

AFRAME.registerComponent('ar', {
  schema: {
    takeOverCamera: {default: true},
    cameraUserHeight: {default: false},
    worldSensing: {default: false},
    hideUI: {default: true}
  },
  dependencies: ['three-ar', 'mozilla-xr-ar', 'ar-planes', 'ar-anchors'],
  getSource: function () {
    try {
      var whichar;
      if (!this.source) {
        whichar = this.el.sceneEl.components['three-ar'];
        if (whichar && whichar.arDisplay) {
          this.source = whichar.arDisplay;
        }
      }
      if (!this.source) {
        whichar = this.el.sceneEl.components['mozilla-xr-ar'];
        if (whichar && whichar.arDisplay) {
          this.source = whichar;
        }
      }
      return this.source;
    } catch (e) {
alert(e);
    } finally {

    }

  },
  getPlanes: function () {
    try {
      return this.source ? this.source.getPlanes() : undefined;
    } catch (e) {
alert(e);
    } finally {

    }

  },
  getAnchors: function () {
    try {
      return this.source ? this.source.getAnchors() : undefined;
    } catch (e) {
alert(e);
    } finally {

    }

  },
  addImage: function (name, url, physicalWidth) {

    try {
      return this.source.addImage(name, url, physicalWidth);
    } catch (e) {
alert(e);
    } finally {

    }
  },
  removeImage: function (name) {

    try {
      return this.source.removeImage(name);
    } catch (e) {
alert(e);
    } finally {

    }
  },
  init: function () {
    alert("load");
    try {
      var options = {
        takeOverCamera: this.data.takeOverCamera,
        cameraUserHeight: this.data.cameraUserHeight,
        worldSensing: this.data.worldSensing
      };

      this.el.setAttribute('three-ar', options);
      this.el.setAttribute('mozilla-xr-ar', options);

      if (this.data.hideUI) {
        this.el.sceneEl.setAttribute('vr-mode-ui', {enabled: false});
      }

      // Ensure passthrough is visible, make sure A-Frame styles don't interfere.
      document.head.insertAdjacentHTML('beforeend',
        '<style>html,body {background-color: transparent !important;}</style>');
    } catch (e) {
alert(e);
    } finally {

    }

  }
});

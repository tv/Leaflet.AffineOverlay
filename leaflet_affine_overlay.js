'use strict';

if (typeof(L) !== 'undefined') {

   L.AffineOverlay = L.ImageOverlay.extend({
    options: {
      opacity: 1,
      transform: [],
      transformorigin: {
        x: 0,
        y: 0,
      }
    },
    initialize: function (url, options) {
      this._url = url;
      L.setOptions(this, options);
    },
    onAdd: function (map) {
      this._map = map;
      this._bounds = map.getBounds();

      if (!this._image) {
        this._initImage();

        if (this.options.opacity < 1) {
          this._updateOpacity();
        }

        if (this.options.transform.length !== 0) {
          this._updateTransform();
        }
      }

      map._panes.overlayPane.appendChild(this._image);
      map.on('viewreset', this._reset, this);

      if (map.options.zoomAnimation && L.Browser.any3d) {
        map.on('zoomanim', this._animateZoom, this);
      }

      this._reset();
    },
    setTransform: function (transform, origin) {
      this.options.transform = transform;
      this.options.transformorigin = origin;

      if (this._image) {
        this._updateTransform();
      }

      return this;
    },
    _updateTransform: function () {

      var matrix = this.options.transform;
      var origin = this.options.transformorigin;

      if (typeof matrix[0] === 'object') {
          // If matrix is form of [[x,y,z],[o,p,q],[m,n,o]];
          // concat it to [x,y,z...m,n,n]
          matrix = Array.concat.call([], matrix);
      }
      matrix = matrix.map(function (val) {
        return val.toFixed(12);
      });

      var elm = this._image;
      elm.css({
        '-webkit-transform'        : 'matrix(' + matrix.join(',') + ')',
        '-webkit-transform-origin' : origin.x + 'px ' + origin.y + 'px ',
        '-moz-transform'           : 'matrix(' + matrix.join(',') + ')',
        '-moz-transform-origin'    : origin.x + 'px ' + origin.y + 'px ',
        '-o-transform'             : 'matrix(' + matrix.join(',') + ')',
        '-o-transform-origin'      : origin.x + 'px ' + origin.y + 'px ',
        '-ms-transform'            : 'matrix(' + matrix.join(',') + ')',
        '-ms-transform-origin'     : origin.x + 'px ' + origin.y + 'px ',
        'transform'                : 'matrix(' + matrix.join(',') + ')',
        'transform-origin'         : origin.x + 'px ' + origin.y + 'px ',
      });
    },
    _reset: function () {
      var image = this._image;
      var topLeft = this._map.latLngToLayerPoint(this._bounds.getNorthWest());

      L.DomUtil.setPosition(image, topLeft);
      this._updateTransform();
      // Same as imageOVerlay, but ignore size
    },
  });
}

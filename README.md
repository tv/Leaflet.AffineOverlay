Leaflet.AffineOverlay
=====================

Leaflet ImageOverlay with css transform support

## How to use

Transform should be in CSS transform matrix-standard

```javascript

var myLayer = new L.AffineOverlay('url of my image',
  {
    opacity: 1,
    transform: [],
    transformorigin: {
      x: 0,
      y: 0,
    }
  }
);

myLayer.addTo(map);

myLayer.setTransform(transform, origin);

```



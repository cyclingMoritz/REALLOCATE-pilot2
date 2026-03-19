var baseCoordinates = [2.16067522513251, 41.39093798964388];
var baseBounds = [
  [1.5703315311961603, 40.972277499709804], // Southwest coordinates
  [2.7920111626752373, 41.84544156594339], // Northeast coordinates
];
var mainAttribution = "Map by BSC - DataViz Team";
//Order by: lower layers first, top layers last
var layers = [
  {
    name: "Accidents Points",
    sourceLayerName: "accidents", //source-layer & source
    attribution:
      "Accessibility Data <a href='https://opendata-ajuntament.barcelona.cat/data/ca/dataset/accessibilitat-via-publica'>©Ajuntament de Barcelona</a> (<a href='https://creativecommons.org/licenses/by/4.0/deed.ca'>CC BY 4.0</a>)",
    sourceType: "geojson",
    layerType: "circle",
    symbolization: {      
      "circle-stroke-width": 1,
      "circle-stroke-color": "#333",
      "circle-color": [
        "match",
        ["get", "Type"],   // property name in your GeoJSON
        "Obstacles", "hsl(211, 25%, 61%)",
        "Unevenness", "hsl(120, 40%, 55%)",
        "Width", "hsl(30, 70%, 60%)",
        /* default color */ "hsl(0, 0%, 70%)"
      ],
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        12, 0,
        15, 5
      ]

    },
    legend: {
      id: "legend-a",
      class: "legend",
      items: [
        {
          styleHeight: "10px",
          display: "inline-block",
          backgroundColor: "hsl(211, 25%, 61%)",
          range: ["Points"],
        },
      ],
    },
    states: {
      visible: "visible",
      popUps: true,
      icons: true,
      filterCat: true,
      highlight: false,
      filterLayer: false,
      dateRange: false,
    },
    popUpFeatures: {
      event: "click",
      fields: []
      // img: "image" // optional, you can add later if needed
    },
    filterBy: {
      active: false,
      fFeature: "Type",
    },
  }


];

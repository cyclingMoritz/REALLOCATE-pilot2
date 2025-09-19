var baseCoordinates = [2.16067522513251, 41.39093798964388];
var baseBounds = [
  [1.5703315311961603, 40.972277499709804], // Southwest coordinates
  [2.7920111626752373, 41.84544156594339], // Northeast coordinates
];
var mainAttribution = "Map by BSC - DataViz Team";
//Order by: lower layers first, top layers last
var layers = [
  {
    name: "Accessibility Points",
    sourceLayerName: "bsc_pilot2_all", //source-layer & source
    attribution:
      "Accessibility Data <a href='https://opendata-ajuntament.barcelona.cat/data/ca/dataset/accessibilitat-via-publica'>©Ajuntament de Barcelona</a> (<a href='https://creativecommons.org/licenses/by/4.0/deed.ca'>CC BY 4.0</a>)",
    sourceType: "geojson",
    layerType: "circle",
    symbolization: {      "circle-radius": 6,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#333",
      "circle-color": [
        "match",
        ["get", "Type"],   // property name in your GeoJSON
        "Obstacles", "hsl(211, 25%, 61%)",
        "Unevenness", "hsl(120, 40%, 55%)",
        "Width", "hsl(30, 70%, 60%)",
        /* default color */ "hsl(0, 0%, 70%)"
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
      fields: ["Type", "Evaluation", "Value"]
      // img: "image" // optional, you can add later if needed
    },
    filterBy: {
      active: false,
      fFeature: "Type",
    },
  },
  {
    name: "Obstacles",
    sourceLayerName: "IMPD_obstacles", //source-layer & source
    attribution:
      "Accessibility Data: <a href='https://opendata-ajuntament.barcelona.cat/data/ca/dataset/accessibilitat-via-publica'>©Ajuntament de Barcelona</a> (<a href='https://creativecommons.org/licenses/by/4.0/deed.ca'>CC BY 4.0</a>)",
    sourceType: "geojson",
    layerType: "circle",
    symbolization: {      
      "circle-radius": 5,
      // "circle-stroke-width": 1,
      // "circle-stroke-color": "#333",
      "circle-color": [
        "match",
        ["get", "Evaluation"],   // property name in your GeoJSON
        "Light", "#F6CF71",
        "Moderate", "#F89C74",
        "Severe", "#F03B20",
        /* default color */ "hsl(0, 0%, 70%)"
      ]

    },
    legend: {
      id: "legend-a",
      class: "legend",
      items: [
    {
      styleHeight: "12px",
      display: "inline-block",
      backgroundColor: "#F6CF71",
      range: ["Light"]
    },
    {
      styleHeight: "12px",
      display: "inline-block",
      backgroundColor: "#F89C74",
      range: ["Moderate"]
    },
    {
      styleHeight: "12px",
      display: "inline-block",
      backgroundColor: "#F03B20",
      range: ["Severe"]
    }
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
      fields: ["Type", "Evaluation", "Value"]
      // img: "image" // optional, you can add later if needed
    },
    filterBy: {
      active: false,
      fFeature: "Type",
    },
  },
  {
    name: "Unevenness",
    sourceLayerName: "IMPD_unevenness", //source-layer & source
    attribution:
      "",
    sourceType: "geojson",
    layerType: "circle",
    symbolization: {      
      "circle-radius": 5,
      // "circle-stroke-width": 1,
      // "circle-stroke-color": "#333",
      "circle-color": [
        "match",
        ["get", "Evaluation"],   // property name in your GeoJSON
        "Accessible", "#A6D96A",
        "Non accessible", "#F03B20",
        /* default color */ "hsl(0, 0%, 70%)"
      ]

    },
    legend: {
      id: "legend-a",
      class: "legend",
      items: [
    {
      styleHeight: "12px",
      display: "inline-block",
      backgroundColor: "#A6D96A",
      range: ["Accessible"]
    },
    {
      styleHeight: "12px",
      display: "inline-block",
      backgroundColor: "#F03B20",
      range: ["Non accessible"]
    }
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
      fields: ["Type", "Evaluation", "Value"]
      // img: "image" // optional, you can add later if needed
    },
    filterBy: {
      active: false,
      fFeature: "Type",
    },
  },
    {
    name: "Width",
    sourceLayerName: "IMPD_width", //source-layer & source
    attribution:
      "",
    sourceType: "geojson",
    layerType: "circle",
    symbolization: {      
      "circle-radius": 5,
      // "circle-stroke-width": 1,
      // "circle-stroke-color": "#333",
      "circle-color": [
        "match",
        ["get", "Evaluation"],   // property name in your GeoJSON
        "Accessible", "#A6D96A",
        "Partially", "#F6CF71",
        /* default color */ "hsl(0, 0%, 70%)"
      ]

    },
    legend: {
      id: "legend-a",
      class: "legend",
      items: [
    {
      styleHeight: "12px",
      display: "inline-block",
      backgroundColor: "#A6D96A",
      range: ["Accessible"]
    },
    {
      styleHeight: "12px",
      display: "inline-block",
      backgroundColor: "#F6CF71",
      range: ["Partially"]
    }
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
      fields: ["Type", "Evaluation", "Value"]
      // img: "image" // optional, you can add later if needed
    },
    filterBy: {
      active: false,
      fFeature: "Type",
    },
  },
];

var baseCoordinates = [2.16067522513251, 41.39093798964388];
var baseBounds = [
  [1.5703315311961603, 40.972277499709804], // Southwest coordinates
  [2.7920111626752373, 41.84544156594339], // Northeast coordinates
];
var mainAttribution = "Map by BSC - DataViz Team";
//Order by: lower layers first, top layers last
var layers = [


  // Slope
  {
    name: "Slope",
    sourceLayerName: "IMPD_slope", //source-layer & source
    attribution:
      "",
    sourceType: "geojson",
    layerType: "circle",
    symbolization: {      
      // "circle-radius": 5,
      // "circle-stroke-width": 1,
      // "circle-stroke-color": "#333",
      "circle-color": [
        "match",
        ["get", "Evaluation"],   // property name in your GeoJSON
        "Accessible", "#A6D96A",
        "Accessible Transversally","#F6CF71",
        "Accessible Longitudinally","#F6CF71",
        "Non accessible", "#F03B20",
        /* default color */ "hsl(0, 0%, 70%)"
      ],
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        12, 0,
        15, 5,
        20, 5
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
      range: ["Accessible Transversally"]
    },
    {
      styleHeight: "12px",
      display: "inline-block",
      backgroundColor: "#F6CF71",
      range: ["Accessible Longitudinally"]
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
    popUps: {
      "event": "mousemove",
      "popUpFeatures": [
        {
          "type": "keyword",
          "text": "Type: ",
          "value": "Type"
        },
        {
          "type": "keyword",
          "text": "Evaluation: ",
          "value": "Evaluation"
        },
        {
          "type": "keyword",
          "text": "Value: ",
          "value": "value"
        },
      ]
      },
    filterBy: {
      active: false,
      fFeature: "Type",
    },
  },
  // Width
    {
    name: "Width",
    sourceLayerName: "IMPD_width", //source-layer & source
    attribution:
      "",
    sourceType: "geojson",
    layerType: "circle",
    symbolization: {      
      // "circle-radius": 5,
      // "circle-stroke-width": 1,
      // "circle-stroke-color": "#333",
      "circle-color": [
        "match",
        ["get", "Evaluation"],   // property name in your GeoJSON
        "Accessible", "#A6D96A",
        "Partially accessible", "#F6CF71",
        "Non accessible", "#F03B20",

        /* default color */ "hsl(0, 0%, 70%)"
      ],
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        12, 0,
        15, 5,
        20, 5
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
      range: ["Partially accessible"]
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
    popUps: {
      "event": "mousemove",
      "popUpFeatures": [
        {
          "type": "keyword",
          "text": "Type: ",
          "value": "Type"
        },
        {
          "type": "keyword",
          "text": "Evaluation: ",
          "value": "Evaluation"
        },
        {
          "type": "keyword",
          "text": "Value: ",
          "value": "value"
        },
      ]
      },
    filterBy: {
      active: false,
      fFeature: "Type",
    },
  },
  // Metro Access
    {
    name: "Metro Access",
    sourceLayerName: "IMPD_metro", //source-layer & source
    attribution:
      "",
    sourceType: "geojson",
    layerType: "circle",
    symbolization: {      
      // "circle-radius": 5,
      // "circle-stroke-width": 1,
      // "circle-stroke-color": "#333",
      "circle-color": [
        "match",
        ["get", "Evaluation"],   // property name in your GeoJSON
        "Elevator", "#A6D96A",
        "Step-free access","#F6CF71",
        "Stairs only", "#F03B20",
        /* default color */ "hsl(0, 0%, 70%)"
      ],
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        12, 0,
        15, 5,
        20, 5
      ]

    },
    legend: {
      id: "legend-a",
      class: "legend",
      items:  [
    {
      styleHeight: "12px",
      display: "inline-block",
      backgroundColor: "#A6D96A",
      range: ["Elevator"]
    },
    {
      styleHeight: "12px",
      display: "inline-block",
      backgroundColor: "#F6CF71",
      range: ["Step-free access"]
    },

    {
      styleHeight: "12px",
      display: "inline-block",
      backgroundColor: "#F03B20",
      range: ["Stairs only"]
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
    popUps: {
      "event": "mousemove",
      "popUpFeatures": [
        {
          "type": "keyword",
          "text": "Type: ",
          "value": "Type"
        },
        {
          "type": "keyword",
          "text": "Evaluation: ",
          "value": "Evaluation"
        },
        {
          "type": "keyword",
          "text": "Value: ",
          "value": "value"
        },
      ]
      },
    filterBy: {
      active: false,
      fFeature: "Type",
    },
  },
  // Bus Stops
    {
    name: "Bus Stops",
    sourceLayerName: "IMPD_bus", //source-layer & source
    attribution:
      "",
    sourceType: "geojson",
    layerType: "circle",
    symbolization: {      
      // "circle-radius": 5,
      // "circle-stroke-width": 1,
      // "circle-stroke-color": "#333",
      "circle-color": [
        "match",
        ["get", "Evaluation"],   // property name in your GeoJSON
        "Has PID", "#A6D96A",
        "No PID", "#F03B20",
        /* default color */ "hsl(0, 0%, 70%)"
      ],
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        12, 0,
        15, 5,
        20, 5
      ]

    },
    legend: {
      id: "legend-a",
      class: "legend",
      items:  [
    {
      styleHeight: "12px",
      display: "inline-block",
      backgroundColor: "#A6D96A",
      range: ["Has PID"]
    },
    {
      styleHeight: "12px",
      display: "inline-block",
      backgroundColor: "#F03B20",
      range: ["No PID"]
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
    popUps: {
      "event": "mousemove",
      "popUpFeatures": [
        {
          "type": "keyword",
          "text": "Type: ",
          "value": "Type"
        },
        {
          "type": "keyword",
          "text": "Evaluation: ",
          "value": "Evaluation"
        },
        {
          "type": "keyword",
          "text": "Value: ",
          "value": "value"
        },
      ]
      },
    filterBy: {
      active: false,
      fFeature: "Type",
    },
  },

  {
    name: "Accessibility Score",
    sourceLayerName: "IMPD_barris", // source-layer & source
    attribution: "",
    sourceType: "geojson",
    layerType: "fill",   // polygons
    symbolization: {      
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "Accessibility Score"],
        0, "#d7191c",   // good (green)
        50, "#ffffbf", // neutral (yellowish)
        100, "#1a9641"   // bad (red)
      ],
      "fill-opacity": 0.7,
      "fill-outline-color": "#333",
    },
    legend: {
      id: "legend-a",
      class: "legend",
      gradient: {
        colors: ["#d7191c", "#ffffbf", "#1a9641"],
        range: ["0 (Bad)", "50", "100 (Good)"]
      }
    },
    states: {
      visible: "visible",
      popUps: true,
      icons: false,
      filterCat: false,
      highlight: true,   // could highlight polygon border on hover
      filterLayer: false,
      dateRange: false,
    },
    popUps: {
      "event": "mousemove",
      "popUpFeatures": [
        {
          "type": "keyword",
          "text": "Type: ",
          "value": "Type"
        },
        {
          "type": "keyword",
          "text": "Evaluation: ",
          "value": "Evaluation"
        },
        {
          "type": "keyword",
          "text": "Value: ",
          "value": "value"
        },
      ]
      },
    filterBy: {
      active: false,
      fFeature: "Number",
    },
  },
];

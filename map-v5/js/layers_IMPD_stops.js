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
      event: "mousemove",
      popUpFeatures: [
        {
          type: "title",      // Tells the JS to render this as an <h3>
          value: "Type"       // The GeoJSON property to grab
        },
        {
          type: "keyword",       // Tells the JS to render the colored badge
          text: "Evaluation: ",
          value: "Evaluation"
        },
        {
          type: "keyword",    // Tells the JS to render standard text
          text: "Value: ",
          value: "Value"
        }
      ]
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
      event: "mousemove",
      popUpFeatures: [
        {
          type: "title",      // Tells the JS to render this as an <h3>
          value: "Type"       // The GeoJSON property to grab
        },
        {
          type: "keyword",       // Tells the JS to render the colored badge
          text: "Evaluation: ",
          value: "Evaluation"
        },
        {
          type: "keyword",    // Tells the JS to render standard text
          text: "Value: ",
          value: "Value"
        }
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
    sourceLayerName: "IMPD_metro", // source-layer & source
    attribution: "",
    sourceType: "geojson",
    layerType: "symbol", // Changed from "circle" to "symbol"
    symbolization: {      
      layout: {
        visibility: "visible",
        "icon-allow-overlap": true,
        // Match the image based on the Evaluation property
        "icon-image": [
          "match",
          ["get", "Evaluation"],
          "Elevator", "metro-marker-green",         // <-- Replace with your actual green SVG filename from Spreet
          "Step-free access", "metro-marker-yellow", // <-- Replace with your actual yellow SVG filename from Spreet
          "Stairs only", "metro-marker-red",        // <-- Replace with your actual red SVG filename from Spreet
          /* default */ "metro-marker"      // <-- Replace with your default SVG filename
        ],
        // Adapted zoom interpolation (using decimals for scale instead of pixels)
        "icon-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          12, 0,
          15, 0.05, // Adjust this decimal to match the size you want!
          20, 0.10  // Adjust this decimal to match the size you want!
        ]
      },
      paint: {} // Must be empty so the validator doesn't complain!
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
      event: "mousemove",
      popUpFeatures: [
        {
          type: "title",      
          value: "Type"       
        },
        {
          type: "keyword",    
          text: "Name: ",
          value: "NOM_ACCÉS" // Notice it keeps your specific Metro property!
        },
        {
          type: "keyword",       
          text: "Evaluation: ",
          value: "Evaluation"
        }
      ]
    },
    filterBy: {
      active: false,
      fFeature: "Type",
    },
  },


// Bus Stops// Bus Stops (Basic Icon Test)
{
    name: "Bus Stops",
    sourceLayerName: "IMPD_bus", 
    attribution: "",
    sourceType: "geojson",
    layerType: "symbol", 
    symbolization: {      
    layout: {
          visibility: "visible",
          "icon-allow-overlap": true,
          // Swap the image based on the Evaluation property
          "icon-image": [
            "match",
            ["get", "Evaluation"],
            "Has PID", "bus-marker-green", // <-- Your actual green icon name
            "No PID", "bus-marker-red",    // <-- Your actual red icon name
            "bus-marker-default"           // <-- Your default icon name
          ],
          // Re-adding your zoom interpolation!
          "icon-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            12, 0,     // At zoom 12 and below, the icon disappears (size 0)
            15, 0.05,  // At zoom 15, scale to 15% (Adjust this decimal!)
            20, 0.10   // At zoom 20, scale to 25% (Adjust this decimal!)
          ]
        },
      paint: {}
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
      visible: true,
      popUps: true,
      icons: true,
      highlight: false,
      category: true,
      dateRange: false,
    },
    popUps: {
      event: "mousemove",
      popUpFeatures: [
        {
          type: "title",      
          value: "Type"       
        },
        {
          type: "keyword",    
          text: "Name: ",
          value: "NOM_PARADA"
        },
        {
          type: "keyword",       
          text: "Evaluation: ",
          value: "Evaluation"
        }
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
          event: "mousemove",
          popUpFeatures: [
            {
              type: "title",       // Now the Name becomes the <h3> automatically!
              value: "Type"
            },
            {
              type: "keyword",
              text: "Neighbourhood: ",
              value: "Name"
            },
            {
              type: "keyword",
              text: "Neighbourhood n: ",
              value: "Number"
            },
            {
              type: "keyword",
              text: "Score: ",
              value: "Accessibility Score"
            }
          ]
        },

    filterBy: {
      active: false,
      fFeature: "Number",
    },
  },



];

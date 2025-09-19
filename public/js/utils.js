class rotationControl {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl"; //As it will be added on the "top-left" to activate pointer functions the class maplibre-ctrl has to be added

    const icon = document.createElement("button");
    icon.className = "maplibre-ctrl-icon"; //Adds default icon style
    icon.style.backgroundImage = "url(icons/arrow-circle.svg)"; //Change the icon image path
    icon.style.backgroundSize = "contain";
    icon.style.width = "30px";
    icon.style.height = "30px";

    // Append the icon button to the container
    this._container.appendChild(icon);

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
} //End of rotationControl class

function addMap(baseCoordinates) {
  const map = new maplibregl.Map({
    container: "map", //Container ID
    style: {
        'version': 8,
        'sources': {
            'raster-tiles': {
                'type': 'raster',
                'tiles': [
                    `https://geoserveis.icgc.cat/servei/catalunya/mapa-base/wmts/administratiu/MON3857NW/{z}/{x}/{y}.png`,

                ],
                'tileSize': 256,
                'attribution':
                    '<b>ContextMaps</b>: <a href="https://www.icgc.cat/ca/Eines-i-visors/Visors/ContextMaps">Institut Cartogràfic i Geològic de Catalunya</a>'
            }
        },
        'layers': [
            {
                'id': 'wmts-layer',
                'type': 'raster',
                'source': 'raster-tiles',
                'minzoom': 0,
                'maxzoom': 22
            }
        ]
    },
    center: baseCoordinates, //Starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 12, //Starting zoom
    minZoom: 11.5, //Zoom bounds
    maxZoom: 16,
    maxBounds: baseBounds, //Coordinate bounds
    pitch: 45,
    bearing: -45,
    attributionControl: false, //No default attribution
  });
  return map;
} //End of addMap

function addControls(map, selectedLayers, rotationStates) {
  map.addControl(new maplibregl.ScaleControl({ unit: "metric" }));
  // Navigation control: physical zoom and re-orienting to north
  map.addControl(new maplibregl.NavigationControl(), "top-left");

  const allAttributions = [
    mainAttribution,
    ...selectedLayers
      .map(layer => layer.attribution)
      .filter(attr => attr && attr.trim() !== "")
  ].filter(Boolean); // remove any remaining falsy values

  const atr = allAttributions.join(" | ");

  map.addControl(
    new maplibregl.AttributionControl({
      compact: true,
      customAttribution: atr,
    })
  );

  // Adding rotationControl
  map.addControl(new rotationControl(), "top-left");
  const icon = document.querySelector(".maplibre-ctrl-icon");
  icon.addEventListener("click", () => {
    activateMapRotation(map, icon, rotationStates);
  });
} //End of addControls

function createCheckboxes({labelClass, labelHTML, checkboxID, defaultChecked, checkboxActivation, spanClass}){
  // Label
  const label = Object.assign(document.createElement("label"), {
    className: labelClass,
    innerHTML: labelHTML
  });

  // Checkbox
  const checkbox = Object.assign(document.createElement("input"), {
    type: "checkbox",
    id: checkboxID,
    checked: defaultChecked
  });

    // EventListener
    if (checkboxActivation){
      checkbox.addEventListener("change", checkboxActivation);
    }

  // Span
  const span = Object.assign(document.createElement("span"), {
    className: spanClass
  });
  
  // Append
  label.append(checkbox, span);

  return label
}

function addButtons(map, selectedLayers) {
  const layerButtons = document.getElementById("layerButtons");

  selectedLayers.forEach((layer) => {
    let label = createCheckboxes({
      labelClass: "chicboxes",
      labelHTML: layer.name,
      checkboxID: `checkbox-${layer.sourceLayerName}`,
      defaultChecked: layer.states.visible,
      checkboxActivation: () => layerVisibility(map, `checkbox-${layer.sourceLayerName}`),
      spanClass: "checkmark"
    });

    layerButtons.append(
      label,
      addLegend(layer.legend),
      document.createElement("br")
    );
  }); //End of forEach selectedLayer
} //End of addButtons

function addLegend(legendData) {
  let legend = document.createElement("div");
  legend.id = legendData.id;
  legend.className = legendData.class;
  legendData.items.forEach((item) => {
    let subDiv = document.createElement("div");
    subDiv.innerHTML = `<span style="background-color: ${item.backgroundColor}"></span>`;

    let range = item.range.join(" - ");
    let text = document.createElement("i");
    text.textContent = range;
    subDiv.appendChild(text);
    legend.appendChild(subDiv);
  });

  return legend;
} //End of addLegend

function addSlots(map, length) {
  // Empty source to add the layers without data (positioning layers)
  map.addSource("empty", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] },
  });

  // The first positioning layer
  map.addLayer({
    id: "layerIndex0",
    type: "symbol",
    source: "empty",
  });
  
  // Postioning layers in relation to each other, dependant on the amount of layers (length) a map has
  for(i=1; i<length; i++){
    map.addLayer({
      id: `layerIndex${i}`,
      type: "symbol",
      source: "empty",
    },
    `layerIndex${i-1}`
    );
  };
} //End of addSlots

async function sendRequest(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log("Error", error);
    // alert("Request error");
    return null;
  }
} //End of sendRequest

function addFilterCategories(map, categories) {
  const filtersDiv = document.getElementById("category-filters");

  const allCheckbox = createCheckboxes({ labelClass: "chicboxes", labelHTML: "All", checkboxID: `all-checkbox`, defaultChecked: true, checkboxActivation: false, spanClass: "checkmark" });
  filtersDiv.appendChild(allCheckbox);

  categories.forEach((category) => {
    const label = createCheckboxes({ labelClass: "chicboxes", labelHTML: `${category}`, checkboxID: `${category}`, defaultChecked: true, checkboxActivation: false, spanClass: "checkmark" });
    filtersDiv.appendChild(label);
  });

  // var filterByCategory; // Local var to store the filter

  const checkboxes = filtersDiv.querySelectorAll('input[type="checkbox"]'); //Select all category checkboxes
  
  // If "All" changes, all the checkboxes from other categories change accordingly
  const allChecked = document.getElementById("all-checkbox");
  allChecked.addEventListener("change", () => {
    allChecked.checked
      ? checkboxes.forEach((cb) => {
          cb.checked = true;
        })
      : checkboxes.forEach((cb) => {
          cb.checked = false;
        });
  });

  // Event listener to filter layer based on checkboxes
  filtersDiv.addEventListener("change", () => {
    // Create array with the id of selected (checked) categories
    const selectedCategories = Array.from(checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.id);

    // FIX: For now filterByCategory is a global variable
    if (selectedCategories.length === 0) {
      // If none selected, hide everything
      filterByCategory = ["in", ["get", "category"], null];
    } else {
      // Create filter with selected categories
      filterByCategory = ["in", ["get", "category"], ["literal", selectedCategories]];
    }
    //QZ

    // console.log(typeof filterByCategory+". filterByCategories: "+ filterByCategory.toString() + " | "+ typeof selectedCategories+". Categories: "+selectedCategories);
    /* Com l'event listener està aplicat a l'element que conté tots els filtres, 
      incloent el la checkbox "All" per arreglar la combinació només s'haurà de cridar
      la funció d'aplicar filtres actuals aquí:*/
    allFilters(map); //filterByCategory and filteredLayers are now global variables so parameters aren't needed

    // filteredLayers.forEach((layerID) => {
    //   map.setFilter(layerID, filterByCategory);
    // });

    //qz
  }); //End of addEventListener filtersDiv
} //End of addFilterCategories

function addSources(map, layer_data, sourceLayerName, sourceType) {
  map.addSource(sourceLayerName, {
    type: sourceType,
    data: layer_data,
  });
} //End of addSources

function addLayers(map, layerType, sourceLayerName, symbolization, visible, bID) {
  map.addLayer(
    {
      id: sourceLayerName,
      type: layerType,
      source: sourceLayerName,
      layout: { visibility: visible },
      paint: symbolization,
    },
    bID //Before Layer ID, to order layers according to slots
  );
} //End of addLayers

function addPopUps(map, layerName, title, desc, img, event) {
  // let geomType = getFeatureState({source: layerName,id: layerName});//getGeometry();
  // console.log(geomType);//.geometry);//type);
  map.on(event, layerName, function (e) {
    map.getCanvas().style.cursor = "pointer";
    let text = "";
    const firstFeature = e.features[0];

    // let lFeature = e.features[0].fid;

    for (key in firstFeature.properties) {
      switch (key) {
        case title:
          text += `<h2> ${firstFeature.properties[key]} </h2>`;
          break;
        case desc:
          text += `<p> ${firstFeature.properties[key]} </p>`;
          break;
        case img:
          text += `<img width=200 src= ${firstFeature.properties[key]}><br>`;
          break;
      }
    }

    let popup = new maplibregl.Popup({ closeButton: false })
      .setLngLat(e.lngLat)
      .setHTML(text)
      .addTo(map);

    // if (popup.isOpen()) {
    //   console.log("popup open");
    //   popup.close();
    // } else {
    //   popup.addTo(map);
    // }

    //.addTo(map);
    // const popups = document.getElementsByClassName("mapboxgl-popup");
    // if (popups.length) {
    //     popups[0].remove();
    // }
  });
  map.on("mouseenter", layerName, function () {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", layerName, function () {
    map.getCanvas().style.cursor = "";
    // popup.remove();
  });
} //End of addPopUps

function addPopUps1(map, layerName, event, title, desc) {
  let hoveredPopup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  // Store the ID of the currently hovered feature
  let currentFeatureId = null;

  map.on(event, layerName, function (e) {
    const feature = e.features[0];

    if (!feature) return;

    const featureId = feature.properties.fid || feature.id || feature.fid;

    // Only update the popup if it's a new feature
    if (featureId !== currentFeatureId) {
      currentFeatureId = featureId;

      hoveredPopup
        .setLngLat(e.lngLat)
        .setHTML(`${title} ${feature.properties[desc]}`)
        .addTo(map);
    } else {
      // Same feature, just update position
      hoveredPopup.setLngLat(e.lngLat);
    }
  }); //End map.on(event,layerName)

  // map.on("mouseenter", layerName, function () {
  //   map.getCanvas().style.cursor = "pointer";
  // });

  map.on("mouseleave", layerName, function () {
    hoveredPopup.remove();
    currentFeatureId = null;
    map.getCanvas().style.cursor = "";
  });
} //End of addPopUps1

function addPopUps2(map, layerName, fields, event) {
  map.on(event, layerName, function (e) {
    const props = e.features[0].properties;

    // Start popup HTML
    let html = `<div class="popup-content" style="font-family: sans-serif; font-size: 13px;">`;

    // Use Type as title if it exists
    if (props["Type"]) {
      html += `<h3 style="margin:0 0 5px 0; font-size: 14px;">${props["Type"]}</h3>`;
    }

    // Use other fields in a table-like layout
    html += `<div style="display:flex; flex-direction:column; gap:3px;">`;
    fields.forEach(field => {
      if (field !== "Type") { // we already used Type as title
        let value = props[field] || "N/A";

        // Optional: color Evaluation field
        if (field === "Evaluation") {
          let color = "#ccc";
          switch (value) {
            case "Light": color = "#F6CF71"; break;
            case "Moderate": color = "#F89C74"; break;
            case "Severe": color = "#F03B20"; break;
            case "Accessible": color = "#6AB04C"; break;
          }
          value = `<span style="display:inline-block; padding:2px 6px; border-radius:4px; background-color:${color}; color:#fff; font-weight:bold;">${value}</span>`;
        }

        html += `<div><strong>${field}:</strong> ${value}</div>`;
      }
    });
    html += `</div></div>`;

    new maplibregl.Popup({ closeButton: false })
      .setLngLat(e.lngLat)
      .setHTML(html)
      .addTo(map);
  });

  map.on("mouseenter", layerName, () => map.getCanvas().style.cursor = "pointer");
  map.on("mouseleave", layerName, () => map.getCanvas().style.cursor = "");
} //End of addPopUps2


function addHighlight(map, layerIDtrial) {
  let hoveredStateId = null;

  map.on("mousemove", layerIDtrial, (e) => {
    if (e.features.length > 0) {
      if (hoveredStateId) {
        map.setFeatureState(
          { source: layerIDtrial, id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = e.features[0].id;
      map.setFeatureState(
        { source: layerIDtrial, id: hoveredStateId },
        { hover: true }
      );
    }
  });

  // When the mouse leaves the state-fill layer, update the feature state of the previously hovered feature.
  map.on("mouseleave", layerIDtrial, () => {
    if (hoveredStateId) {
      map.setFeatureState(
        { source: layerIDtrial, id: hoveredStateId },
        { hover: false }
      );
    }
    hoveredStateId = null;
  });
} //End of addHighlight

function filterDateSlider(map, layerID, dateSlider) {
  const daysToAdd = parseInt(dateSlider.value, 10);
  let currentDate = new Date("2024-07-22");
  currentDate.setDate(currentDate.getDate() + daysToAdd);

  currentTimeInt = currentDate.getTime() / 1000;

  //QZ
  // setFilterDate(currentTimeInt, currentTimeInt, layerID);

  let filter = [
    "all",
    ["<=", ["to-number", ["get", "epoch_start_date"]], currentTimeInt],
    [">=", ["to-number", ["get", "epoch_end_date"]], currentTimeInt],
  ];

  map.setFilter(layerID, filter);
  //qz
  document.getElementById("sliderDateLabel").innerHTML =
    currentDate.toDateString();
} //End of filterDateSlider

function setFilterDate(map, start, end) {
  // let filter = [
  //   "all",
  //   ["<=", ["to-number", ["get", "epoch_start_date"]], start],
  //   [">=", ["to-number", ["get", "epoch_end_date"]], end],
  // ];

  // map.setFilter(layerID, filter);

  filterByStartDate = ["<=", ["to-number", ["get", "epoch_start_date"]], start];
  filterByEndDate = [">=", ["to-number", ["get", "epoch_end_date"]], end];

  // console.log(filterByStartDate + typeof filterByEndDate);
  allFilters(map);
} //End of setFilterDate

function startSliderAnimation(map, layerID, dateSlider, playButton) {
  let currentValue = 0; //Reset slider position
  playButton.disabled = true; //Disable the play button while animating

  // Set the interval to move the slider
  const interval = setInterval(() => {
    if (currentValue <= 49) {
      dateSlider.value = currentValue;
      filterDateSlider(map, layerID, dateSlider); //Update the date label and filterByDate
      currentValue++;

      dateSlider.oninput();
    } else {
      clearInterval(interval); //Stop the animation when the slider reaches the end
      playButton.disabled = false; //Re-enable the play button
    }
  }, 100); //Adjust the speed of the animation (100ms for each step)
} //End of startSliderAnimation

function filterDate2(map, start, end) {
  if (start.value == "") {
    end.min = "";
    end.value = "";
  } else {
    end.min = start.value;
    if (end.value != "" && new Date(end.value) < new Date(start.value)) {
      end.value = start.value;
    }
  }

  let epoch_start_date = new Date(start.value).getTime() / 1000;
  let epoch_end_date = new Date(end.value).getTime() / 1000;
  setFilterDate(map, epoch_start_date, epoch_end_date);
} //End of filterDate2

//QZ
function allFilters(map) {
  let filter = ["all", filterByCategory];
  let filter2 = ["all", filterByStartDate, filterByEndDate, filterByCategory];

  // console.log(filter+ typeof filter);
  filteredLayers.forEach((layerID) => {
    map.setFilter(layerID, filter);
  });
  dateRangeLayers.forEach((layerID) => {
    map.setFilter(layerID, filter2);
  });
} //End of allFilters
//qz

//----------------------------------------------------------------------------------------------//
// Events
//----------------------------------------------------------------------------------------------//

function rotateMap(map, rotationEnabled, userInteracting) {
  if (rotationEnabled && !userInteracting) {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    let duration = width * 12.5; //Calculating from the speed depending on the size at which it has been designed duration=24000 (ms)
    const rotateNumber = map.getBearing();
    let rotateAngle = width * 0.046875; //Calculating from the speed depending on the size at which it has been designed rotation angle=90

    map.rotateTo(rotateNumber + rotateAngle, {
      duration: duration,
      easing: function (t) {
        return t;
      },
    }); //End of rotateTo
  }
} //End of rotateMap

function activateMapRotation(map, icon, rotationStates) {
  rotationStates.rotationEnabled = !rotationStates.rotationEnabled;
  if (rotationStates.rotationEnabled) {
        rotateMap(map, rotationStates.rotationEnabled, rotationStates.userInteracting);
        icon.style.backgroundImage = 'url(icons/arrow-circle.svg)'; //Change the icon image path
  } else {
    map.stop(); //Immediately end ongoing animation
    icon.style.backgroundImage = "url(icons/arrow-circle-crossed.svg)"; //Change the icon image path
  }
} //End of activateMapRotation

function layerVisibility(map, id) {
  let layerID = id.split("-")[1];
  if (document.getElementById(id).checked) {
    map.setLayoutProperty(layerID, "visibility", "visible");
  } else {
    map.setLayoutProperty(layerID, "visibility", "none");
  }
} //End of layerVisibility

function toggle(p, toggle, tOpened, tClosed, tClass) {
  p.forEach((el) => {
    el.classList.toggle(tClass); //All the "el" have to be associated to the same tClass!
  });

  if (p[0].classList.contains(tClass)) {
    toggle.innerHTML = tOpened;
  } else {
    toggle.innerHTML = tClosed;
  }
} //End of toggle

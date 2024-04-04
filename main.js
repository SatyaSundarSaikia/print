import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import {Fill, Stroke, Circle} from 'ol/style';
import Draw from 'ol/interaction/Draw';
import {fromLonLat} from 'ol/proj';
import jsPDF from 'jspdf';
import {createRegularPolygon} from 'ol/interaction/Draw';




var map = new Map({
  target: 'map',
  layers: [
      new TileLayer({
          source: new OSM()
      })
  ],
  view: new View({
      center: new fromLonLat([0, 0]),
      zoom: 2
  })
});

 // Initialize vector layer for drawing
  // Initialize vector layer for drawing
  var vectorLayer = new VectorLayer({
    source: new VectorSource(),
    style: new Style({
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new Circle({
            radius: 7,
            fill: new Fill({
                color: '#ffcc33'
            })
        })
    })
});
map.addLayer(vectorLayer);

// Initialize interaction to draw square
var draw;
function addInteractions() {
    draw = new Draw({
        source: vectorLayer.getSource(),
        type: 'Circle',
        geometryFunction: new createRegularPolygon(4),
        maxPoints: 2
    });
    map.addInteraction(draw);
}

addInteractions();

// Export PDF button click handler
function exportPDF() {
  let layout = 'A0';
      let resolution = 72;
      let scale = 5000;
    // Get drawn square coordinates
    var features = vectorLayer.getSource().getFeatures();
    var squareCoordinates = features[0].getGeometry().getCoordinates()[0];

    // Fetch underlying area based on square coordinates
    var area = fetchUnderlyingArea(squareCoordinates);

    // Generate PDF with given layout, resolution, and scale
    generatePDF(layout, resolution, scale, area);
}

// Function to fetch underlying area based on square coordinates
function fetchUnderlyingArea(coordinates) {
    // You need to implement fetching underlying area based on square coordinates
    // This might involve fetching map tiles or data based on the coordinates
    // For demonstration purposes, I'll return a placeholder image
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExMWFhUXGB8aFxgYGBkZGBofGxkbGBobGBoeHSggGholHRgaITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lICYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKkBKwMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAEBQIDBgEHAAj/xAA9EAACAQMDAgQDBgUFAwEAAAAAAQIDBAAFEQYSITFBBxNRYXGBkRQyobHB0fAVMvAVFiMkJTM0NIOi0uH/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAApEQACAgEEAQMDAwQCAwEAAAAAAQIDBBEFEiExBhMiQVFhFCMyUoGhFRYzUnGx/9oADAMBAAIRAxEAPwDmuUhClQpGkoAKWkpQFpcBUlKWlCVpQMpSgKSgCWkDQpSlCaUqUAhClFpQKUUuKmkkpQpT0oKU1pQpKWkoAKWkoKUqSgMpWlQKXpKWlCVpT0oKlLpKWkoEUpKU0rSKSkNWkoKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0pKWi0p';
    
}

// Function to generate PDF with given layout, resolution, and scale
function generatePDF(layout, resolution, scale, area) {
    // Calculate dimensions of the PDF based on layout
    var dimensions = { width: 0, height: 0 };
    switch (layout) {
        case 'A0':
            dimensions.width = 841;
            dimensions.height = 1189;
            break;
        case 'A1':
            dimensions.width = 594;
            dimensions.height = 841;
            break;
        case 'A4':
            dimensions.width = 210;
            dimensions.height = 297;
            break;
        // Add more cases for other layouts if needed
    }

    // Calculate size of the underlying area to be rendered in PDF
    var areaWidth = dimensions.width * (resolution / 72);
    var areaHeight = dimensions.height * (resolution / 72);

    // Create PDF instance
    var pdf = new jsPDF({
        unit: 'px',
        format: [dimensions.width, dimensions.height]
    });

    // Render underlying area on PDF
    var img = new Image();
    img.src = area;
    img.onload = function () {
        pdf.addImage(img, 'JPEG', 0, 0, areaWidth, areaHeight);
        // Save PDF
        pdf.save('map_export.pdf');
    };
}



document.getElementById('topdf').addEventListener('click', function(){
  console.log("pdf")
  // exportPDF()
  


})
// We always need a scene.
var scene = new THREE.Scene();

// We always need a renderer

var renderer = new THREE.WebGLRenderer();



TW.mainInit(renderer, scene);

TW.cameraSetup(renderer,
               scene,
               {minx: -50, maxx: 50,
                miny: -500, maxy: 500,
                minz: 0, maxz: 0});





class WashingtonMonument {
  
    
    constructor() {
      this.topWidth = 34; 
      this.topHeight = 55; 
      this.baseWidth = 55; 
      this.baseHeight = 555; 
    }
  
   
    draw(x, y, z) {
      
      // remove old mesh from scene (unless it doesn't exist)
     
      if (this.mesh) scene.remove(this.mesh);
      
      var bW = this.baseWidth * .5;
      var bH = this.baseHeight;
      var tW = this.topWidth * .5;
      
      // height of the top of the pyramid
      var height  = this.baseHeight + this.topHeight;
      
      
      var geo = new THREE.Geometry(); 
      
      // Define each vertex:
		
      
      // The bottom  
      geo.vertices.push(new THREE.Vector3(x + bW, y, z + bW));
      geo.vertices.push(new THREE.Vector3(x + bW, y, z - bW));
      geo.vertices.push(new THREE.Vector3(x - bW, y, z - bW));
      geo.vertices.push(new THREE.Vector3(x - bW, y, z + bW));
      
      // Base of the pyramid
      geo.vertices.push(new THREE.Vector3(x + tW, y + bH, z + tW));
		geo.vertices.push(new THREE.Vector3(x + tW, y + bH, z - tW));
		geo.vertices.push(new THREE.Vector3(x - tW, y + bH, z - tW));
		geo.vertices.push(new THREE.Vector3(x - tW, y + bH, z + tW));
      
		// The tippy-top:
		geo.vertices.push(new THREE.Vector3(x, y + height, z));
      
		// Create the faces:
      
		// Floor:
		
      
		geo.faces.push(new THREE.Face3(0, 2, 1), new THREE.Face3(0, 3, 2));
		// The four main sides (each side is two triangles):
		geo.faces.push(new THREE.Face3(0, 1, 5), new THREE.Face3(0, 5, 4));
		geo.faces.push(new THREE.Face3(1, 2, 6), new THREE.Face3(1, 6, 5));
		geo.faces.push(new THREE.Face3(2, 3, 7), new THREE.Face3(2, 7, 6));
		geo.faces.push(new THREE.Face3(3, 0, 4), new THREE.Face3(3, 4, 7));
		// Four faces for the sides of the pyramid:
		geo.faces.push(new THREE.Face3(4, 5, 8));
		geo.faces.push(new THREE.Face3(5, 6, 8));
		geo.faces.push(new THREE.Face3(6, 7, 8));
		geo.faces.push(new THREE.Face3(7, 4, 8));
      
      
       geo.computeFaceNormals();
       geo.computeVertexNormals(true);
      
     // This is where the creation of the mesh is made.
      this.mesh = TW.createMesh(geo);
      
      // add the mesh to the scene
      scene.add(this.mesh);
    }
}

    // creating an object
    var wm  = new WashingtonMonument();

      
  function draw() {
      wm.draw(0, (wm.baseHeight + wm.topHeight) * -.5, 0);
      TW.render();
    }

var gui = new dat.GUI();

gui.add(wm, 'topWidth', 10, 50).onChange(draw);
gui.add(wm, 'topHeight', 10, 70).onChange(draw);
gui.add(wm, 'baseWidth', 30, 70).onChange(draw);
gui.add(wm, 'baseHeight', 10, 700).onChange(draw);

draw(); 



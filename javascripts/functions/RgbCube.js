module.exports = function(parentId) {

  var rotate = true;
  var w = 700;
  var h = 550;
  var color = {
    red: 127.5,
    green: 127.5,
    blue: 255,
    blueChanged: true
  }

  function label(col) {
    var percentage = Math.round((color[col] / 255) * 100);
    return percentage + '% ' + col;
  }

  // Add skeleton
  var parent = document.getElementById(parentId);
  parent.innerHTML = '<div class="grid"><div class="col-2-5"><label>'+label('red')+'</label><input type="range" name="red" min="0" max="255" value="'+color.red+'" /><label>'+label('green')+'</label><input type="range" name="green" min="0" max="255" value="'+color.green+'" /><label>'+label('blue')+'</label><input type="range" name="blue" min="0" max="255" value="'+color.blue+'" /></div><div class="col-3-5"><canvas width="'+w+'" height="'+h+'" style="width: 100%; height:auto;"></canvas></div>';

  // Setup vars
  var cube = { resolution: 40 };
  var scene = new THREE.Scene();
  var group = new THREE.Object3D();
  var sphere = new THREE.SphereGeometry(10, 32, 32);
  var ring = new THREE.RingGeometry(10, 18, 32);
  var canvas = parent.querySelector('canvas');
  var renderer = new THREE.WebGLRenderer({ antialias: true, canvas:canvas });
  var camera = new THREE.PerspectiveCamera(50, w/h, 0.1, 1000);
  var model, wireframe, modelMesh, wireframeMesh, sphereMesh, ringMesh;

  function updateScene() {

    sphereMesh.material.color.setRGB(color.red / 255, color.green / 255, color.blue / 255);
    sphereMesh.position.x = color.red - 127.5;
    sphereMesh.position.y = color.green - 127.5;
    sphereMesh.position.z = color.blue - 127.5;
    ringMesh.position.x = color.red - 127.5;
    ringMesh.position.y = color.green - 127.5;
    ringMesh.position.z = color.blue - 126.5;

    if(color.blueChanged) {

      // render wireframe
      if(wireframeMesh) group.remove(wireframeMesh)

      if(color.blue != 255) {
        wireframe = new THREE.EdgesGeometry(new THREE.BoxBufferGeometry(255, 255, 255 - color.blue, 1, 1, 1));
        var wireframeMat = new THREE.LineBasicMaterial( { color: 0x555555, linewidth: 2 } );
        wireframeMesh = new THREE.LineSegments( wireframe, wireframeMat );
        wireframeMesh.position.z = color.blue/2;
        group.add(wireframeMesh);
      }

      // render colored cube
      if(modelMesh) group.remove(modelMesh)

      var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
      var realRes = Math.round((color.blue / 255) * cube.resolution);
      model = new THREE.BoxBufferGeometry(255, 255, color.blue, realRes, realRes, realRes)
      modelMesh = new THREE.Mesh(model, material);
      modelMesh.position.z = -(255 - color.blue) / 2;
      var arr = model.attributes.position.array;
      var colors = new Float32Array(arr.length);
      for(var i = 0; i < model.attributes.position.count; i ++ ) {
  			var x = arr[i * 3];
  			var y = arr[i * 3 + 1];
  			var z = arr[i * 3 + 2];
  			colors[ i * 3 ] = (x + 127.5) / 255;
  			colors[ i * 3 + 1 ] = (y + 127.5) / 255;
  			colors[ i * 3 + 2 ] = (modelMesh.position.z + z + 127.5) / 255;
  		}
      model.addAttribute('color', new THREE.BufferAttribute(colors, 3));
      group.add(modelMesh);

      color.blueChanged = false;
    }

  }

  function render() {
    updateScene()
    renderer.render(scene, camera);
  }

  // Init scene
  group.rotation.x = 0.5;
  group.rotation.y = -0.5;

  scene.background = new THREE.Color(0x222222);
  camera.position.x = -20;
  camera.position.z = 550;
  camera.position.y = -20;

  sphereMesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0xffff00}));
  group.add(sphereMesh)

  ringMesh = new THREE.Mesh(ring, new THREE.MeshBasicMaterial({color: 0x333333}));
  group.add(ringMesh)
  scene.add(group)

  var ranges = parent.querySelectorAll("input[type=range]");
  for(var i = 0; i < ranges.length; i++) {
    ranges[i].addEventListener('input', function(e) {
      var dimension = e.target.name;
      var value = parseInt(e.target.value);
      e.target.previousSibling.innerHTML = label(dimension);
      color[dimension] = value;
      if(dimension == 'blue') {
        color.blueChanged = true;
      }
      requestAnimationFrame(render);
    })
  }

  canvas.addEventListener('mousemove', function(e) {
    if(rotate) {
      group.rotation.z = -(e.pageX / 70);
      group.rotation.x = e.pageY / 70;
      requestAnimationFrame(render);
    }
  });

  canvas.addEventListener('click', function(e) {
    rotate = !rotate;
  });

  updateScene();
  render();
}

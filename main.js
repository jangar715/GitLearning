var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

/******* Add the create scene function ******/
var createScene = function () {
    // Create the scene space
    var scene = new BABYLON.Scene(engine);
    var direction = [1, 0];
    var speed = 500;
    var boxsize = 3;
    var intervalId;

    var snake = [[9, 9]];
    var mapsize = [20, 20];

    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 100, 50), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

    var grid = [[]];
    var colorblack = new Array(6);
    var colorgreen = new Array(6);

    for (var c = 0; c < 6; c++) {
        colorblack[c] = new BABYLON.Color4(0, 0, 0, 1);
        colorgreen[c] = new BABYLON.Color4(0.3, 1, 0.3, 1);  
    }

    var newcolor = new Array(6);
    for (var c = 0; c < 6; c++) {
        if (c != 4)
            newcolor[c] = new BABYLON.Color4(0.1, 1, 0.9 ,1);
    }
    for(var i = 0; i < mapsize[0]; i++) {
        var line = [];
        for (var j = 0; j < mapsize[1]; j++) {
            var newbox = BABYLON.MeshBuilder.CreateBox("box", {
                height: boxsize, 
                width: boxsize, 
                depth: boxsize, 
                faceColors: newcolor, 
                updatable: true
            }, scene);
            newbox.position.x = (boxsize + 1) * j - mapsize[0] / 2 * (boxsize + 1); 
            newbox.position.z = (boxsize + 1) * i - mapsize[1] / 2 * (boxsize + 1);
            line.push(newbox);
        }
        grid.push(line);
    }

    var inputMap ={};
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {								
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {								
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    
    scene.onBeforeRenderObservable.add(()=>{
        if(inputMap["w"] || inputMap["ArrowUp"]){
            direction = [-1, 0];
        } 
        if(inputMap["a"] || inputMap["ArrowLeft"]){
            direction = [0, 1];
        } 
        if(inputMap["s"] || inputMap["ArrowDown"]){
            direction = [1, 0];
        } 
        if(inputMap["d"] || inputMap["ArrowRight"]){
            direction = [0, -1];
        }    
    })
        
    window.setInterval(function(){
        for (var i = snake.length - 1; i > 0; i--) {
            snake[i][0] = snake[i - 1][0];
            snake[i][1] = snake[i - 1][1];
        }
        grid[snake[0][0]][snake[0][1]].setVerticesData(BABYLON.VertexBuffer.ColorKind, newcolor);
        snake[0][0] = ( snake[0][0] + direction[0]);
        snake[0][1] = ( snake[0][1] + direction[1]);
        grid[snake[0][0]][snake[0][1]].setVerticesData(BABYLON.VertexBuffer.ColorKind, colorgreen);
        var info = grid[snake[0][0]][snake[0][1]].getVerticesData(BABYLON.VertexBuffer.ColorKind);
        console.log(info);
        var x = grid[snake[0][0]][snake[0][1]].position.x, y = grid[snake[0][0]][snake[0][1]].position.y;
        var mybox = BABYLON.MeshBuilder.CreateBox("box", {
            height: boxsize, 
            width: boxsize, 
            depth: boxsize, 
            faceColors: colorgreen, 
        }, scene);
        mybox.position.x = x;
        mybox.position.y = y;

        for (var i = 1; i < snake.length; i++) {
            grid[snake[i][0]][snake[i][1]].setVerticesData(BABYLON.VertexBuffer.ColorKind, colorgreen);
        }
    }, speed);
    // scene.registerAfterRender(function() {
    //     // function startInterval(_interval) {
    //     //     intervalId = setInterval(function() {
    //     //         console.log(_interval);
    //     //     }, _interval);

    //     //     // for speeding up
    //     // }
    //     // carBody.position.x = points[i].x;
    //     // carBody.position.z = points[i].z;
    //     // wheelFI.rotate(normals[i], Math.PI/32, BABYLON.Space.WORLD); 
    //     // wheelFO.rotate(normals[i], Math.PI/32, BABYLON.Space.WORLD);
    //     // wheelRI.rotate(normals[i], Math.PI/32, BABYLON.Space.WORLD);
    //     // wheelRO.rotate(normals[i], Math.PI/32, BABYLON.Space.WORLD);
        
    //     // theta = Math.acos(BABYLON.Vector3.Dot(normals[i],normals[i+1]));
    //     // var dir = BABYLON.Vector3.Cross(normals[i],normals[i+1]).y;
    //     // var dir = dir/Math.abs(dir);
    //     // carBody.rotate(BABYLON.Axis.Y, dir * theta, BABYLON.Space.WORLD);
        
    //     // i = (i + 1) % (n-1);	//continuous looping  
        
    //     // if(i == 0) {
    //     //     carBody.rotationQuaternion = startRotation;
    //     // }
    //  });

    return scene;
};
/******* End of the create scene function ******/

var scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});
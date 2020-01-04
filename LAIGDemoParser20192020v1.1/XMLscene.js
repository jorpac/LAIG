var DEGREE_TO_RAD = Math.PI / 180;

/**
 * XMLscene class, representing the scene that is to be rendered.
 */
class XMLscene extends CGFscene {
    /**
     * @constructor
     * @param {MyInterface} myinterface 
     */
    constructor(myinterface, n_gr) {
        super();

        this.graphs = [];
        this.n_gr = n_gr;
        this.graphs_loaded = 0;
        this.interface = myinterface;
    }

    /**
     * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
     * @param {CGFApplication} application
     */
    init(application) {
        super.init(application);
        
        this.sceneInited = false;
      //  this.initCameras();

        this.enableTextures(true);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);
        this.setUpdatePeriod(1);
        this.scaleFactor = 1.0;
        this.displayAxis = false;
        this.selectedView = 0;
        this.graphs = [];
        
        this.activeGraph = 0;
        this.cameraAnimation;
        this.cameraRotate=false;
        
        this.camera = new CGFcamera(0.5, 0.1, 500, vec3.fromValues(0.1, 12, 0), vec3.fromValues(0, 0, 0));
        this.gameOrchestrator = new MyGameOrchestrator(this);
        this.scene_ambient = {'NASCAR': 1, 'Minecraft': 0};
    }

    /**
     * Initializes the scene cameras.
     */
    initCameras() {
       
        this.camera =  this.graphs[this.activeGraph].listCameras.GameBoard;  
        // this.interface.setActiveCamera(this.camera);
        //this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    /**
     * Initializes the scene lights with the values read from the XML file.
     */
    initLights() {
        var i = 0;
        // Lights index.

        // Reads the lights from the scene graph.
        for (var key in this.graphs[this.activeGraph].lights) {
            if (i >= 8)
                break;              // Only eight lights allowed by WebGL.

            if (this.graphs[this.activeGraph].lights.hasOwnProperty(key)) {
                var light = this.graphs[this.activeGraph].lights[key];

                this.lights[i].setPosition(light[2][0], light[2][1], light[2][2], light[2][3]);
                this.lights[i].setAmbient(light[3][0], light[3][1], light[3][2], light[3][3]);
                this.lights[i].setDiffuse(light[4][0], light[4][1], light[4][2], light[4][3]);
                this.lights[i].setSpecular(light[5][0], light[5][1], light[5][2], light[5][3]);

                if (light[1] == "spot") {
                    this.lights[i].setSpotCutOff(light[6]);
                    this.lights[i].setSpotExponent(light[7]);
                    this.lights[i].setSpotDirection(light[8][0], light[8][1], light[8][2]);
                }

                this.lights[i].setVisible(true);
                if (light[0])
                    this.lights[i].enable();
                else
                    this.lights[i].disable();

                this.lights[i].update();

                i++;
            }
        }
    }

    addGraph(graph){
        this.graphs.push(graph);
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    /** Handler called when the graph is finally loaded. 
     * As loading is asynchronous, this may be called already after the application has started the run loop
     */
    onGraphLoaded() {
        this.axis = new CGFaxis(this, this.graphs[this.activeGraph].referenceLength);

        this.gl.clearColor(this.graphs[this.activeGraph].background[0], this.graphs[this.activeGraph].background[1], this.graphs[this.activeGraph].background[2], this.graphs[this.activeGraph].background[3]);

        this.setGlobalAmbientLight(this.graphs[this.activeGraph].ambient[0], this.graphs[this.activeGraph].ambient[1], this.graphs[this.activeGraph].ambient[2], this.graphs[this.activeGraph].ambient[3]);

        this.initLights();

        this.updateViews();

        this.addLights();

        
        this.sceneInited = true;
        this.initCameras();


    }

    updateViews(){
        this.views =[];
        for(var v in this.graphs[this.activeGraph].listCameras){
            this.views.push(v);
        }
        this.interface.addViews(this.views);
    }

    addLights(){
        this.interface.addLights();
    }

    getViewsIDs(){
        var cameraIDs=[];
        for(var cam in this.views){
            cameraIDs.push(this.views[cam]);
        }
        return cameraIDs;
    }

    getCamera(cameraID){
        var views = this.graph.getViews();        
        return views[cameraID];
    }

    setCamera(camera){
        this.loadIdentity();
        this.camera=camera;
    }

    updateCam(camera){
        this.interface.setActiveCamera(camera);
    }
    undo(){
        this.gameOrchestrator.undo();
    }
    clear(){
        delete this.gameOrchestrator;
        this.gameOrchestrator = new MyGameOrchestrator(this);
    }
    /*onSelectedViewChanged(){
        this.interface.setActiveCamera(this.graph.listCameras[this.selectedView]);
        this.camera =this.graph.listCameras[this.selectedView];
        this.applyViewMatrix();
        this.update();
    }*/

    checkKeys() {
        var text="Keys pressed: ";
        var keysPressed=false;

        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyM")) {
            text+=" M ";
            keysPressed=true;
            this.graph.materialIncrement=true;
        }

        if (keysPressed)
            console.log(text);
    }

    update(t){
        //this.checkKeys();
        //this.display();
        
        this.time = this.time || 0;
        this.delta = (t - this.time)/1000 || 0;
        this.ani = this.graph.animations;

         for(var key in this.ani) {
             this.ani[key].update(this.delta);
         };

         if(this.cameraRotate){
            this.cameraAnimation.update(this.delta);
         }

         this.time = t;
              
        // console.log(t/100 % 1000);
    }

    /**
     * Displays the scene.
     */

   /* display(){
        this.render(this.selectedCamera);
       
        this.camTaxture.attachToFrameBuffer();
        this.render(this.selectedCamera);
        this.camTaxture.detachFromFrameBuffer();
        this.gl.disable(this.gl.DEPTH_TEST);
        this.camObject.display();
        this.gl.enable(this.gl.DEPTH_TEST);

        this.setActiveShader(this.defaultShader);
        
    }*/
    logPicking() {
		this.gameOrchestrator.logPicking();
	}
    display() {
        // ---- BEGIN Background, camera and axis setup
        if (this.sceneInited) {
            this.logPicking();
            this.clearPickRegistration();
            // Clear image and depth buffer everytime we update the scene
            this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

            // Initialize Model-View matrix as identity (no transformation
            this.updateProjectionMatrix();
            this.loadIdentity();

            // Apply transformations corresponding to the camera position relative to the origin
            this.applyViewMatrix();


            this.pushMatrix();
            if(this.displayAxis)
                this.axis.display();

           // this.updateCam(camera);
            if(this.graphs[this.activeGraph].materialIncrement==false){
                for (var i = 0; i < this.lights.length; i++) {
                    this.lights[i].setVisible(true);
                    if(this.lights[i]){
                        //this.lights[i].enable();
                        this.lights[i].update();
                    }  
                }
            }

                // Draw axis
                this.setDefaultAppearance();
                var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
                    0.0, this.scaleFactor, 0.0, 0.0,
                    0.0, 0.0, this.scaleFactor, 0.0,
                    0.0, 0.0, 0.0, 1.0];

                //for(var i=0; i<this.scene.listCameras.length/2;i+=2){

                //} 

                this.multMatrix(sca);
                // Displays the scene (MySceneGraph function).
                //this.loadIdentity();
                //this.pushMatrix();
                this.graphs[this.activeGraph].displayScene(this.graphs[this.activeGraph].rootName, this.transfMatrix);

                this.gameOrchestrator.display();
                this.graphs[this.activeGraph].materialIncrement=false;

                //this.popMatrix();        
            

            this.popMatrix();
            // ---- END Background, camera and axis setup
        }
    }
}
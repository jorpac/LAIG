/**
* MyInterface class, creating a GUI interface.
*/
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();

        // add a group of controls (and open/expand by defult)
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        this.lightsFolder = this.gui.addFolder('Light Sources');        

        let scene_foler =  this.gui.addFolder('Scene');
        scene_foler.add(this.scene, 'activeGraph', this.scene.scene_ambient).name("Select Ambient");
        //this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        // var camera = this.gui.addFolder('View');
        // camera.add(this.scene, 'perspective').name('Orto View');
        // this.gui.add(this.scene, 'selectedView').name('Camera');

        this.gui.add(this.scene, 'undo').name('Undo');
        this.gui.add(this.scene, 'clear').name('New Game');
        this.initKeys();

        return true;
    }

    /**
     * initKeys
     */
    initKeys() {
        this.scene.gui=this;
        this.processKeyboard=function(){};
        this.activeKeys={};
    }

    processKeyDown(event) {
        this.activeKeys[event.code]=true;
    };

    processKeyUp(event) {
        this.activeKeys[event.code]=false;
    };

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

    addViews(){
        this.gui.add(this.scene, 'camera', this.scene.getViewsIDs())
                .onChange(this.setCamera.bind(this))
                .name('View')
                .listen();

        //this.setCamera(this.camera.getValue());
    }

    setCamera(cameraID){
        var camera = this.scene.getCamera(cameraID);

        this.setActiveCamera(camera);
        this.scene.setCamera(camera);
        //this.scene.update();
        
    }

    addLights(){
        for(var l in this.scene.lights){
            this.lightsFolder.add(this.scene.lights[l], 'enabled').name(l);
        }
    }
}
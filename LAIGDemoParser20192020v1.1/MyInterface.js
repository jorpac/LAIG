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

        this.lightsFolder = this.gui.addFolder('Lights');        

        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
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
        this.gui.add(this.scene, 'selectedView', this.scene.getViewsIDs())
                .onChange(this.setCamera.bind(this))
                .name('View')
                .listen();

        //this.setCamera(this.camera.getValue());
    }

    setCamera(cameraID){
        var camera = this.scene.getCamera(cameraID);

        this.setActiveCamera(camera);
        this.scene.setCamera(camera);
        
    }

    addLights(){
        for(var l in this.scene.lights){
            this.lightsFolder.add(this.scene.lights[l], 'enabled').name(l);
        }
    }
}
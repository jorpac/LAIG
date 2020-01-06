class MySecurityCamera extends CGFobject {
    constructor(scene){
        super(scene);
        this.cam = new MyRectangle(scene, 1, 0, 1, 0);
        this.shader = new CGFshader(this.scene.gl, "shaders/sec_cam.vert", "shaders/sec_cam.frag");
        this.shader.setUniformsValues({uSampler:0});
        
        this.initBuffers();
    }

    display(){
        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();
        // this.scene.camTaxture.bind(0);
        
        this.cam.display();

        this.scene.popMatrix();
    }
}
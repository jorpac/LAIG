/**
 * MyCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
        }

    initBuffers() {
        this.vertices = [
			-0.5, -0.5, 0,	//0
			0.5, -0.5, 0,	//1
			-0.5, 0.5, 0,	//2
			0.5, 0.5, 0		//3
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
			0, 1, 2,
			1, 3, 2
        ];

        //Facing Z positive
        this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
        ];

        /*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

        this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
        ]
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
    // updateTexCoords(coords) {
    //     this.texCoords = [...coords];
    //     this.updateTexCoordsGLBuffers();
    // }
}

/**
* MyUnitCubeQuad
* @constructor
* @param scene - Reference to MyScene object
*/
class MyUnitCubeQuad extends CGFobject {
    constructor(scene, turn) {
        super(scene);
        // this.changed = 0;
        this.initBuffers(turn);
    }
    initBuffers(turn) {

        this.scene.quad = new MyQuad(this.scene);
        this.quadmaterial = new CGFappearance(this.scene);
        
        if(turn){
            this.quadmaterial.setAmbient(0.1, 0.1, 0.1, 1.0);
            this.quadmaterial.setDiffuse(0.1, 0.1, 0.1, 1.0);
            this.quadmaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
            this.quadmaterial.setShininess(10.0);
        }
        else{
            this.quadmaterial.setAmbient(0.9, 0.9, 0.9, 1.0);
            this.quadmaterial.setDiffuse(0.9, 0.9, 0.8, 1.0);
            this.quadmaterial.setSpecular(0.9, 0.9, 0.8, 1.0);
            this.quadmaterial.setShininess(10.0);
        }

    }

    display() {

        // this.scene.quadmaterial.setTexture(this.scene.texture7);
        // this.scene.gl.TEXTURE_2D;
        // this.scene.quadmaterial.apply();
        this.quadmaterial.apply();
      

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);

        this.scene.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        
        this.scene.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);

        this.scene.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);

        this.scene.quad.display();
        this.scene.popMatrix();


        // this.scene.quadmaterial.setTexture(this.scene.texture6);
        // this.scene.gl.TEXTURE_2D;
        // this.scene.quadmaterial.apply();
        

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);

        this.scene.quad.display();
        this.scene.popMatrix();


        // this.scene.quadmaterial.setTexture(this.scene.texture5);
        // this.scene.gl.TEXTURE_2D;
        // this.scene.quadmaterial.apply();
        

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);

        this.scene.quad.display();
        this.scene.popMatrix();
    }
    changeTurn(turn){
        // this.changed ++;
        // if(this.changed == 1){
        //     this.changed ++;
        
        if(turn){
            this.quadmaterial.setAmbient(0.1, 0.1, 0.1, 1.0);
            this.quadmaterial.setDiffuse(0.1, 0.1, 0.1, 1.0);
            this.quadmaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
            this.quadmaterial.setShininess(10.0);
        }
        else{
            this.quadmaterial.setAmbient(0.9, 0.9, 0.9, 1.0);
            this.quadmaterial.setDiffuse(0.9, 0.9, 0.8, 1.0);
            this.quadmaterial.setSpecular(0.9, 0.9, 0.8, 1.0);
            this.quadmaterial.setShininess(10.0);
        }
    
    }
    
    // updateTexCoords(coords) {
    //     this.texCoords = [...coords];
    //     this.updateTexCoordsGLBuffers();
    // }
}
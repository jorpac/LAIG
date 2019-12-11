/**
* MyCylinder
* @constructor
*/
class MyCylinder3 extends CGFobject {
    constructor(scene, id, base, top, height, slices, stacks) {
        super(scene);
        this.base = base;
        this.top = top;
        this.slices = slices;
        this.height = height;
        this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
       
        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        var difRadius = this.top -this.base;
        var stackRadius = difRadius/this.stacks;
        
        this.vertices.push(0, 0, 0);
        this.vertices.push(0, 0, this.height);
        var v_tex = 1/this.stacks   ;
        var v_tmp = 1;
        for(var j = 0; j < this.stacks; j++){

            for(var i = 0; i < this.slices; i++){

                var sa = Math.sin(ang) * this.base;
                var saa = Math.sin(ang+alphaAng) * this.base;
                var ca = Math.cos(ang) * this.base;
                var caa = Math.cos(ang+alphaAng) * this.base;

                var sa2 = Math.sin(ang) * (this.base+ stackRadius);
                var saa2 = Math.sin(ang+alphaAng) * (this.base+ stackRadius);
                var ca2 = Math.cos(ang) * (this.base+ stackRadius);
                var caa2 = Math.cos(ang+alphaAng) * (this.base+ stackRadius);

                // vertices of the face of the prism
                this.vertices.push(ca2, sa2, (this.height/this.stacks)*(j+1));
                this.vertices.push(ca, sa, j*(this.height/this.stacks));
                this.vertices.push(caa2, saa2, (this.height/this.stacks)*(j+1));
                this.vertices.push(caa, saa, j*(this.height/this.stacks));
                
                // normals of the face of the cylinder
                this.normals.push(Math.cos(ang), 0, Math.sin(ang));
                this.normals.push(Math.cos(ang), 0, Math.sin(ang));
                this.normals.push(Math.cos(ang + alphaAng), 0, Math.sin(ang + alphaAng));
                this.normals.push(Math.cos(ang + alphaAng), 0, Math.sin(ang + alphaAng));

                // indices of the face of the cylinder
                this.indices.push((4 * i + 2) + (4* (j*this.slices)), (4 * i + 3) + (4* (j*this.slices)), (4 * i + 4) + (4* (j*this.slices)));
                this.indices.push((4 * i + 3) + (4* (j*this.slices)), (4 * i + 5) + (4* (j*this.slices)), (4 * i + 4) + (4* (j*this.slices)));
                this.indices.push((4 * i + 4) + (4* (j*this.slices)), (4 * i + 3) + (4* (j*this.slices)), (4 * i + 2)+ (4* (j*this.slices)));
                this.indices.push((4 * i + 4) + (4* (j*this.slices)), (4 * i + 5) + (4* (j*this.slices)), (4 * i + 3) + (4* (j*this.slices)));

                this.indices.push((4 * i + 3) + (4* (j*this.slices)), 0, (4 * i + 5) + (4* (j*this.slices)));
                this.indices.push((4 * i + 4) + (4* (j*this.slices)), 1, (4 * i + 2) + (4* (j*this.slices)));             
                
                // text cords of the face of the cylinder
                this.texCoords.push(i*1.0/this.slices, v_tmp - v_tex);
                this.texCoords.push(i*1.0/this.slices, v_tmp);
                this.texCoords.push(i*1.0/this.slices + 1.0/this.slices, v_tmp - v_tex);
                this.texCoords.push(i*1.0/this.slices + 1.0/this.slices, v_tmp);


                
                ang+=alphaAng;
            }
           
            v_tmp -= v_tex;
            this.base+=stackRadius;
            ang = 0;
    }

    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the rectangle
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
    /*
    updateBuffers(complexity){
        this.slices = 4 + Math.round(16 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
*/
}
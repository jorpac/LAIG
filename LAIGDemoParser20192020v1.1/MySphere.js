/**
* MyCylinder
* @constructor
*/
class MySphere extends CGFobject {
    constructor(scene, id, radius, slices, stacks) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

      ///  var ang = 0;
        var alphaInc = 2*Math.PI/this.slices;
        // var difRadius = 0 -this.radius;
        // var stackRadius = difRadius/this.stacks;
        // var base = this.radius;
        var nver = 0;
        var betaInc = (Math.PI/2)/this.stacks;
     
            for (var alpha = 0; alpha <= 2 * Math.PI; alpha += alphaInc) {
                for (var beta = -Math.PI / 2; beta <= Math.PI/2; beta += betaInc) {
                this.vertices.push(this.radius * Math.cos(beta) * Math.cos(alpha), this.radius * Math.cos(beta) * Math.sin(alpha), this.radius * Math.sin(beta));
                this.normals.push(Math.cos(alpha + alphaInc), 0, Math.sin(alpha + alphaInc));
                nver ++;
            }
        }
        
        for(var i = 0; i < nver - (2*this.stacks + 1); i++){
            if ((i+ 1) % (2 * this.stacks + 1) != 0) {
            this.indices.push(i, i + 2*this.stacks + 1, i + 2*this.stacks + 2);
            this.indices.push(i + 2*this.stacks + 2, i + 1, i);

            this.indices.push(i, i + 2*this.stacks + 2, i + 2*this.stacks + 1);
            this.indices.push(i+1, i + 2*this.stacks + 2, i);
            }
        }
        
    //     for(var j = 0; j < this.stacks*2; j++){

    //         for(var i = 0; i < this.slices; i++){
    //             // vertices of the face of the prism
              
    //             this.vertices.push(this.radius*Math.cos(beta)*Math.cos(ang), this.radius*Math.cos(beta)*Math.sin(ang),this.radius*Math.sin(beta));
    //             this.vertices.push(this.radius*Math.cos(beta+ang1)*Math.cos(ang+alphaAng), this.radius*Math.cos(beta+ang1)*Math.sin(ang+alphaAng),this.radius*Math.sin(beta+ang1));
    //             this.vertices.push(this.radius*Math.cos(beta)*Math.cos(ang+alphaAng), this.radius*Math.cos(beta)*Math.sin(ang+alphaAng),this.radius*Math.sin(beta));

    //             // normals of the face of the cylinder
    //             this.normals.push(Math.cos(ang), 0, Math.sin(ang));
    //             this.normals.push(Math.cos(ang), 0, Math.sin(ang));
    //             this.normals.push(Math.cos(ang + alphaAng), 0, Math.sin(ang + alphaAng));
    //             this.normals.push(Math.cos(ang + alphaAng), 0, Math.sin(ang + alphaAng));

    //             // indices of the face of the cylinder
              
    //             this.indices.push(4 * i + (4* (j*this.slices)), (4 * i + 1) + (4* (j*this.slices)), (4 * i + 2) + (4* (j*this.slices)));
    //             this.indices.push((4 * i + 1) + (4* (j*this.slices)), (4 * i + 3) + (4* (j*this.slices)), (4 * i + 2) + (4* (j*this.slices)));
    //             this.indices.push((4 * i + 2) + (4* (j*this.slices)), (4 * i + 1) + (4* (j*this.slices)), 4 * i + (4* (j*this.slices)));
    //             this.indices.push((4 * i + 2) + (4* (j*this.slices)), (4 * i + 3) + (4* (j*this.slices)), (4 * i + 1) + (4* (j*this.slices)));

    //             // text cords of the face of the cylinder
    //             this.texCoords.push(i*1.0/this.slices, 0);
    //             this.texCoords.push(i*1.0/this.slices, 1);
    //             this.texCoords.push(i*1.0/this.slices + 1.0/this.slices, 0);
    //             this.texCoords.push(i*1.0/this.slices + 1.0/this.slices, 1);



    //             ang+=alphaAng;
    //            // (beta+ang1) >= Math.PI ? beta+= ang1 : beta = 0;
                
    //         }
    //         //base+=stackRadius;
    //         ang = 0;
    //         beta = 0;
    // }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
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
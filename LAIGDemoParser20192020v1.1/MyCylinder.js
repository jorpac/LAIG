/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
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

        var stackHeight = this.height / this.stacks; //height of each stack of the cylinder
        var tempHeight = -this.height / 2; //this variable will save the height of the new stack
        for(var j = 0; j < this.stacks*4; j++){

            for(var i = 0; i < this.slices; i++){

                var sa = Math.sin(ang) * this.top;
                var saa = Math.sin(ang+alphaAng) * this.top;
                var ca = Math.cos(ang) * this.base;
                var caa = Math.cos(ang+alphaAng) * this.base;

                // vertices of the face of the prism
                this.vertices.push(ca, sa, (this.height/this.stacks)*(j+1));
                this.vertices.push(ca, sa, j*(this.height/this.stacks));
                this.vertices.push(caa, saa, (this.height/this.stacks)*(j+1));
                this.vertices.push(caa, saa, j*(this.height/this.stacks));
                /*this.vertices.push(ca, sa, tempHeight + stackHeight);
                this.vertices.push(ca, sa, tempHeight);
                this.vertices.push(caa, saa, tempHeight + stackHeight);
                this.vertices.push(caa, saa, tempHeight);*/

                // normals of the face of the prism
                this.normals.push(Math.cos(ang), 0, Math.sin(ang));
                this.normals.push(Math.cos(ang), 0, Math.sin(ang));
                this.normals.push(Math.cos(ang + alphaAng), 0, Math.sin(ang + alphaAng));
                this.normals.push(Math.cos(ang + alphaAng), 0, Math.sin(ang + alphaAng));

                // indices of the face of the prism
                /*this.indices.push(4*i+j*this.stacks, (4*i)+j*this.stacks+1 , (4*i)+j*this.stacks+2);
                this.indices.push((4*i)+j*this.stacks + 1, (4*i)+j*this.stacks+3, (4*i)+j*this.stacks+2);
                this.indices.push((4*i)+j*this.stacks + 2, (4*i)+j*this.stacks+1, 4*i+j*this.stacks);
                this.indices.push((4*i)+j*this.stacks + 2, (4*i)+j*this.stacks+3, (4*i+j*this.stacks+1));*/
                this.indices.push(4 * i + (4* (j*this.stacks)), (4 * i + 1) + (4* (j*this.stacks)), (4 * i + 2) + (4* (j*this.stacks)));
                this.indices.push((4 * i + 1) + (4* (j*this.stacks)), (4 * i + 3) + (4* (j*this.stacks)), (4 * i + 2) + (4* (j*this.stacks)));
                this.indices.push((4 * i + 2) + (4* (j*this.stacks)), (4 * i + 1) + (4* (j*this.stacks)), 4 * i + (4* (j*this.stacks)));
                this.indices.push((4 * i + 2) + (4* (j*this.stacks)), (4 * i + 3) + (4* (j*this.stacks)), (4 * i + 1) + (4* (j*this.stacks)));

                // text cords of the face of the prism
                this.texCoords.push(i*1.0/this.slices, 0);
                this.texCoords.push(i*1.0/this.slices, 1);
                this.texCoords.push(i*1.0/this.slices + 1.0/this.slices, 0);
                this.texCoords.push(i*1.0/this.slices + 1.0/this.slices, 1);



                ang+=alphaAng;
            }
            tempHeight = tempHeight + stackHeight;
            ang = 0;
    }


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
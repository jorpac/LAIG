/**
 * MyTorus
 * @constructor
 */
class MyTorus extends CGFobject {
    constructor(scene, id, outradius, inradius, slices, loops) {
        super(scene);
        this.outradius = outradius;
        this.inradius = inradius;
        this.slices = slices;
        this.loops = loops;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var alphaInc = 2 * Math.PI / this.slices;
        var nver = 0;
        var betaInc = (Math.PI / 2) / this.stacks;

        for (var alpha = 0; alpha <= 2 * Math.PI; alpha += alphaInc) {
            for (var beta = -Math.PI / 2; beta <= Math.PI / 2; beta += betaInc) {
                this.vertices.push(this.radius * Math.cos(beta) * Math.cos(alpha), this.radius * Math.cos(beta) * Math.sin(alpha), this.radius * Math.sin(beta));
                this.normals.push(Math.cos(alpha + alphaInc), 0, Math.sin(alpha + alphaInc));
                nver++;
            }
        }

        for (var i = 0; i < nver - (2 * this.stacks + 1); i++) {
            if ((i + 1) % (2 * this.stacks + 1) != 0) {
                this.indices.push(i, i + 2 * this.stacks + 1, i + 2 * this.stacks + 2);
                this.indices.push(i + 2 * this.stacks + 2, i + 1, i);

                this.indices.push(i, i + 2 * this.stacks + 2, i + 2 * this.stacks + 1);
                this.indices.push(i + 1, i + 2 * this.stacks + 2, i);
            }
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
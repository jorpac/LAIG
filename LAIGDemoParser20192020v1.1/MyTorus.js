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
        var betaInc = 2 * Math.PI / this.loops;

        for (var alpha = 0; alpha <= 2 * Math.PI; alpha += alphaInc) {
            for (var beta = 0; beta <= 2* Math.PI; beta += betaInc) {
                this.vertices.push((this.outradius + this.inradius * Math.cos(alpha)) * Math.cos(beta), (this.outradius + this.inradius * Math.cos(alpha)) * Math.sin(beta), this.inradius * Math.sin(alpha));
                this.normals.push(Math.cos(alpha) * Math.cos(beta), Math.cos(alpha) * Math.sin(beta), Math.sin(alpha));
                nver++;
            }
        }

        for (var i = 0; i < nver - (2 * this.loops + 1); i++) {
            if ((i + 1) % (2 * this.loops + 1) != 0) {
                this.indices.push(i, i + 2 * this.loops + 1, i + 2 * this.loops + 2);
                this.indices.push(i + 2 * this.loops + 2, i + 1, i);

                this.indices.push(i, i + 2 * this.loops + 2, i + 2 * this.loops + 1);
                this.indices.push(i + 1, i + 2 * this.loops + 2, i);
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
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
        var utex = 1 / this.loops;
        var v_tex = 1 / this.slices;
        var u_tmp = 0;
        var v_tmp;
        
        for (var beta = 0; beta <= 2* Math.PI+betaInc; beta += betaInc) {
            v_tmp = 1;
            for (var alpha = 0; alpha <= 2 * Math.PI + alphaInc; alpha += alphaInc) {
                this.vertices.push((this.outradius + this.inradius * Math.cos(alpha)) * Math.cos(beta), (this.outradius + this.inradius * Math.cos(alpha)) * Math.sin(beta), this.inradius * Math.sin(alpha));
                this.normals.push(Math.cos(alpha) * Math.cos(beta), Math.cos(alpha) * Math.sin(beta), Math.sin(alpha));
                this.texCoords.push(utex+u_tmp, v_tmp - v_tex);
                nver++;
                v_tmp-=v_tex;
            }
            u_tmp += utex;
        }
       
        for (var i = 0; i < nver - (this.slices + 1) ; i++) {

            if ((i + 1) % (this.slices + 1) != 0) {
                this.indices.push(i, i + this.slices + 1, i + this.slices + 2);
                this.indices.push(i, i + this.slices + 2, i + 1);

                this.indices.push(i + this.slices + 2, i + this.slices + 1, i);
                this.indices.push(i + 1, i + this.slices + 2, i);
            }
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
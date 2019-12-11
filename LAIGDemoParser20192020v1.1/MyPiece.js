class MyPiece{
    constructor(scene, i){
        this.scene = scene;
        this.tile = new MyCylinder3(this.scene, i, 1, 1, 1, 8, 1);
        this.texture = new CGFtexture(this.scene, "scenes/images/white.jpg");
    }
    display(x, y){
        this.scene.material = new CGFappearance(this.scene);
        this.scene.material.setTexture(this.texture);
        this.scene.material.apply();
        this.scene.translate(x,9.01,y);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.tile.display();
    }
}
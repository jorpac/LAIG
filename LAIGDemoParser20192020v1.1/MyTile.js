class MyTile{
    constructor(scene, i){
        this.scene = scene;
        this.tile = new MyCylinder3(this.scene, i, 0.5, 0.5, 0, 8, 1);
        this.texture = new CGFtexture(this.scene, "scenes/images/white.jpg");
    }
    display(i){
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(-4,0,-4);

        this.scene.material = new CGFappearance(this.scene);
        this.scene.material.setTexture(this.texture);
        this.scene.material.apply();
        if(i>8){
            if(i>16){
                if(i>24){
                    if(i>32){
                        if(i>40){
                            if(i>48){
                                if(i>56){
                                    this.scene.translate((i%8),9.01,7);
                                }
                                else
                                    this.scene.translate((i%8),9.01,6);
                            }
                            else
                            this.scene.translate((i%8),9.01,5);
                        }
                        else
                        this.scene.translate((i%8),9.01,4);
                    }
                    else
                    this.scene.translate(i%8,9.01,3);
                } 
                else
                this.scene.translate(i%8,9.01,2);
            }
            else{
                this.scene.translate(i%8,9.01,1);
            }
        }
        else this.scene.translate(i%8,9.01,0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.rotate(-Math.PI/8, 0, 0, 1);
        
        this.tile.display();
    }
}
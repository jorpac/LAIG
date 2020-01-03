class MyTile{
    constructor(orchestrator, i){
        this.orchestrator = orchestrator;
        
        // this.scene = scene;
        this.tile = new MyCylinder3(this.orchestrator.getScene(), i, 0.5, 0.5, 0, 8, 1);
        this.texture = new CGFtexture(this.orchestrator.getScene(), "scenes/images/white.jpg");
    }

    
    display(i){
        this.orchestrator.getScene().popMatrix();
        this.orchestrator.getScene().pushMatrix();
        this.orchestrator.getScene().translate(-4,0,-4);

        this.material = new CGFappearance(this.orchestrator.getScene());
        this.material.setTexture(this.texture);
        this.material.apply();
        if(i>=8){
            if(i>=16){
                if(i>=24){
                    if(i>=32){
                        if(i>=40){
                            if(i>=48){
                                if(i>=56){
                                    this.orchestrator.getScene().translate((i%8)+0.5,9.01,7.5);
                                }
                                else
                                    this.orchestrator.getScene().translate((i%8)+0.5,9.01,6.5);
                            }
                            else
                            this.orchestrator.getScene().translate((i%8)+0.5,9.01,5.5);
                        }
                        else
                        this.orchestrator.getScene().translate((i%8)+0.5,9.01,4.5);
                    }
                    else
                    this.orchestrator.getScene().translate(i%8+0.5,9.01,3.5);
                } 
                else
                this.orchestrator.getScene().translate(i%8+0.5,9.01,2.5);
            }
            else{
                this.orchestrator.getScene().translate(i%8+0.5,9.01,1.5);
            }
        }
        else this.orchestrator.getScene().translate(i%8+0.5,9.01,0.5);
        this.orchestrator.getScene().rotate(-Math.PI/2, 1, 0, 0);
        this.orchestrator.getScene().rotate(-Math.PI/8, 0, 0, 1);
        this.orchestrator.getScene().registerForPick(i+1, this.tile);
        this.tile.display();
    }
}
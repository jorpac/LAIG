class MyPiece{
    constructor(orchestrator, i){
        this.orchestrator = orchestrator;
        
        // this.scene = scene;
        this.piece = new MyCylinder3(this.orchestrator.getScene(), i, 0.5, 0.5, 0.2, 8, 1);
        this.textureb = new CGFtexture(this.orchestrator.getScene(), "scenes/images/asphalt.jpg");
        this.texturew = new CGFtexture(this.orchestrator.getScene(), "scenes/images/white.jpg");
    }

    
    display(i){
        // this.orchestrator.getScene().pushMatrix();
       
        this.orchestrator.getScene().translate(-4,0,-4);

        this.orchestrator.getScene().material = new CGFappearance(this.orchestrator.getScene());
        this.orchestrator.getScene().material.setTexture(this.textureb);
        this.orchestrator.getScene().material.apply();
        if(i>=8){
            if(i>=16){
                if(i>=24){
                    if(i>=32){
                        if(i>=40){
                            if(i>=48){
                                if(i>=56){
                                    this.orchestrator.getScene().translate((i%8),9.01,7);
                                }
                                else
                                    this.orchestrator.getScene().translate((i%8),9.01,6);
                            }
                            else
                            this.orchestrator.getScene().translate((i%8),9.01,5);
                        }
                        else
                        this.orchestrator.getScene().translate((i%8),9.01,4);
                    }
                    else
                    this.orchestrator.getScene().translate(i%8,9.01,3);
                } 
                else
                this.orchestrator.getScene().translate(i%8,9.01,2);
            }
            else{
                this.orchestrator.getScene().translate(i%8,9.01,1);
            }
        }
        else this.orchestrator.getScene().translate(i%8,9.01,0);
        this.orchestrator.getScene().rotate(-Math.PI/2, 1, 0, 0);
        this.orchestrator.getScene().rotate(-Math.PI/8, 0, 0, 1);
        this.piece.display();
        // this.orchestrator.getScene().popMatrix();

    }
}
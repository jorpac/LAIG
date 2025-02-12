class MyPiece{
    constructor(orchestrator, i, turn, animation){
        this.orchestrator = orchestrator;
        this.turn1 = turn;
        this.animation = animation;
        // this.scene = scene;
        this.piece = new MyCylinder3(this.orchestrator.getScene(), i, 0.5, 0.5, 0.2, 8, 1);

        this.material = new CGFappearance(this.orchestrator.getScene());
        
        if(this.turn1){
            this.material.setAmbient(0.1, 0.1, 0.1, 1.0);
            this.material.setDiffuse(0.1, 0.1, 0.1, 1.0);
            this.material.setSpecular(0.1, 0.1, 0.1, 1.0);
            this.material.setShininess(10.0);
        }
        else{
            this.material.setAmbient(0.9, 0.9, 0.9, 1.0);
            this.material.setDiffuse(0.9, 0.9, 0.8, 1.0);
            this.material.setSpecular(0.9, 0.9, 0.8, 1.0);
            this.material.setShininess(10.0);
        }
        this.setAnim();
    }

    setAnim(){
        let key_fr_1 = [];
        key_fr_1.push(1);
        let tr = [0, 15, 0];
        key_fr_1.push(tr);
        let rot =  [0, 0, 0];
        key_fr_1.push(rot);
        let sc = [0.1, 0.1, 0.1];
        key_fr_1.push(sc);

        let key_fr_2 = [10, [0, 15, 0], [0, 0, 0], [1, 1, 1]];

        this.animation.keyFrames.push(key_fr_1);
        this.animation.keyFrames.push(key_fr_2);
    }
    display(i){
        // this.orchestrator.getScene().pushMatrix();
       
        this.orchestrator.getScene().translate(-4,0,-4);
       
        this.material.apply();
        this.animation.apply();
       
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
        this.piece.display();
        // this.orchestrator.getScene().popMatrix();

    }
    getTurn(){
        return this.turn1;
    }
}
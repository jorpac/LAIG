class MySideBoard{
    constructor(orchestrator){
        this.orchestrator = orchestrator;
        this.cubes = [];
        for (let i = 0; i < 81; i++) {
            
            this.cubes[i] = new MyQuad(this.orchestrator.getScene());
        }
    }

    display(){
        for (let i = 0; i < this.cubes.length; i++) {
            this.orchestrator.getScene().popMatrix();
            this.orchestrator.getScene().pushMatrix();
            this.orchestrator.getScene().translate(-4.5,0,-4.5);
    
            this.material = new CGFappearance(this.orchestrator.getScene());
            if ((i%9)==8 || (i%9 == 0)){
                    this.material.setAmbient(0.1, 0.1, 0.1, 1.0);
                    this.material.setDiffuse(0.1, 0.1, 0.1, 1.0);
                    this.material.setSpecular(0.1, 0.1, 0.1, 1.0);
                    this.material.setShininess(10.0);
                }
            
            else if(i>=72 || i <=9){
                    this.material.setAmbient(0.9, 0.9, 0.9, 1.0);
                    this.material.setDiffuse(0.9, 0.9, 0.8, 1.0);
                    this.material.setSpecular(0.9, 0.9, 0.8, 1.0);
                    this.material.setShininess(10.0);
            }
            else{
                    this.material.setAmbient(0.1, 0.1, 1.0, 1.0);
                    this.material.setDiffuse(0.1, 0.1, 0.1, 1.0);
                    this.material.setSpecular(0.4, 0.1, 0.1, 1.0);
                    this.material.setShininess(10.0);
            }
            this.material.apply();
            if(i>=9){
                if(i>=18){
                    if(i>=27){
                        if(i>=36){
                            if(i>=45){
                                if(i>=54){
                                    if(i>=63){
                                        if(i>=72){
                                            this.orchestrator.getScene().translate((i%9)+0.5,9.01,8.5);

                                        }
                                        else
                                            this.orchestrator.getScene().translate((i%9)+0.5,9.01,7.5);
                                    }
                                    else
                                        this.orchestrator.getScene().translate((i%9)+0.5,9.01,6.5);
                                }
                                else
                                this.orchestrator.getScene().translate((i%9)+0.5,9.01,5.5);
                            }
                            else
                            this.orchestrator.getScene().translate((i%9)+0.5,9.01,4.5);
                        }
                        else
                        this.orchestrator.getScene().translate(i%9+0.5,9.01,3.5);
                    } 
                    else
                    this.orchestrator.getScene().translate(i%9+0.5,9.01,2.5);
                }
                else{
                    this.orchestrator.getScene().translate(i%9+0.5,9.01,1.5);
                }
            }
            else this.orchestrator.getScene().translate(i%9+0.5,9.01,0.5);
            this.orchestrator.getScene().rotate(-Math.PI/2, 1, 0, 0);
            this.orchestrator.getScene().rotate(-Math.PI/4, 0, 0, 1);

            this.orchestrator.getScene().scale(0.45, 0.45, 0.45);
            this.cubes[i].display();
            
        }
    }
}
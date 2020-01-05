class MyGameBoard{
    constructor(orchestrator, mode){
        this.orchestrator = orchestrator;
        this.tiles = [];
        this.piece = [];
        this.truePieces = [];
        this.cubes = [];
        this.trueCubes = [];
        this.turn = 0;
        this.turned=0;
        this.mode = mode;
        this.animator = new MyAnimator(this.orchestrator.getScene());
        this.cameraKeyframesPlayer1 = [ [1.0, 90*(Math.PI/180)] ];

        this.cameraKeyframesPlayer2 = [ [1.0, -90*(Math.PI/180)] ];

        // this.tile1 =  new MyTile(this.orchestrator, 0);
        for (let i = 0; i < 64; i++) {
            
            this.tiles[i] = new MyTile(this.orchestrator, i);
            //this.piece[i] = new MyPiece(this.orchestrator, i);
            this.truePieces[i]= false; 

            this.trueCubes[i] = 0; 
           
        }

    }
    
    picked(id){
        this.orchestrator.getScene().setPickEnabled(false);
        this.orchestrator.getScene().cameraRotate=false;
        this.truePieces[id-1] = true;
        let animation = new MyKeyFrameAnimation(this.orchestrator.getScene());
        this.animator.pusha(animation);  
        this.piece[id-1] = new MyPiece(this.orchestrator, id-1, this.turn, animation);
        let i = id -1 ;

         /*---------------- [i-9] ----------------------------------------*/
         if(((i%8) && (i>8 && this.truePieces[i-9] && (this.piece[i].getTurn() == this.piece[i-9].getTurn())))){
          
          if(i%8>4){
                if((i-9)>7.0){
                    if(this.trueCubes[Math.round((id-8)-((id-8)/8.0))-1] == 0){
                        this.cubes[Math.round((id-8)-((id-8)/8.0))-1] = new MyUnitCubeQuad(this.orchestrator.getScene(), this.turn);
                        this.trueCubes[Math.round((id-8)-((id-8)/8.0))-1] = 1;

                    }
                    else if(this.trueCubes[Math.round((id-8)-((id-8)/8.0))-1] == 1){
                        this.cubes[Math.round((id-8)-((id-8)/8.0))-1].changeTurn(this.turn);
                        if(this.turned==0){
                            this.turn = Math.abs(this.turn - 1);
                            this.turned=1;
                        }
                        this.trueCubes[Math.round((id-8)-((id-8)/8.0))-1] = 2;
                    }
                }else{
                    if(this.trueCubes[id-10] == 0){
                        this.cubes[id-10] = new MyUnitCubeQuad(this.orchestrator.getScene(), this.turn);
                        this.trueCubes[id-10] = 1;

                    }
                    else if(this.trueCubes[id-10] == 1){
                        this.cubes[id-10].changeTurn(this.turn);
                        if(this.turned==0){
                            this.turn = Math.abs(this.turn - 1);
                            this.turned=1;
                        }
                        this.trueCubes[id-10] = 2;
                    }
                }
            
         }

         if(i%8<=4){
            if((i-9)>7.0){
                    if(this.trueCubes[Math.floor((id-8)-((id-8)/8.0))-1] == 0){
                        this.cubes[Math.floor((id-8)-((id-8)/8.0))-1] = new MyUnitCubeQuad(this.orchestrator.getScene(), this.turn);
                        this.trueCubes[Math.floor((id-8)-((id-8)/8.0))-1] = 1;

                    }
                    else if(this.trueCubes[Math.floor((id-8)-((id-8)/8.0))-1] == 1){
                        this.cubes[Math.floor((id-8)-((id-8)/8.0))-1].changeTurn(this.turn);
                        if(this.turned==0){
                            this.turn = Math.abs(this.turn - 1);
                            this.turned=1;
                        }
                        this.trueCubes[Math.floor((id-8)-((id-8)/8.0))-1] = 2;
                    }
                }else{
                    if(this.trueCubes[id-10] == 0){
                        this.cubes[id-10] = new MyUnitCubeQuad(this.orchestrator.getScene(), this.turn);
                        this.trueCubes[id-10] = 1;

                    }
                    else if(this.trueCubes[id-10] == 1){
                        this.cubes[id-10].changeTurn(this.turn);
                        if(this.turned==0){
                            this.turn = Math.abs(this.turn - 1);
                            this.turned=1;
                        }
                        this.trueCubes[id-10] = 2;
                    }
                }
            }
         }

        /*---------------- [i-7] ----------------------------------------*/
        if((i%8!=7.0) && i>7.0 && this.truePieces[i-7.0] && (this.piece[i].getTurn() == this.piece[i-7.0].getTurn())){

            if(i%8>4){

                if((i-7.0)>7.0){
                    if(this.trueCubes[Math.round((id-8)-((id-8)/8.0))] == 0){
                        this.cubes[Math.round((id-8)-((id-8)/8.0))] = new MyUnitCubeQuad(this.orchestrator.getScene(), this.turn);
                        this.trueCubes[Math.round((id-8)-((id-8)/8.0))] = 1;

                    }
                    else if(this.trueCubes[Math.round((id-8)-((id-8)/8.0))] == 1){
                        this.cubes[Math.round((id-8)-((id-8)/8.0))].changeTurn(this.turn);
                        if(this.turned==0){
                            this.turn = Math.abs(this.turn - 1);
                            this.turned=1;
                        }
                        this.trueCubes[Math.round((id-8)-((id-8)/8.0))] = 2;
                    }
                }else{
                    if(this.trueCubes[id-9] == 0){
                        this.cubes[id-9] = new MyUnitCubeQuad(this.orchestrator.getScene(), this.turn);
                        this.trueCubes[id-9] = 1;

                    }
                    else if(this.trueCubes[id-9] == 1){
                        this.cubes[id-9].changeTurn(this.turn);
                        if(this.turned==0){
                            this.turn = Math.abs(this.turn - 1);
                            this.turned=1;
                        }
                        this.trueCubes[id-9] = 2;
                    }
                }

            } 

            if(i%8<=4){
                if((i-7.0)>7.0){
                    if(this.trueCubes[Math.floor((id-8)-((id-8)/8.0))] == 0){
                        this.cubes[Math.floor((id-8)-((id-8)/8.0))] = new MyUnitCubeQuad(this.orchestrator.getScene(), this.turn);
                        this.trueCubes[Math.floor((id-8)-((id-8)/8.0))] = 1;

                    }
                    else if(this.trueCubes[Math.floor((id-8)-((id-8)/8.0))] == 1){
                        this.cubes[Math.floor((id-8)-((id-8)/8.0))].changeTurn(this.turn);
                        if(this.turned==0){
                            this.turn = Math.abs(this.turn - 1);
                            this.turned=1;
                        }
                        this.trueCubes[Math.floor((id-8)-((id-8)/8.0))] = 2;
                    }
                }else{
                    if(this.trueCubes[id-9] == 0){
                        this.cubes[id-9] = new MyUnitCubeQuad(this.orchestrator.getScene(), this.turn);
                        this.trueCubes[id-9] = 1;

                    }
                    else if(this.trueCubes[id-9] == 1){
                        this.cubes[id-9].changeTurn(this.turn);
                        if(this.turned==0){
                            this.turn = Math.abs(this.turn - 1);
                            this.turned=1;
                        }
                        this.trueCubes[id-9] = 2;
                    }
                }

            }
        }


        /*---------------- [i+9] ----------------------------------------*/
        if((this.truePieces[i+9] && (this.piece[i].getTurn() == this.piece[i+9].getTurn())) ){

            if(i%8>4){

                if(this.trueCubes[Math.round(id-(id/8.0))] == 0){
                this.cubes[Math.round(id-(id/8.0))] = new MyUnitCubeQuad(this.orchestrator.getScene(), this.turn);
                this.trueCubes[Math.round(id-(id/8.0))] = 1;

            }
            else if(this.trueCubes[Math.round(id-(id/8.0))] == 1){
                this.cubes[Math.round(id-(id/8.0))].changeTurn(this.turn);
                if(this.turned==0){
                            this.turn = Math.abs(this.turn - 1);
                            this.turned=1;
                        }
                this.trueCubes[Math.round(id-(id/8.0))] = 2;
            }
            }

            if(i%8<=4){

                if(this.trueCubes[Math.floor(id-(id/8.0))] == 0){
                this.cubes[Math.floor(id-(id/8.0))] = new MyUnitCubeQuad(this.orchestrator.getScene(), this.turn);
                this.trueCubes[Math.floor(id-(id/8.0))] = 1;

            }
            else if(this.trueCubes[Math.floor(id-(id/8.0))] == 1){
                this.cubes[Math.floor(id-(id/8.0))].changeTurn(this.turn);
                if(this.turned==0){
                            this.turn = Math.abs(this.turn - 1);
                            this.turned=1;
                        }
                this.trueCubes[Math.floor(id-(id/8.0))] = 2;
            }
            }

            

        }


        /*---------------- [i+7] ----------------------------------------*/
        if((this.truePieces[i+7.0] && (this.piece[i].getTurn() == this.piece[i+7.0].getTurn()))){

            if(i%8>4){

                if(this.trueCubes[Math.round(id-(id/8.0)-1)] == 0){
                    this.cubes[Math.round(id-(id/8.0)-1)] = new MyUnitCubeQuad(this.orchestrator.getScene(), this.turn);
                    this.trueCubes[Math.round(id-(id/8.0)-1)] = 1;

                }
                else if(this.trueCubes[Math.round(id-(id/8.0)-1)] == 1){
                    this.cubes[Math.round(id-(id/8.0)-1)].changeTurn(this.turn);
                    if(this.turned==0){
                            this.turn = Math.abs(this.turn - 1);
                            this.turned=1;
                        }
                    this.trueCubes[Math.round(id-(id/8.0)-1)] = 2;
                }
            }

            if(i%8<=4){

                if(this.trueCubes[Math.floor(id-(id/8.0)-1)] == 0){
                    this.cubes[Math.floor(id-(id/8.0)-1)] = new MyUnitCubeQuad(this.orchestrator.getScene(), this.turn);
                    this.trueCubes[Math.floor(id-(id/8.0)-1)] = 1;

                }
                else if(this.trueCubes[Math.floor(id-(id/8.0)-1)] == 1){
                    this.cubes[Math.floor(id-(id/8.0)-1)].changeTurn(this.turn);
                    if(this.turned==0){
                            this.turn = Math.abs(this.turn - 1);
                            this.turned=1;
                        }
                    this.trueCubes[Math.floor(id-(id/8.0)-1)] = 2;
                }
            }
        }


        setTimeout(() => { this.turn = Math.abs(this.turn - 1); this.orchestrator.getScene().setPickEnabled(true); if(this.mode && this.turn){
            let i1 = Math.floor(Math.random()*64);
            while(this.piece[i1-1]!=undefined){
                i1 = Math.floor(Math.random()*64);
            }
            console.log(i1);
            this.orchestrator.gameMoves.push(i1-1); 
            this.picked(i1);} }, 1000); 
        this.turned=0;
        if(this.turn){
            
            this.orchestrator.getScene().cameraAnimation = new MyKeyFrameCameraAnimation(this.orchestrator.getScene(), this.cameraKeyframesPlayer1);
        }else{   
            this.orchestrator.getScene().cameraAnimation = new MyKeyFrameCameraAnimation(this.orchestrator.getScene(), this.cameraKeyframesPlayer2);
        }

        this.orchestrator.getScene().cameraRotate=true;
    }
    update(t){
        this.animator.update(t);
    }
    display(){
        this.orchestrator.getScene().logPicking();
        this.orchestrator.getScene().clearPickRegistration();;
       
        for (let i = 0; i < this.tiles.length; i++) {
            
            this.tiles[i].display(i);
            
            if(this.truePieces[i]){
                this.orchestrator.getScene().clearPickRegistration();
                this.orchestrator.getScene().popMatrix();
                this.orchestrator.getScene().pushMatrix();
                
                this.piece[i].display(i); 
            }

            if(i%8>4 || (i>4 && i<8)){

                if(this.cubes[Math.round(i-(i/8.0))]!=undefined && i<56 && i!=0 && (i%8)!=0){
                        this.orchestrator.getScene().rotate(-Math.PI/2-Math.PI/8, 0, 0, 1);                    
                        //this.orchestrator.getScene().rotate(-Math.PI, 0, 0, 1);
                        this.orchestrator.getScene().scale(0.45, 0.45, 0.2);
                        this.orchestrator.getScene().translate(1.55, 0, 0.5);
                        this.cubes[Math.round(i-(i/8.0))].display();
                        this.orchestrator.getScene().translate(-1.55, 0, -0.5);
                        this.orchestrator.getScene().scale(2.5, 2.5, 5);
                        this.orchestrator.getScene().rotate(-(-Math.PI/2-Math.PI/8), 0, 0, 1);
                }
            }else if(i%8<=4 || (i<5)){
                if(this.cubes[Math.floor(i-(i/8.0))]!=undefined && i<56 && i!=0 && (i%8)!=0){
                        this.orchestrator.getScene().rotate(-Math.PI/2-Math.PI/8, 0, 0, 1);                    
                        //this.orchestrator.getScene().rotate(-Math.PI, 0, 0, 1);
                        this.orchestrator.getScene().scale(0.45, 0.45, 0.2);
                        this.orchestrator.getScene().translate(1.55, 0, 0.5);
                        this.cubes[Math.floor(i-(i/8.0))].display();
                        this.orchestrator.getScene().translate(-1.55, 0, -0.5);
                        this.orchestrator.getScene().scale(2.5, 2.5, 5);
                        this.orchestrator.getScene().rotate(-(-Math.PI/2-Math.PI/8), 0, 0, 1);
            }
        }

    }
}

    undo(id){
        this.orchestrator.getScene().setPickEnabled(false);

        this.truePieces[id]=false;
        delete this.piece[id];
        setTimeout(() => { this.turn = Math.abs(this.turn - 1); this.orchestrator.getScene().setPickEnabled(true); }, 1000); 
        
        if(this.turn){
            
            this.orchestrator.getScene().cameraAnimation = new MyKeyFrameCameraAnimation(this.orchestrator.getScene(), this.cameraKeyframesPlayer1);
        }else{   
            this.orchestrator.getScene().cameraAnimation = new MyKeyFrameCameraAnimation(this.orchestrator.getScene(), this.cameraKeyframesPlayer2);
        }

        this.orchestrator.getScene().cameraRotate=true;
    }
}

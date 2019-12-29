class MyGameBoard{
    constructor(orchestrator){
        this.orchestrator = orchestrator;
        this.tiles = [];
        this.piece = [];
        this.truePieces = [];
        this.cubes = [];
        this.trueCubes = [];
        // this.tile1 =  new MyTile(this.orchestrator, 0);
        for (let i = 0; i < 64; i++) {
            
            this.tiles[i] = new MyTile(this.orchestrator, i);
            this.piece[i] = new MyPiece(this.orchestrator, i);
            this.truePieces[i]= false;  
            this.cubes[i] = new MyUnitCubeQuad(this.orchestrator.getScene());
            this.trueCubes[i] = 1;
        }
    }
    
    picked(id){
        this.truePieces[id-1] = true;  
    
    }
    display(){
        this.orchestrator.getScene().logPicking();
        this.orchestrator.getScene().clearPickRegistration();
        for (let i = 0; i < this.tiles.length; i++) {
            
            this.tiles[i].display(i);
            
        } 
        
        for (let i = 0; i < this.piece.length; i++) {
            if(this.truePieces[i]){
                this.orchestrator.getScene().clearPickRegistration();
                this.orchestrator.getScene().popMatrix();
                this.orchestrator.getScene().pushMatrix();
                this.piece[i].display(i);
                if(i>=8? (i%8!=1)? this.truePieces[i-9]?true:false:false:false){
                    if(this.trueCubes[i]==1 || this.trueCubes[i]==0){
                    this.trueCubes[i] = 0;
                    this.orchestrator.getScene().rotate(-Math.PI/8, 0, 0, 1);                    
                    this.orchestrator.getScene().scale(0.4, 0.4, 0.2);
                    this.orchestrator.getScene().translate(-1.75, 0, 0.5);
                    this.cubes[i].display();
                    }
                }
                if((i%8!=0) && (i>8? this.truePieces[i-7]?this.trueCubes[i+1]?true:false:false:false)){
                    this.trueCubes[i+1] = 2;
                    this.orchestrator.getScene().rotate(-Math.PI/2-Math.PI/8, 0, 0, 1);                    
                    this.orchestrator.getScene().scale(0.4, 0.4, 0.2);
                    this.orchestrator.getScene().translate(-1.75, 0, 0.5);
                    this.cubes[i].display();
                }
            }
            
        } 

       // this.tile1.display();
    }
}
class MyGameBoard{
    constructor(orchestrator){
        this.orchestrator = orchestrator;
        this.tiles = [];
        this.tile1 =  new MyTile(this.orchestrator, 0);
        for (let i = 0; i < 80; i++) {
            
            this.tiles[i] = new MyTile(this.orchestrator, i);
            
        }
    }

    display(){
        for (let i = 0; i < this.tiles.length; i++) {
            
            this.tiles[i].display(i);
            
        } 
        
       // this.tile1.display();
    }
}
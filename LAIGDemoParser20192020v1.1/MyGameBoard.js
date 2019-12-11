class MyGameBoard{
    constructor(scene){
        this.scene = scene;
        this.tiles = [];
        this.tile1 =  new MyTile(this.scene, 0);
        for (let i = 0; i < 80; i++) {
            
            this.tiles[i] = new MyTile(this.scene, i);
            
        }
    }

    display(){
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].display(i);
            
        } 
        
       // this.tile1.display();
    }
}
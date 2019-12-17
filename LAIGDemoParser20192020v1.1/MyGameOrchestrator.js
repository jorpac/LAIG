class MyGameOrchestrator{
    constructor(scene) {
        this.scene = scene;
        this.theme = this.scene.graph;
        this.gameBoard = new MyGameBoard(this);
        //this.gameboard = new MyGameboard();
    }


    display(){
        this.scene.graph.displayScene(this.scene.graph.rootName, this.scene.transfMatrix);
        this.gameBoard.display();
        this.scene.graph.materialIncrement=false;
    
    }

    getScene(){
        return this.scene;
    }
}
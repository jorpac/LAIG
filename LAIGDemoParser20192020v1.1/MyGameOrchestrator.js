class MyGameOrchestrator{
    constructor(scene) {
        this.scene = scene;
        this.theme = this.scene.graph;
        //this.gameboard = new MyGameboard();
    }


    display(){
        this.scene.graph.displayScene(this.scene.graph.rootName, this.scene.transfMatrix);
        this.scene.graph.materialIncrement=false;
    
    }
}
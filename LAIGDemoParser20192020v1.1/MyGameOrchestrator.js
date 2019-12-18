class MyGameOrchestrator{
    constructor(scene) {
        this.scene = scene;
        this.theme = this.scene.graph;
        this.gameBoard = new MyGameBoard(this);
        //this.gameboard = new MyGameboard();
    }

    logPicking() {
		if (this.scene.pickMode == false) {
			if (this.scene.pickResults != null && this.scene.pickResults.length > 0) {
				for (var i = 0; i < this.scene.pickResults.length; i++) {
					var obj = this.scene.pickResults[i][0];
					if (obj) {
						var customId = this.scene.pickResults[i][1];
                        console.log("Picked object: " + obj + ", with pick id " + customId);
                        this.gameBoard.picked(customId);						
					}
				}
				this.scene.pickResults.splice(0, this.scene.pickResults.length);
			}
		}
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
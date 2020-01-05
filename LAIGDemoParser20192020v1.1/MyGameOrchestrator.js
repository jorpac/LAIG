class MyGameOrchestrator{
    constructor(scene) {
        this.scene = scene;
        this.theme = this.scene.graph;
        this.gameBoard = new MyGameBoard(this);
        this.sideBoard = new MySideBoard(this);
        this.gameMoves = [];
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
                        this.gameMoves.push(customId-1);						
					}
				}
				this.scene.pickResults.splice(0, this.scene.pickResults.length);
			}
		}
	}
    display(){
        
        this.sideBoard.display();
        this.gameBoard.display();
    
    }

    update(t){
        this.gameBoard.update(t);
    }
    getScene(){
        return this.scene;
    }

    undo(){
        this.gameBoard.undo(this.gameMoves.pop());
        
    }
}
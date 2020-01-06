class MyKeyFrameCameraAnimation{
    constructor(scene, keyframes){
        this.scene=scene;
        this.keyFrames = keyframes;
        this.time = 0;
        this.stage = 0;
        
    }
    update(t){
        this.time+=t;
        if(this.stage < this.keyFrames.length){
            console.log(this.stage);
            var stopTime = this.keyFrames[this.stage][0];
            
            let stageTime, trX, trY, trZ, rotX, rotY, rotZ, scX, scY, scZ;
            
            if(this.stage > 0){
                //actual time
                stageTime = stopTime - this.keyFrames[this.stage -1][0];                

                //Rotation
                rotY = this.keyFrames[this.stage][1] - this.keyFrames[this.stage -1][1];
                
            }
            else{
                 //actual time
                 stageTime = stopTime;
                
                 
                rotY = this.keyFrames[this.stage][1];
                 
            }

            if(this.time <= stopTime){
                this.scene.camera.rotate([0,1,0], (rotY / stageTime)*t);
            }

            if(this.time > stopTime) this.stage++;
        }
    }
}
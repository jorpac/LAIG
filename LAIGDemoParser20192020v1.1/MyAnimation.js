var DEGREE_TO_RAD = Math.PI / 180;

class MyAnimation{
    constructor(scene){
        this.scene = scene;

    }
    update(t){

    }
    apply(){

    }
}

class MyAnimator extends MyAnimation{
    constructor(scene){
        super(scene);
        this.animations = [];
    }
    pusha(animation){
        this.animations.push(animation);
    }
    update(t){
        for (let i = 0; i < this.animations.length; i++) {
            this.animations[i].update(t);
            
        }
    }
    apply(){

    }
}


class MyKeyFrameAnimation extends MyAnimation{
    constructor(scene){
        super(scene);
        this.keyFrames = [];
        this.tMatrix = {x:0.0, y:0.0, z:0.0};
        this.rMatrix = {x:0.0, y:0.0, z:0.0};
        this.sMatrix = {x:1.0, y:1.0, z:1.0};
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
                
                //Translation
                
                trX = this.keyFrames[this.stage][1][0] - this.keyFrames[this.stage -1][1][0];
                trY = this.keyFrames[this.stage][1][1] - this.keyFrames[this.stage -1][1][1];
                trZ = this.keyFrames[this.stage][1][2] - this.keyFrames[this.stage -1][1][2];
               // console.log(trX, trY, trZ);
                
                //Rotation

                rotX = this.keyFrames[this.stage][2][0] - this.keyFrames[this.stage -1][2][0];
                rotY = this.keyFrames[this.stage][2][1] - this.keyFrames[this.stage -1][2][1];
                rotZ = this.keyFrames[this.stage][2][2] - this.keyFrames[this.stage -1][2][2];
                
                scX = this.keyFrames[this.stage][3][0] - this.keyFrames[this.stage -1][3][0];
                scY = this.keyFrames[this.stage][3][1] - this.keyFrames[this.stage -1][3][1];
                scZ = this.keyFrames[this.stage][3][2] - this.keyFrames[this.stage -1][3][2];
                
            }
            else{
                 //actual time
                 stageTime = stopTime;
                
                 //Translation
                 
                 trX = this.keyFrames[this.stage][1][0];
                 trY = this.keyFrames[this.stage][1][1];
                 trZ = this.keyFrames[this.stage][1][2];
                
                 //Rotation
 
                 rotX = this.keyFrames[this.stage][2][0];
                 rotY = this.keyFrames[this.stage][2][1];
                 rotZ = this.keyFrames[this.stage][2][2];
                 
                //  scX = this.keyFrames[this.stage][3][0];
                //  scY = this.keyFrames[this.stage][3][1];
                //  scZ = this.keyFrames[this.stage][3][2];
                 
            }

            if(this.time <= stopTime){
                this.tMatrix.x += (trX / stageTime) * t;
                this.tMatrix.y += (trY / stageTime) * t;
                this.tMatrix.z += (trZ / stageTime) * t;
                this.rMatrix.x += (rotX / stageTime) * t;
                this.rMatrix.y += (rotY / stageTime) * t;
                this.rMatrix.z += (rotZ / stageTime) * t;
               // console.log(this);
                
                // this.sMatrix.x*=(scX/stageTime)*t;
                // this.sMatrix.y*=(scY/stageTime)*t;
                // this.sMatrix.z*=(scZ/stageTime)*t;
            }

            if(this.time > stopTime) this.stage++;
        }
    }

    apply(){
        let aniMatrix = mat4.create();
        aniMatrix = mat4.translate(aniMatrix, aniMatrix, [this.tMatrix.x, this.tMatrix.y, this.tMatrix.z]);
        aniMatrix = mat4.rotate(aniMatrix, aniMatrix, -DEGREE_TO_RAD * this.rMatrix.z,[0, 0, 1]);
        aniMatrix = mat4.rotate(aniMatrix, aniMatrix, -DEGREE_TO_RAD * this.rMatrix.y, [0, 1, 0]);
        aniMatrix = mat4.rotate(aniMatrix, aniMatrix, -DEGREE_TO_RAD * this.rMatrix.x, [1, 0, 0]);
        aniMatrix = mat4.scale(aniMatrix, aniMatrix, [this.sMatrix.x, this.sMatrix.y, this.sMatrix.z]);
        return aniMatrix;
    }
}
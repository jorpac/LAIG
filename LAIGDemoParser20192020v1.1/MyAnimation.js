class MyAnimation{
    constructor(scene, animation, t){
        this.scene = scene;
        this.animation = animation;
        this.keyFrameT = mat4.create();
        for(var j = 0; j < this.animation.length; j+=2){
            this.keyFrameT.multMatrix(this.animation[j+1]);
            keyFrame = new MyKeyFrame(this.animation[j], this.keyFrameT);
        }
        this.tMatrix = t;
    }
    update(t){

    }
    apply(){

    }
}


class MyKeyFrame{
    constructor(keyFrameTime, keyFrameTransf){
        this.keyFrameTime = keyFrameTime;
        this.keyFrameTransf = keyFrameTransf;
    }
}
class MyKeyFrameAnimation extends MyAnimation{

    update(t){
        while(t < this.keyFrameTime[this.keyFrameTime.length()-1]){
            // if(t < keyFrameTime)
        }
    }

    apply(){

    }
}
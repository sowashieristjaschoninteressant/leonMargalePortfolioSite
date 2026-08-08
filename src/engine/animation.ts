export type animationProps = {
    with:number;
    height:number;
    x:number;
    y:number;
    frameCount:number;
    timeDelta:number;
}

export class Animation{
    width:number;
    height:number;
    x:number;
    y:number;
    frameCount:number;
    frameIndex:number = 0;
    timeDelta:number = 0;
    timecurrent:number = 0;

    constructor(animationConf:animationProps){
        this.width = animationConf.with;
        this.height = animationConf.height;
        this.x = animationConf.x;
        this.y = animationConf.y;
        this.frameCount = animationConf.frameCount;
        this.timeDelta = animationConf.timeDelta;
    }

    updateFrame(dt:number){

        this.timecurrent += dt;

       while(this.timecurrent >= this.timeDelta){

       this.timecurrent -= this.timeDelta;

       if(this.frameIndex < this.frameCount - 1){
             this.frameIndex++;
             this.x = this.x + this.width;
        }else{
            
            this.frameIndex = 0;
            this.x = 0;
        }
        }
    }



}
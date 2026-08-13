import { handleError } from "../utils/error";
import { animationProps, Animation } from "./animation";


type spriteState = "IDLE" | "RUN";

export class Sprite{
    animationTime: number | null = null;
    img: HTMLImageElement | null = null;
    animations: Map<spriteState,Animation> = new Map<spriteState,Animation>();
    state: spriteState = "RUN";
    reverse: boolean = false;

     constructor(animationDelay: number, img:HTMLImageElement){
        this.animationTime = animationDelay;
        this.img = img;

    };

    setReverse(isReverse:boolean){
        this.reverse = isReverse;
    };

    draw(ctx:CanvasRenderingContext2D , x:number,y:number, dt:number){
        const animation = this.animations.get(this.state);
        const scale = 3;
        
        if(!animation){
            handleError("cannot resolve animation", {source: "sprite" ,data: "null"});
            return;
        }

         ctx?.save();
         ctx!.imageSmoothingEnabled = false;
        if(this.reverse){
            ctx.translate(x + animation.width * scale, y);
            ctx.scale(-1,1);
            ctx?.drawImage(this.img!, animation.x, animation.y, animation.width, animation.height,0,0,animation.width * scale, animation.height * scale );
        }else{
            ctx?.drawImage(this.img!, animation.x, animation.y, animation.width, animation.height,x,y,animation.width * scale, animation.height * scale );
        }
      
        
        animation.updateFrame(dt);

        ctx?.restore();
    };

    setState(state: spriteState){
        this.state = state;
    };
   
    add_animation(animationConf: animationProps, spriteState: spriteState){
        const animation = new Animation(animationConf);

        this.animations.set(spriteState, animation);
    }

}
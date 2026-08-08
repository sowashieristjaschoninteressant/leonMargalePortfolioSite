import { handleError } from "../utils/error";
import { animationProps, Animation } from "./animation";


type spriteState = "IDLE" | "RUN";

export class Sprite{
    ctx: CanvasRenderingContext2D | null = null;
    animationTime: number | null = null;
    img: HTMLImageElement | null = null;
    animations: Map<spriteState,Animation> = new Map<spriteState,Animation>();
    state: spriteState = "RUN";

     constructor(animationDelay: number, img:HTMLImageElement, ctx: CanvasRenderingContext2D){
        this.ctx = ctx;
        this.animationTime = animationDelay;
        this.img = img;

    }

    draw(x:number,y:number, dt:number){
        const animation = this.animations.get(this.state);
        const scale = 3;
        
        if(!animation){
            handleError("cannot resolve animation", {source: "sprite" ,data: "null"});
            return;
        }

        this.ctx?.save();
        this.ctx!.imageSmoothingEnabled = false;

      
        this.ctx?.drawImage(this.img!, animation.x, animation.y, animation.width, animation.height,x,y,animation.width * scale, animation.height * scale );

        animation.updateFrame(dt);

        this.ctx?.restore();
    }

    setState(state: spriteState){
        this.state = state;
    }
   
    add_animation(animationConf: animationProps, spriteState: spriteState){
        const animation = new Animation(animationConf);

        this.animations.set(spriteState, animation);
    }

}
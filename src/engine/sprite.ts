import { handleError } from "../utils/error";
import { animationProps, Animation } from "./animation";


type spriteState = "IDLE" | "RUN";
type spriteAnchor = {x:number,y:number};

export class Sprite{
    animationTime: number | null = null;
    img: HTMLImageElement | null = null;
    animations: Map<spriteState,Animation> = new Map<spriteState,Animation>();
    state: spriteState = "RUN";
    reverse: boolean = false;

     constructor(animationDelay: number, img:HTMLImageElement, private readonly anchor:spriteAnchor = {x:0,y:0}){
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

        const renderWidth = animation.width * scale;
        const renderHeight = animation.height * scale;

        const drawX = x - renderWidth * this.anchor.x;
        const drawY = y - renderHeight * this.anchor.y;


         ctx?.save();
         ctx!.imageSmoothingEnabled = false;
        if(this.reverse){
            ctx.translate(drawX + renderWidth, drawY);
            ctx.scale(-1,1);
            ctx?.drawImage(this.img!, animation.x, animation.y, animation.width, animation.height,0,0,renderWidth, renderHeight );
        }else{
            ctx?.drawImage(this.img!, animation.x, animation.y, animation.width, animation.height,drawX,drawY,renderWidth, renderHeight );
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
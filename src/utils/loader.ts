import { handleError } from "./error";

export function loadImage(imagePath:string): Promise<HTMLImageElement>{
    return new Promise((resolve, reject) => {

        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => {
            handleError("cannot resolve image", { source : "sprite", data : imagePath});
            return reject(new Error());
        };

        img.src = imagePath;
    })

}
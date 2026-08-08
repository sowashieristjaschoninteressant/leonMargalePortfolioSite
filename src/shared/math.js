export function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);


    return Math.floor(Math.random() *  (max - min + 1)) + min;
}

// linar interpolation
export function lerp( a, b, alpha ) {
 return a + alpha * ( b - a );
}

/** here vector math */
export function vec2scale(v, scale ){

    v.x =  v.x * scale;
    v.y =  v.y * scale;

    return v;
}

export function vec2Normalize(vec2){

    
    let length =   Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y);

    vec2.x = vec2.x / length;
    vec2.y = vec2.y / length; 



   return vec2;

}
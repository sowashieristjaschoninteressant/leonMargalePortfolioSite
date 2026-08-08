import { ClassType } from "react";

type ErrorContext = {
    source: string,
    data: string
};

export const handleError = (message: string, context?: ErrorContext ) => {
    
    console.log(`ERROR:${message}`);

    if(context?.source){
        console.error(`Source: ${context.source}`);
    }

    if(context?.data){
        console.error(`Data: ${context.data}`);
    }
}
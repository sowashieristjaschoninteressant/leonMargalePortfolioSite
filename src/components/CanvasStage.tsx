"use client";

import { useEffect, useRef } from "react";
import { Renderer } from "@/src/engine/render";
import { FracTree } from "@/src/features/tree/tree";
import { Rain } from "@/src/features/rain/Rain";
import { loadImage } from "../utils/loader";
import { createBird } from "../shared/factories/birdFactory";

export default  function CanvasStage() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    

    useEffect( ()  => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        (async ()=> {
            const assetImg = await loadImage("ravenTEST.png");

            const bird = createBird(ctx, window.innerWidth / 4, window.innerHeight - 200, assetImg);
            bird.flyTo({x: window.innerWidth / 2, y: window.innerHeight  / 2 });

              const objects = [
            new Rain(1000),
            new FracTree(0.58, window.innerWidth / 2, window.innerHeight),
            bird
            ];
            
        const renderer = new Renderer(ctx, objects);

        renderer.render();
        })();
       
        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "block",
                background: "#0D1164",
            }}
        />
    );
}
"use client";

import { useEffect, useRef } from "react";
import { Renderer } from "@/src/engine/render";
import { FracTree } from "@/src/features/tree/tree";
import { Rain } from "@/src/features/rain/Rain";
import { loadImage } from "../utils/loader";
import { Bounds } from "../engine/bounds";
import { MeshObject, System } from "../engine/types";
import { RavenSystem } from "../features/birds/RavenSystem";
import { PerchRegistry } from "../features/tree/PerchProvider";

export default function CanvasStage() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
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

        (async () => {
            const assetImg = await loadImage("ravenTEST.png");
            const registry = new PerchRegistry();
            const world: MeshObject[] = [
                new Rain(1000),
                new FracTree(0.58, window.innerWidth / 2, window.innerHeight, registry),
            ];

            const bounds = new Bounds(canvas.height, canvas.width);
            const ravenSystem = new RavenSystem(world, assetImg, bounds, registry);
            const renderer = new Renderer(ctx, world, [ravenSystem]);

            ravenSystem.registerSpawn(ctx);
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
                inset: 0,
                width: "100vw",
                height: "100vh",
                display: "block",
                background: "#0D1164",
                zIndex: 0,
                pointerEvents: "none",
            }}
        />
    );
}
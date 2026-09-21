import CanvasStage from "@/src/components/CanvasStage";
import { PortfolioOverlay } from "../components/Portfolio/PortfolioOverlay";

export default function Page(){

    return (
        <main className="relative min-h-screen">
        <CanvasStage/>
        <PortfolioOverlay/>
        </main>
    )
}
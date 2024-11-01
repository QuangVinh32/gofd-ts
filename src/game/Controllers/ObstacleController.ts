// ObstacleController.ts
import ObstacleDTO from "../DTOs/ObstacleDTO";

export default class ObstacleController {
    private obstacles: ObstacleDTO[];

    constructor() {
        this.obstacles = [];
    }

    addObstacle(dto: ObstacleDTO) {
        this.obstacles.push(dto);
    }

    getAllObstacles(): ObstacleDTO[] {
        return this.obstacles;
    }

    getObstacleById(id: number): ObstacleDTO | undefined {
        return this.obstacles.find(obstacle => obstacle.id === id);
    }

    updateObstacle(id: number, newData: Partial<ObstacleDTO>) {
        const obstacle = this.getObstacleById(id);
        if (!obstacle) return;


        for (const [key, value] of Object.entries(newData)) {
            if (value === undefined) continue;

            switch (key) {
                case "pointA":
                    obstacle.pointA = value as { x: number; y: number }; 
                    break;
                case "pointB":
                    obstacle.pointB = value as { x: number; y: number };
                    break;
                case "height":
                    obstacle.height = value as number;
                    break;
                case "color":
                    obstacle.color = value as number;
                    break;
                case "alpha":
                    obstacle.alpha = value as number;
                    break;
                case "isStatic":
                    obstacle.isStatic = value as boolean;
                    break;
                case "restitution":
                    obstacle.restitution = value as number;
                    break;
                case "shape":
                    obstacle.shape = value as string;
                    break;
                case "levelNumber":
                    obstacle.levelNumber = value as number;
                    break;
                default:
                    console.warn(`Property ${key} does not exist on ObstacleDTO.`);
            }
        }
    }
}
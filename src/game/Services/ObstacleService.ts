import Phaser from 'phaser';
import  ObstacleDTO  from '../DTOs/ObstacleDTO';
import ObstacleView from '../Views/ObstacleView';

class ObstacleService {
    private scene: Phaser.Scene;
    private jsonPath: string;
    private obstacleViews: ObstacleView[] = [];
    private obstacleData: ObstacleDTO[] = [];

    constructor(scene: Phaser.Scene, jsonPath: string) {
        this.scene = scene;
        this.jsonPath = jsonPath;
    }

    async loadObstacles(): Promise<ObstacleDTO[]> {
        try {
            const response = await fetch(this.jsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (!data.obstacles) {
                throw new Error("JSON does not contain 'obstacles' key.");
            }

            this.obstacleData = data.obstacles.map((obstacleData: any) => {
                return new ObstacleDTO(
                    obstacleData.id,
                    obstacleData.pointA,
                    obstacleData.pointB,
                    obstacleData.height,
                    obstacleData.color,
                    obstacleData.alpha,
                    obstacleData.isStatic,
                    obstacleData.restitution,
                    obstacleData.shape,
                    obstacleData.levelNumber
                );
            });

            return this.obstacleData;
        } catch (error) {
            console.error("Error loading obstacles:", error);
            return [];
        }
    }

    async initialize(levelNumber: number): Promise<void> {
        await this.loadObstacles();
        const specificObstacles = this.obstacleData.filter(dto => dto.levelNumber === levelNumber);
        specificObstacles.forEach(dto => this.createObstacleView(dto));
    }

    createObstacleView(dto: ObstacleDTO): ObstacleView {
        const obstacleView = new ObstacleView(this.scene, dto);
        this.obstacleViews.push(obstacleView);
        this.scene.add.existing(obstacleView);
        return obstacleView;
    }

    addNewObstacle(dto: ObstacleDTO): ObstacleView {
        this.obstacleData.push(dto);
        return this.createObstacleView(dto);
    }

    getAllObstacleViews(): ObstacleView[] {
        return this.obstacleViews;
    }

    getObstacleViewById(id: number): ObstacleView | undefined {
        return this.obstacleViews.find(obstacle => obstacle.obstacleData.id === id);
    }

    getObstacleDTOById(id: number): ObstacleDTO | undefined {
        return this.obstacleData.find(obstacle => obstacle.id === id);
    }

    updateObstacle(id: number, newData: Partial<ObstacleDTO>): void {
        const dto = this.getObstacleDTOById(id);
        if (dto) {
            Object.assign(dto, newData);
            this.updateObstacleView(dto);
        }
    }

    updateObstacleView(dto: ObstacleDTO): void {
        const obstacleView = this.getObstacleViewById(dto.id);
        if (obstacleView) {
            obstacleView.updateView();
        }
    }
}

export default ObstacleService;

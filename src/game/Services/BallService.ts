
import BallDTO from '../DTOs/BallDTO';
import BallController from '../Controllers/BallController';
import  BallView from '../Views/BallView';

export default class BallService { 
    public scene: any;
    public jsonPath: string;
    public controller: BallController;
    public ballViews: BallView[];

    constructor(scene: any, jsonPath: string) {
        this.scene = scene;
        this.jsonPath = jsonPath;
        this.controller = new BallController();
        this.ballViews = [];
    }

    async loadBalls(): Promise<BallDTO[]> {
        try {
            const response = await fetch(this.jsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            data.balls.forEach((ballData: any) => {
                const dto = new BallDTO(
                    ballData.id,
                    ballData.positionX,
                    ballData.positionY,
                    ballData.width,
                    ballData.height,
                    ballData.origin,
                    ballData.bounce,
                    ballData.friction,
                    ballData.levelNumber
                );
                this.controller.addBall(dto);
            });
            return this.controller.getAllBalls();
        } catch (error) {
            console.error("Error loading balls:", error);
            return [];
        }
    }

    async initialize(levelNumber: number): Promise<void> {
        const balls = await this.loadBalls();
        const specificBallDTO = balls.find(dto => dto.id === levelNumber);
        if (specificBallDTO) {
            this.createBallView(specificBallDTO);
        }
    }

    createBallView(dto: BallDTO): BallView {
        const ballView = new BallView(this.scene, dto);
        this.ballViews.push(ballView);
        return ballView;
    }

    updateBallView(dto: BallDTO): void {
        const ballView = this.ballViews.find(view => view.ballData.id === dto.id);
        if (ballView) {
            ballView.updateBall();
        }
    }

    updateBall(id: number, newData: Partial<BallDTO>): void {
        const currentBall = this.controller.getBallById(id);
        if (currentBall) {
            currentBall.positionX = newData.positionX ?? currentBall.positionX;
            currentBall.positionY = newData.positionY ?? currentBall.positionY;
            currentBall.velocity = newData.velocity ?? currentBall.velocity;

            this.controller.updateBall(id, currentBall);

            this.updateBallView(currentBall);
        }
}


    getAllBallViews(): BallView[] {
        return this.ballViews;
    }

    getBallViewById(id: number): BallView | undefined {
        return this.ballViews.find(view => view.ballData.id === id);
    }

    getBallDTOById(id: number): BallDTO | undefined {
        return this.controller.getBallById(id);
    }

    getAllBallDTOs(): BallDTO[] {
        return this.controller.getAllBalls();
    }
}

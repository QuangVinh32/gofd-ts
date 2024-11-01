import  BallDTO  from '../DTOs/BallDTO';

export default class BallController {
    private balls: BallDTO[]; 

    constructor() {
        this.balls = [];
    }

    addBall(dto: BallDTO): void {
        this.balls.push(dto);
    }

    getAllBalls(): BallDTO[] {
        return this.balls;
    }

    getBallById(id: number): BallDTO | undefined {
        return this.balls.find(ball => ball.id === id);
    }

    updateBall(id: number, newData: { positionX: number, positionY: number, velocity: { x: number; y: number } }): void {
        const ball = this.getBallById(id);
        if (ball != null) {
            ball.positionX = newData.positionX;
            ball.positionY = newData.positionY;
            ball.velocity = newData.velocity;
        }
    }
}

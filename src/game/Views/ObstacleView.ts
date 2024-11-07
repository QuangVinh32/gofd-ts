import Phaser from 'phaser';
import  ObstacleDTO  from '../DTOs/ObstacleDTO';

export default class ObstacleView extends Phaser.GameObjects.Container {
    private obstacle: Phaser.GameObjects.Rectangle;
    public obstacleData: ObstacleDTO;

    constructor(scene: Phaser.Scene, dto: ObstacleDTO) {
        super(scene);
        this.scene = scene;
        this.obstacleData = dto;
        this.createView();
    }

    createView(){
        const { pointA, pointB, height, color, alpha, isStatic, restitution } = this.obstacleData;

        const length = Phaser.Math.Distance.Between(pointA.x, pointA.y, pointB.x, pointB.y);

        const angle = Phaser.Math.Angle.Between(pointA.x, pointA.y, pointB.x, pointB.y);

        const normalX = Math.cos(angle + Math.PI / 2);
        const normalY = Math.sin(angle + Math.PI / 2);

        const offsetX = normalX * height / 2; 
        const offsetY = normalY * height / 2;

        const midPointX = (pointA.x + pointB.x) / 2;
        const midPointY = (pointA.y + pointB.y) / 2;

        this.obstacle = this.scene.add.rectangle(midPointX + offsetX, midPointY + offsetY, length, height, color, alpha);

        this.obstacle.setRotation(angle);
        this.obstacle.setOrigin(0, 0.5); 
        this.scene.matter.add.gameObject(this.obstacle, {

            shape: { type: 'rectangle', width: length, height: height },
            angle: angle,
            isStatic: isStatic,
            restitution: restitution,
        });
    }

    updateView(){
        const { pointA, pointB, height, color, alpha, isStatic, restitution } = this.obstacleData;

        const length = Phaser.Math.Distance.Between(pointA.x, pointA.y, pointB.x, pointB.y);
        const angle = Phaser.Math.Angle.Between(pointA.x, pointA.y, pointB.x, pointB.y);

        const normalX = Math.cos(angle + Math.PI / 2);
        const normalY = Math.sin(angle + Math.PI / 2);

        const offsetX = normalX * height / 2; 
        const offsetY = normalY * height / 2; 

        const midPointX = (pointA.x + pointB.x) / 2;
        const midPointY = (pointA.y + pointB.y) / 2;

        this.obstacle.setPosition(midPointX + offsetX, midPointY + offsetY);

        this.obstacle.width = length;
        this.obstacle.height = height;

        this.obstacle.setRotation(angle);
        this.obstacle.setOrigin(0, 0.5);

        this.obstacle.fillColor = color;
        this.obstacle.setAlpha(alpha);

        // Update physics properties
        // this.obstacle.isStatic = isStatic;
        // this.obstacle.restitution = restitution;
    }
}


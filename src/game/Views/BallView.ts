    import Phaser from 'phaser';
    import BallDTO from '../DTOs/BallDTO'; 

    export default class BallView extends Phaser.GameObjects.Container {
        public scene: Phaser.Scene; 
        public ballData: BallDTO;
        public phaserObject: Phaser.Physics.Matter.Image;
        public matterBody: MatterJS.Body; 

        constructor(scene: Phaser.Scene, ballData: BallDTO) {
            super(scene);
            this.scene = scene; 
            this.ballData = ballData;
            this.phaserObject = this.createBall(); 
            this.scene.add.existing(this); 
            this.matterBody = this.phaserObject.body as MatterJS.Body; 
        }

        createBall(): Phaser.Physics.Matter.Image {
            const ball = this.scene.matter.add.image(
                this.ballData.positionX,
                this.ballData.positionY,
                "ball"
            )
                .setDisplaySize(this.ballData.width, this.ballData.height)
                .setCircle(this.ballData.width / 2)
                .setBounce(this.ballData.bounce)
                .setFriction(this.ballData.friction)
                .setOrigin(0.5, 0.5)
                .setVelocity(this.ballData.velocity.x, this.ballData.velocity.y);

            this.add(ball);
            return ball;
        }

        updateBall(): void {
            this.phaserObject.setPosition(this.ballData.positionX, this.ballData.positionY);
            this.phaserObject.setVelocity(this.ballData.velocity.x, this.ballData.velocity.y);
        }
    }

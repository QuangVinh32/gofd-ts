    import Phaser from 'phaser'; 
    import BallService from '../Services/BallService'; 
    import DestinationService from '../Services/DestinationService';
    import LevelService from '../Services/LevelService';
    import ObstacleService from '../Services/ObstacleService';
    import UIScene from './UIScene';
    export class LevelsScene extends Phaser.Scene {
    private levelService: LevelService | null;
    private levelNumber: number;
    private launchCount: number;
    private ballService: BallService | null;
    private arrow: Phaser.GameObjects.Image | null;
    private arrowFill: Phaser.GameObjects.Image | null;
    private pressIndicator: Phaser.GameObjects.Image | null;
    private line: Phaser.GameObjects.Line | null;
    private cameraFollowingBall: boolean;
    private destinationService: DestinationService | null;
    private obstacleService: ObstacleService | null;
    private ballHitSound: Phaser.Sound.BaseSound | null;
    private starSound: Phaser.Sound.BaseSound | null;
    private levelWinSound: Phaser.Sound.BaseSound | null;
    private isDraggingBall: boolean;
    private startX: number;
    private startY: number;
    private dragStartPos: { x: number; y: number; };
    private score: number;
    private ballView: any;  
    private destinationView: any; 
    private static readonly VELOCITY_THRESHOLD = 0.0001;
    static PRESS_INDICATOR_IMAGE = 'press_indicator';
    private isDragging: boolean = false;
    private dashedLines: Phaser.GameObjects.Line[] = [];  // Khai báo mảng chứa các đoạn nét đứt



    isTweening: boolean;
    constructor() {
        super("Levels");
        this.levelNumber = 1;
        this.ballService = null;
        this.line = null;
        this.cameraFollowingBall = false;
        this.destinationService = null;
        this.obstacleService = null;
        this.ballHitSound = null;
        this.starSound = null;
        this.levelWinSound = null;
        this.isDraggingBall = false;
        this.startX = 0;
        this.startY = 0;
        this.score = 1200; 
    }
init(data: { levelNumber?: number }) {
    this.levelNumber = data.levelNumber || 1;
}
preload() {
    this.loadAssets();
}
async create() {

    this.launchCount = 0;
    this.score = 1200; 
    this.levelService = new LevelService(this, 'assets/data/level.json');
    await this.levelService.initialize(this.levelNumber);

    const levelView = this.levelService.getLevelViewById(this.levelNumber); 

    if (levelView) {

        const canvasSize = levelView.calculateCanvasSize();
        this.cameras.main.setBounds(0, 0, canvasSize.width, canvasSize.height);

        levelView.createBackground();



    }

    this.ballService = new BallService(this, "assets/data/ball.json");
    this.ballHitSound = this.sound.add("hit_ball");

    await this.ballService.initialize(this.levelNumber); 
    const ballDTO = this.ballService.getBallDTOById(this.levelNumber);
    if (ballDTO) {
        this.ballView = this.ballService.getBallViewById(this.levelNumber);
        if (this.ballView && this.ballView.phaserObject) {
            this.ballView.launch = 0; 
            this.score = 1200;
            this.followBall(this.ballView.phaserObject);
            this.ballView.phaserObject.setFixedRotation();
            // console.log("ballView ",this.ballView, "ballViewBody",this.ballView.phaserObject.body);
            this.isTweening = false;

            const ballWidth = this.ballView.phaserObject.width;
            const ballHeight = this.ballView.phaserObject.height;

            this.pressIndicator = this.add.image(this.ballView.phaserObject.x, this.ballView.phaserObject.y, 'press_indicator')
            .setOrigin(0.5, 0.5);
            this.pressIndicator.setDisplaySize(ballWidth / 2.7 , ballHeight / 2.7);


            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    if (this.pressIndicator && !this.isTweening) {
                        this.isTweening = true;
                        this.tweens.add({
                            targets: this.pressIndicator,
                            scaleX: 0.3,
                            scaleY: 0.3,
                            alpha: 0,
                            ease: 'Power2',
                            duration: 700,
                            yoyo: false,
                            repeat: 0,
                            onComplete: () => {
                                if (this.pressIndicator) {
                                    this.pressIndicator.setAlpha(0.8);
                                    this.pressIndicator.setScale(0.1);
                                }
                                this.isTweening = false;
                            }
                        });
                    }
                },
                loop: true
            });
            //

        }
    }
    else {
        console.warn("ballView.phaserObject is undefined.");
    }

    this.destinationService = new DestinationService(this, 'assets/data/destination.json');
    await this.destinationService.initialize(this.levelNumber);
    const destinationDTO = this.destinationService.getDestinationDTOById(this.levelNumber);
    console.log("des",destinationDTO)
    if (destinationDTO) {
        this.destinationView = this.destinationService.getDestinationViewById(this.levelNumber);
            // destinationDTO.alpha = 0;  // Modify alpha property if needed


    }
    
    this.obstacleService = new ObstacleService(this, "assets/data/obstacle.json");
    await this.obstacleService.initialize(this.levelNumber);

    this.starSound = this.sound.add("star");
    this.levelWinSound = this.sound.add("win_level");
    
    this.matter.world.on('collisionstart', (event: MatterJS.IEventCollision<any>) => {
        event.pairs.forEach((pair: any) => {
            const { bodyA, bodyB } = pair;
            if (this.ballView && this.destinationView &&
                ((bodyA === this.ballView.matterBody && bodyB === this.destinationView.matterBody) ||
                (bodyA === this.destinationView.matterBody && bodyB === this.ballView.matterBody    ))) 
            {
                    this.onLevelComplete();
            }
        });
    });        
    this.setupFlags();
    this.setupCameraInteractions(); 
    this.cameras.main.setZoom(1.5);
}

loadAssets() {
    for (let i = 1; i <= 18; i++) {
        this.load.image(`level${this.levelNumber}_${i}`, `assets/images/level${this.levelNumber}/bg_piece_${i.toString().padStart(2, '0')}.png`);
    }
    this.load.image("ball", "assets/images/ball.png");
    this.load.image("flag", "assets/images/flag.png");
    this.load.image("arrow", "assets/images/arrow.png");
    this.load.audio("hit_ball", "assets/audio/hit_ball.mp3");
    this.load.audio("win_level","assets/audio/win_level.mp3");
    this.load.audio("star","assets/audio/star.mp3");
    this.load.image("arrow_fill","/assets/images/arrow_fill.png");
    this.load.image("press_indicator","/assets/images/press_indicator.png");
}

followBall(phaserBall: Phaser.GameObjects.Image) {
    this.cameras.main.startFollow(phaserBall);
    this.cameraFollowingBall = true;
    this.setupBallInteraction(phaserBall);
}

setupFlags() {
    const flagPositions = this.getFlagPositions(this.levelNumber);
    flagPositions.forEach(pos => {
        const flag = this.add.image(pos.x, pos.y, "flag").setDisplaySize(30, 50);

    });
}
    
getFlagPositions(level: number): { x: number; y: number }[] {
    const flagPositions: {
        default: { x: number; y: number; }[]; [key: number]: { x: number; y: number }[] 
    } = {
        1: [{ x: 1160, y: 322 }, { x: 1073, y: 275 }],
        2: [{ x: 1262, y: 410 }, { x: 1163, y: 455 }],
        3: [{ x: 1510, y: 210 }, { x: 1220, y: 50  }],
        default: [{ x: 100, y: 100 }, { x: 150, y: 79 }]
    };
    return flagPositions[level] || flagPositions.default;
}

setupBallInteraction(phaserBall: Phaser.GameObjects.Image) {
    phaserBall.setInteractive();
    this.input.setDraggable(phaserBall);
    this.input.on('dragstart', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) => {
        this.onDragStart(pointer, gameObject);
        this.isDraggingBall = true; 
    });

    this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) => {
        this.onDrag(pointer, gameObject);
    });

    this.input.on('dragend', (pointer: Phaser.Input.Pointer, gameObject: any) => {
        this.onDragEnd(pointer, gameObject);
        this.isDraggingBall = false; 
    });

}
onDragStart(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    this.isDraggingBall = true; 
    this.dragStartPos = { x: gameObject.x, y: gameObject.y };
    
    const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

    this.arrow = this.add.image(gameObject.x, gameObject.y, 'arrow')
        .setOrigin(0.5, 0.5)
        .setDisplaySize(50, 8);

    this.arrowFill = this.add.image(gameObject.x, gameObject.y, 'arrow_fill')
        .setOrigin(0.5, 0.5)
        .setDisplaySize(50, 8);
    // this.line = this.add.line(0, 0, gameObject.x, gameObject.y, worldPoint.x, worldPoint.y, 0x000000);
    // this.line.setLineWidth(2);
    this.cameras.main.stopFollow();
}
onDrag(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

    const dx = worldPoint.x - gameObject.x;
    const dy = worldPoint.y - gameObject.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const offsetDistance = 10;

    const stepSize = 5;  
    const stepAmount = Math.ceil(distance / stepSize)

    let startX = gameObject.x + (dx / distance) * offsetDistance;
    let startY = gameObject.y + (dy / distance) * offsetDistance;
    if (this.dashedLines) {
        this.dashedLines.forEach(line => line.destroy());
    } 
    this.dashedLines = [];  
    for (let i = 0; i < stepAmount; i++) {
        const targetX = startX + (dx / distance) * stepSize;
        const targetY = startY + (dy / distance) * stepSize;
        if (i % 2 === 0) {
            const line = this.add.line(0, 0, startX, startY, targetX, targetY, 0x000000);
            line.setLineWidth(2);
            this.dashedLines.push(line);
        }
        startX = targetX;
        startY = targetY;
    } 

    if (this.arrow && this.arrowFill) {
        const dx = worldPoint.x - gameObject.x;
        const dy = worldPoint.y - gameObject.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const fixedArrowDistance = 25;
        const angle = Phaser.Math.Angle.Between(gameObject.x, gameObject.y, worldPoint.x, worldPoint.y);

        const arrowX = gameObject.x - Math.cos(angle) * fixedArrowDistance;
        const arrowY = gameObject.y - Math.sin(angle) * fixedArrowDistance;

        this.arrow.setPosition(arrowX, arrowY).setRotation(angle + Math.PI);
        this.arrowFill.setPosition(arrowX, arrowY).setRotation(angle + Math.PI);

        const maxDistance = 200;
        const percentage = Phaser.Math.Clamp(distance / maxDistance, 0, 1);

        const cropWidth = 200 * percentage; 
        this.arrowFill.setCrop(0, 0, cropWidth, 33); 
          
    }
}

onDragEnd(pointer: Phaser.Input.Pointer, gameObject:LaunchableSprite) {
    this.isDraggingBall = false;

    const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
    const directionX = worldPoint.x - gameObject.x;
    const directionY = worldPoint.y - gameObject.y;

    const velocityX = -directionX * 0.1;
    const velocityY = -directionY * 0.1;

    if (gameObject.body) {
        gameObject.setVelocity(velocityX, velocityY);
    } else {
        console.error("gameObject body is null or undefined.");
    }

    this.cameraFollowingBall = true;
    this.cameras.main.startFollow(gameObject);




    this.score -= 100; 
    console.log(`Launch count: ${gameObject.launch}`);
    console.log(`Score: ${this.score}`); 

    if (!gameObject.launch) {
        gameObject.launch = 0;
    }
    gameObject.launch += 1;
    console.log(`Launch count: ${gameObject.launch}`);

    const uiScene = this.scene.get('uiScene') as UIScene;
    if (uiScene) {
        uiScene.updateLaunchCount(gameObject.launch);
    }
    if (this.dashedLines) {
        this.dashedLines.forEach(line => line.destroy());  
        this.dashedLines = [];  
    }

    if (this.line) {
        this.line.destroy();
        this.line = null;
    }
    if (this.arrow) {
        this.arrow.destroy(); 
        this.arrow = null;
    }
    if (this.arrowFill ){
        this.arrowFill.destroy(); 
        this.arrowFill = null;
    }
    this.ballHitSound?.play();

}
 
setupCameraInteractions() {
    this.input.on('pointerdown', (pointer: { x: number; y: number; }) => {
        if (!this.isDraggingBall) { 
            this.startX = pointer.x;
            this.startY = pointer.y;
        }
    });

    this.input.on('pointermove', (pointer: { isDown: any; }) => {
        if (pointer.isDown) {
            if (!this.isDraggingBall) { 
                this.handleCameraMovement(pointer);
            }
        }
    });
} 

handleCameraMovement(pointer: { isDown?: any; x?: any; y?: any; }) {
    const dx = pointer.x - this.startX;
    const dy = pointer.y - this.startY;
    const camera = this.cameras.main;

    camera.scrollX -= dx / camera.zoom;
    camera.scrollY -= dy / camera.zoom;

    this.startX = pointer.x;
    this.startY = pointer.y;

    if (this.cameraFollowingBall) {
        this.cameras.main.stopFollow();
        this.cameraFollowingBall = false;
    }   
}

onLevelComplete(): void {
    const score = this.calculateScore(); 
    const launchCount = this.getLaunchCount(); 
    const stars = this.calculateStars();
    this.starSound?.play();
    this.levelWinSound?.play();
    this.scene.launch("scoreboard", { score, launchCount, levelNumber: this.levelNumber, stars });

}
calculateScore(): number {
    return this.score;
}
getLaunchCount(): number {
    return this.launchCount; 
}
calculateStars(): number {
    if (this.score >= 1000) {
        return 3; 
    } else if (this.score >= 500) {
        return 2; 
    }
    return 1;
}
checkBallMotion() {
    // Đảm bảo ballView và body có sẵn trước khi truy cập vào velocity
    if (this.ballView && this.ballView.phaserObject.body) {
        // console.log("ballView in checkBallMotion",this.ballView, "ballViewBody in checkBallMotion",this.ballView.phaserObject.body);
        const velocity = this.ballView.phaserObject.body.velocity;
        const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y); // Tính tốc độ
        
        if (this.isDragging) {
            // Nếu đang kéo bóng, ẩn chỉ báo nhấn
            if (this.pressIndicator) {
                this.pressIndicator.setVisible(false);
            }
        } else if (speed < LevelsScene.VELOCITY_THRESHOLD) {
            // Nếu bóng đang đứng yên, hiển thị chỉ báo nhấn
            if (this.pressIndicator) {
                this.pressIndicator.setVisible(true);
                this.pressIndicator.setPosition(this.ballView.phaserObject.x, this.ballView.phaserObject.y); // Đặt vị trí của chỉ báo
                // console.log("speed")
            }
        } else {
            // Nếu bóng đang di chuyển, ẩn chỉ báo nhấn
            if (this.pressIndicator) {
                this.pressIndicator.setVisible(false);
            }
        }
    } else {
        console.log("Ball view hoặc body của bóng là null hoặc không xác định.");
    }
    
}
  
    update() {
        this.checkBallMotion();



    }
    }
        
    

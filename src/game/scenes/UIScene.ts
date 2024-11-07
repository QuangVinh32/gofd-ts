import Phaser from 'phaser';
import SettingService from '../Services/SettingService';
interface BallView {
  phaserObject: {
    x: number;
    y: number;
  };
}

interface LevelScene extends Phaser.Scene {
  ballService: {
    getBallViewById: (levelNumber: number) => BallView | null;
  };
  levelNumber: number;
}

export class UIScene extends Phaser.Scene {
  private settingService: SettingService | null = null; 
  private launchCount: number = 0;
  private launchText!: Phaser.GameObjects.Text;
  private textContainer!: Phaser.GameObjects.Container;
  private levelNumber: number;


  constructor() {
    super("uiScene");
  }

  preload() {
    this.load.image("but_exit", "assets/images/but_exit.png");
    this.load.image("but_restart_small", "assets/images/but_restart_small.png");
    this.load.image("but_centre_view", "assets/images/but_centre_view.png");
  }
  init(data: { levelNumber?: number }) {
    this.levelNumber = data.levelNumber || 1;
    console.log("ui",this.levelNumber)
}

  async create() {
    const settingId = 3;
    this.settingService = new SettingService(this, "assets/data/setting.json");
    await this.settingService.initialize(settingId);

    let isTweening = false;
    let textPar = this.add.text(15, 20, "PAR: 3", { font: "22px Arial", color: "Yellow" });
    this.launchText = this.add.text(250, 15, 'Launch: 0', { fontSize: '30px', color: 'Yellow' });
    let textHole = this.add.text(560, 460, "HOLE: 1", { font: "22px Arial", color: "Yellow" });
    this.textContainer = this.add.container(0, 0, [textPar, this.launchText, textHole]);      

    let exitButton = this.add.image(620, 40, 'but_exit')
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .setDisplaySize(55, 55);
    exitButton.on('pointerdown', () => {
      if (!isTweening) {
        isTweening = true;
        this.tweens.add({
          targets: exitButton,
          scaleX: 0.5,
          scaleY: 0.5,
          ease: 'Power1',
          duration: 150,
          yoyo: true,
          onComplete: () => {
            isTweening = false;
        // Khởi chạy `Choice` ở chế độ overlay mà không dừng các cảnh khác
        this.scene.launch("Choice",{levelNumber: this.levelNumber});

        // Đảm bảo rằng cảnh `Choice` được đặt ở chế độ overlay
        this.scene.bringToTop("Choice");  // Đưa Choice lên trên cùng nếu cần

          }
        });
      }
    });

    let restartSmallButton = this.add.image(560, 40, 'but_restart_small')
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .setDisplaySize(55, 55);
    restartSmallButton.on('pointerdown', () => {
      if (!isTweening) {
        isTweening = true;
        this.tweens.add({
          targets: restartSmallButton,
          scaleX: 0.5,
          scaleY: 0.5,
          ease: 'Power1',
          duration: 150,
          yoyo: true,
          onComplete: () => {
            isTweening = false;
            this.scene.start("startGame");
          }
        });
      }
    });

    let centreViewButton = this.add.image(50, 460, 'but_centre_view')
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .setDisplaySize(55, 55);

    centreViewButton.on('pointerdown', () => {
      if (!isTweening) {
        isTweening = true;
        this.tweens.add({
          targets: centreViewButton,
          scaleX: 0.5,
          scaleY: 0.5,
          ease: 'Power1',
          duration: 100,
          yoyo: true,
          onComplete: () => {
            isTweening = false;

            const levelScene = this.scene.get('Levels') as LevelScene;
            console.log("Level Scene:", levelScene);

            if (levelScene && levelScene.ballService) {
              const ballView = levelScene.ballService.getBallViewById(levelScene.levelNumber);
              console.log("Ball view:", ballView);

              if (ballView) {
                const camera = levelScene.cameras.main;
                console.log("Camera:", camera);

                console.log("Ball coordinates:", ballView.phaserObject.x, ballView.phaserObject.y);

                camera.pan(ballView.phaserObject.x, ballView.phaserObject.y, 1000, 'Power2');
              } else {
                console.warn("Ball not found!");
              }
            } else {
              console.warn("Scene or ballService does not exist.");
            }
          }
        });
      }
    });
  }

  updateLaunchCount(newLaunchCount: number) {
    this.launchCount = newLaunchCount;
    this.launchText.setText(`Launch: ${this.launchCount}`);  
  }
}

export default UIScene;

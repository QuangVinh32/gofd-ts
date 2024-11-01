import { Scene, Game, GameObjects, Tweens } from 'phaser';
import SettingService from "../Services/SettingService"

class MainScene extends Scene {
  private settingService!: SettingService; 
  private bgMenu!: GameObjects.Image; 
  private menuTextMiniGolf!: GameObjects.Image; 
  private menuTextWorld!: GameObjects.Image; 
  private continueButton!: GameObjects.Image; 
  private playButton!: GameObjects.Image; 
  constructor() {
      super("playGame");
  }

  preload(): void {
      this.load.image("bg_menu", "assets/images/bg_menu.png");
      this.load.image("menu_text_world", "assets/images/menu_text_world.png");
      this.load.image("menu_text_minigolf", "assets/images/menu_text_minigolf.png");
      this.load.image("but_continue", "assets/images/but_continue.png");
      this.load.image("but_play", "assets/images/but_play.png");
      this.load.spritesheet("audio", "assets/images/audio_icon_spritesheet.png", {
          frameWidth: 128,
          frameHeight: 128,
      });
  }

  async create(): Promise<void> {
      this.bgMenu = this.add.image(0, 0, 'bg_menu').setOrigin(0, 0).setDisplaySize(this.game.config.width as number, this.game.config.height as number);

      function addAndTweenImage(scene: Phaser.Scene, key: string, startX: number, startY: number, endX: number, endY: number, width: number, height: number) {
        const image = scene.add.image(startX, startY, key)
            .setOrigin(0, 0)
            .setDisplaySize(width, height)
            .setAngle(-4)
            .setInteractive();
    
        scene.tweens.add({
            targets: image,
            x: endX,
            y: endY,
            duration: 2000,
            ease: 'Sine.easeInOut',
            repeatDelay: 1000,
            delay: 1000
        });
    }
    
    addAndTweenImage(this, "menu_text_minigolf", -750, 655, 0, 70, 400, 280);
    addAndTweenImage(this, "menu_text_world", 800, -250, 150, 180, 300, 200);
        

      this.continueButton = this.add.image(400, 287, "but_continue")
          .setOrigin(0, 0)
          .setDisplaySize(150, 350)
          .setInteractive();

      this.playButton = this.add.image(313, 352, "but_play")
          .setOrigin(0, 0)
          .setDisplaySize(150, 350)
          .setInteractive();

      const settingId = 1;
      this.settingService = new SettingService(this, "assets/data/setting.json");
      await this.settingService.initialize(settingId);

      this.playButton.on('pointerdown', () => {
          this.handleButtonClick(this.playButton, "LevelMenu");
      });

      this.continueButton.on('pointerdown', () => {
          this.handleButtonClick(this.continueButton, "LevelMenu");
      });
  }

  handleButtonClick(button: GameObjects.Image, sceneKey: string): void {
      this.tweens.add({
          targets: button,
          y: button.y + 15,
          duration: 100,
          ease: 'Power2',
          yoyo: true,
          onComplete: () => {
              this.cameras.main.fadeOut(250);
              this.cameras.main.once('camerafadeoutcomplete', () => {
              this.scene.start(sceneKey);
              console.log("1")
              });
          }
      });
  }

  update(): void {
  }
}

export default MainScene;

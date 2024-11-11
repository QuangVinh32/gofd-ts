import Phaser from 'phaser';
import PlayerLevelResultService from '../Services/PlayerLevelResultService';
import SettingService from "../Services/SettingService"

export default class MenuLevelScene extends Phaser.Scene {
    private levelResultService: PlayerLevelResultService;
    private settingService!: SettingService; 
    private isTweening: boolean = false;
    private levelNumber: number = 1;

    constructor() {
        super("LevelMenu");
        this.levelResultService = new PlayerLevelResultService();
    }

    preload(): void {
        this.load.image("bg_menu", "assets/images/bg_menu.png");
        this.load.image("menu_text_world", "assets/images/menu_text_world.png");
        this.load.image("menu_text_minigolf", "assets/images/menu_text_minigolf.png");
        this.load.image("but_continue", "assets/images/but_continue.png");
        this.load.image("but_play", "assets/images/but_play.png");
        this.load.image("but_exit", "assets/images/but_exit.png");
        this.load.spritesheet('but_level', 'assets/images/but_level_spritesheet.png', {
            frameWidth: 128,
            frameHeight: 129
        });
        this.load.spritesheet("star", "assets/images/star.png", {
            frameWidth: 84,
            frameHeight: 84,
        });
        this.load.spritesheet('audio_icon', 'assets/images/audio_icon_spritesheet.png', {
            frameWidth: 128,
            frameHeight: 129
        });
    }
    init(data: { levelNumber?: number }) {
        this.levelNumber = data.levelNumber || 1;
        console.log("menulevel", this.levelNumber);
    }

    async create(): Promise<void> {
        this.add.image(0, 0,'bg_menu')
            .setOrigin(0, 0)
            .setDisplaySize(this.game.config.width as number, this.game.config.height as number);

        let darkOverlay = this.add.graphics();
        darkOverlay.fillStyle(0x000000, 0.6);
        darkOverlay.fillRect(0, 0, this.game.config.width as number, this.game.config.height as number);
        this.add.text(210, 40, "SELECT A LEVEL", { font: "30px Arial", color: "Yellow" });

        const settingId = 2;
        this.settingService = new SettingService(this, "assets/data/setting.json");
        await this.settingService.initialize(settingId);

        let exitButton = this.add.image(620, 40, 'but_exit')
            .setInteractive()
            .setOrigin(0.5, 0.5)
            .setDisplaySize(55, 55);
            exitButton.on('pointerdown', () => {
            if (!this.isTweening) {
                this.isTweening = true;
                this.tweens.add({
                targets: exitButton,
                scaleX: 0.5,
                scaleY: 0.5,
                ease: 'Power1',
                duration: 150,
                yoyo: true,
                onComplete: () => {
                    this.isTweening = false;
                    this.scene.start("playGame");

                }
                });
            }
            });

        const levelResults = JSON.parse(localStorage.getItem("levelResults") || "{}");
        // Tính tổng điểm
        let totalScore = 0;
        let highestLevelUnlocked = this.getHighestLevelUnlocked();
        console.log("Highest level unlocked:", highestLevelUnlocked);

        let results = this.levelResultService.getAllResults();
        console.log("lấy tất cả kết quả", results)

        for (let i = 1; i <= highestLevelUnlocked; i++) {
        const levelData = levelResults[i] || [];
        const score = levelData[2] || 0;  // Giả định điểm cao nhất là phần tử thứ 3 (index 2)
            totalScore += score;
        }
        // Hiển thị tổng điểm
        this.add.text(230, 450, "TOTAL SCORE:", { font: "20px Arial", color: "yellow" });
        this.add.text(380, 450, totalScore.toString(), { font: "20px Arial", color: "yellow" });

        let buttonGroup = this.add.container(40, 140);
        for (let i = 1; i <= 18; i++) {
            let butLevel = this.add.sprite(0, 0, 'but_level')
                .setInteractive()
                .setOrigin(0.5, 0.5)
                .setDisplaySize(60, 60);
        
            let singleButtonGroup = this.add.container((i - 1) % 6 * 90, Math.floor((i - 1) / 6) * 120);
        
            const isUnlocked = i <= highestLevelUnlocked; 
        
            butLevel.setFrame(isUnlocked ? 0 : 1);
        
            let numberOfLevels = this.add.text(0, 0, i.toString(), { font: "20px Arial Bold", color: "yellow" }).setOrigin(0.5, 0.5);
            singleButtonGroup.add(butLevel);
            singleButtonGroup.add(numberOfLevels);
        
        
            if (isUnlocked) {
                const levelData = levelResults[i] || [];
                const score = levelData[2] || 0;
                const stars = levelData[3] || 0;

                for (let j = 1; j <= 3; j++) {
                    let starFrame = j <= stars ? 0 : 1;
                    let star = this.add.sprite((j - 2) * 17, -25, 'star')
                        .setFrame(starFrame)
                        .setOrigin(0.5, 0.5)
                        .setDisplaySize(20, 20);
                    singleButtonGroup.add(star);
                }

            let scoreText = this.add.text(0, 40, score.toString(), { font: "15px Arial Bold", color: "yellow" }).setOrigin(0.5, 0.5);
            singleButtonGroup.add(scoreText);
            } else {
                for (let j = 1; j <= 3; j++) {
                    let star = this.add.sprite((j - 2) * 17, -25, 'star')
                        .setFrame(1)
                        .setOrigin(0.5, 0.5)
                        .setDisplaySize(20, 20);
                    singleButtonGroup.add(star);
                }
            }
        if (i === highestLevelUnlocked) {
            this.tweens.add({
                targets: singleButtonGroup,
                scaleY: 1.1,
                scaleX: 1.1,
                ease: 'Sine.easeInOut',
                duration: 500,
                yoyo: true,
                repeat: -1 
            });
        }

    if (isUnlocked) {
        butLevel.on('pointerdown', () => {
            console.log(`Button for Level ${i} clicked.`);
            if (!this.isTweening) {
                this.isTweening = true;
                this.tweens.add({
                    targets: singleButtonGroup,
                    scaleY: 1.1,
                    scaleX: 1.1,
                    ease: 'Power1',
                    duration: 200,
                    yoyo: true,
                    repeat: 0,
                    onComplete: () => {
                        this.isTweening = false;
                    }
                });
                this.startGame(i);
            }
        });
    }
        
            buttonGroup.add(singleButtonGroup);
        }

        buttonGroup.x += 50;
    }

    startGame(level: number): void {
        this.cameras.main.fadeOut(250); 
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.isTweening = false;            
            this.scene.stop("LevelMenu");
            this.scene.start("Levels", { levelNumber: level });
            this.scene.launch("uiScene", { levelNumber: level });
        });
    }
    
    

    getHighestLevelUnlocked(): number {
        const highestLevel = localStorage.getItem('highestLevelUnlocked');
        let levelUnlocked = highestLevel ? parseInt(highestLevel, 10) : 1;   
        return levelUnlocked;
    }

   
}

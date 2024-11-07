import Phaser from 'phaser';
import PlayerLevelResultService from '../Services/PlayerLevelResultService';
export default class MenuLevelScene extends Phaser.Scene {
    private levelResultService: PlayerLevelResultService;
    private isTweening: boolean = false;

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

    create(): void {

        this.add.image(0, 0, 'bg_menu')
            .setOrigin(0, 0)
            .setDisplaySize(this.game.config.width as number, this.game.config.height as number);

        let darkOverlay = this.add.graphics();
        darkOverlay.fillStyle(0x000000, 0.6);
        darkOverlay.fillRect(0, 0, this.game.config.width as number, this.game.config.height as number);

        this.add.text(210, 40, "SELECT A LEVEL", { font: "30px Arial", color: "Yellow" });
        this.add.text(230, 450, "TOTAL SCORE:", { font: "20px Arial", color: "yellow" });

        let buttonGroup = this.add.container(40, 140);

        const highestLevelUnlocked = this.getHighestLevelUnlocked();
        console.log("Highest level unlocked:", highestLevelUnlocked);
        
        for (let i = 1; i <= 18; i++) {
            let butLevel = this.add.sprite(0, 0, 'but_level')
                .setInteractive()
                .setOrigin(0.5, 0.5)
                .setDisplaySize(60, 60);
        
            let singleButtonGroup = this.add.container((i - 1) % 6 * 90, Math.floor((i - 1) / 6) * 120);
        
            const isUnlocked = i <= highestLevelUnlocked; // Unlock based on highest level only
        
            // Set button frame depending on whether it's unlocked
            butLevel.setFrame(isUnlocked ? 0 : 1);
        
            // Display level number on button
            let numberOfLevels = this.add.text(0, 0, i.toString(), { font: "20px Arial Bold", color: "yellow" }).setOrigin(0.5, 0.5);
            singleButtonGroup.add(butLevel);
            singleButtonGroup.add(numberOfLevels);
        
            // Display stars and score if level is unlocked
            if (isUnlocked) {
                let levelResult = this.levelResultService.getResult(i);
                let score = levelResult ? levelResult.highestScore : 0;
                let stars = levelResult ? levelResult.highestStar : 0;

                for (let j = 1; j <= 3; j++) {
                    let starFrame = j <= stars ? 0 : 1;
                    let star = this.add.sprite((j - 2) * 17, -25, 'star')
                        .setFrame(starFrame)
                        .setOrigin(0.5, 0.5)
                        .setDisplaySize(20, 20);
                    singleButtonGroup.add(star);
                }

                // Display score
                let scoreText = this.add.text(0, 40, score.toString(), { font: "15px Arial Bold", color: "yellow" }).setOrigin(0.5, 0.5);
                singleButtonGroup.add(scoreText);
            } else {
                // Display locked stars (faded)
                for (let j = 1; j <= 3; j++) {
                    let star = this.add.sprite((j - 2) * 17, -25, 'star')
                        .setFrame(1) // Locked star frame
                        .setOrigin(0.5, 0.5)
                        .setDisplaySize(20, 20);
                    singleButtonGroup.add(star);
                }
            }
        
            // Set button interaction if level is unlocked
            if (isUnlocked) {
                butLevel.on('pointerdown', () => {
                    console.log(`Button for Level ${i} clicked.`);
                    if (!this.isTweening) {
                        this.isTweening = true;
                        this.tweens.add({
                            targets: singleButtonGroup,
                            scaleY: 0.8,
                            scaleX: 0.8,
                            ease: 'Power1',
                            duration: 100,
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
        const exitButton = this.add.image(860, 45, 'but_exit')
            .setInteractive()
            .setOrigin(0.5, 0.5)
            .setDisplaySize(70, 70);

        exitButton.on('pointerdown', () => {
            this.scene.stop();
        });
    }

    startGame(level: number): void {
        this.scene.start("Levels", { levelNumber: level });
        this.scene.start("uiScene", { levelNumber: level });
        this.scene.stop("LevelMenu", { levelNumber: level });
    }

    getHighestLevelUnlocked(): number {
        const highestLevel = localStorage.getItem('highestLevelUnlocked');
        let levelUnlocked = highestLevel ? parseInt(highestLevel, 10) : 1;
        return levelUnlocked; // Only return the highest level unlocked from localStorage
    }
}
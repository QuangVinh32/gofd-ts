import Phaser from 'phaser';
class ChoiceScene extends Phaser.Scene {
    private isTweening: boolean;
    private levelNumber: number;

    constructor() {
        super("Choice");
        this.isTweening = false;
        this.levelNumber = 1;
    }

    preload() {
        this.load.image("msg_box", "assets/images/msg_box.png");
        this.load.image("but_exit", "assets/images/but_exit.png");
        this.load.image("but_yes", "assets/images/but_yes.png");
    }

    init(data: { levelNumber?: number }) {
        this.levelNumber = data.levelNumber || 1;
        console.log("choice", this.levelNumber);
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Dark overlay for the modal effect
        const darkOverlay = this.add.graphics();
        darkOverlay.fillStyle(0x000000, 0.6);
        darkOverlay.fillRect(0, 0, this.scale.width, this.scale.height);

        // Message box setup
        const scoreBoard = this.add.image(centerX, centerY, "msg_box")
            .setInteractive()
            .setOrigin(0.5, 0.5)
            .setDisplaySize(420, 320);

        // Exit button setup
        const exitButton = this.add.image(280, 320, "but_exit")
            .setInteractive()
            .setOrigin(0.5, 0.5)
            .setDisplaySize(70, 70);

        this.tweens.add({
            targets: exitButton,
            scaleX: 0.6,
            scaleY: 0.6,
            ease: 'Power1',
            duration: 1000,
            yoyo: true,
            repeat: -1,
        });

        exitButton.on('pointerdown', () => {
            this.scene.stop('Choice');
        });

        const yesButton = this.add.image(375, 320, "but_yes")
            .setInteractive()
            .setOrigin(0.5, 0.5)
            .setDisplaySize(70, 70);

        yesButton.on('pointerdown', () => {
            if (!this.isTweening) {
                this.isTweening = true;
                this.tweens.add({
                    targets: yesButton,
                    scaleX: 0.6,
                    scaleY: 0.6,
                    ease: 'Power1',
                    duration: 100,
                    yoyo: true,
                    repeat: 0,
                    onComplete: () => {
                        this.isTweening = false;
                        this.cameras.main.fadeOut(250);
                        this.cameras.main.once('camerafadeoutcomplete', () => {
                            const levelNumber = this.levelNumber;
                            this.scene.stop("Levels", { levelNumber})
                            this.scene.start("playGame",{levelNumber}); 
                            this.scene.stop('uiScene'); 
                            this.scene.stop('Choice',{levelNumber}); 
                        });
                    }
                });
            }
        });

        const completeText1 = this.add.text(180, 150, "ARE YOU SURE YOU WANT", { font: "22px Arial", color: "yellow" });
        const scoreText = this.add.text(215, 200, "TO QUIT THE GAME?", { font: "22px Arial", color: "yellow" });
    }
}

export default ChoiceScene;

import Phaser from "phaser";
export default class ScoreboardView {
private scene: Phaser.Scene;
constructor(scene: Phaser.Scene) {
    this.scene = scene;
}

createScoreboard(score: number, launchCount: number): void {
    const centerX = this.scene.cameras.main.width / 2;
    const centerY = this.scene.cameras.main.height / 2;

    let darkOverlay = this.scene.add.graphics();
    darkOverlay.fillStyle(0x000000, 0.6);
    darkOverlay.fillRect(0, 0, this.scene.game.config.width as number, this.scene.game.config.height as number);

    let scoreBoard = this.scene.add.image(centerX, centerY, "msg_box")
        .setInteractive()
        .setOrigin(0.5, 0.5)
        .setDisplaySize(420, 300);

    let restartBigButton = this.scene.add.image(280, 320, "but_restart_big")
        .setInteractive()
        .setOrigin(0.5, 0.5)
        .setDisplaySize(70, 70);
    restartBigButton.on('pointerdown', () => this.scene.events.emit('restartGame'));

    let continueBigButton = this.scene.add.image(375, 320, "but_continue_big")
        .setInteractive()
        .setOrigin(0.5, 0.5)
        .setDisplaySize(70, 70);
    continueBigButton.on('pointerdown', () => this.scene.events.emit('resumeGame'));

    this.scene.add.text(260, 200, "COMPLETE", { font: "23px Arial", color: "yellow" });
    this.scene.add.text(230, 250, "SCORE:", { font: "17px Arial", color: "yellow" });
    this.scene.add.text(370, 250, score.toString(), { font: "17px Arial", color: "yellow" });

    this.displayStars(score, centerX, centerY - 40);
}

displayStars(score: number, centerX: number, centerY: number): void {
    const starFrames = this.updateStarFrames(score);
    
    for (let i = 0; i < starFrames.length; i++) {
        let star = this.scene.add.sprite(centerX - 60 + i * 60, centerY - 50, "star")
            .setFrame(starFrames[i])
            .setOrigin(0.5, 0.5)
            .setDisplaySize(20, 20);

        this.scene.tweens.add({
            targets: star,
            scale: { from: 0, to: 0.7 },
            alpha: { from: 0, to: 1},
            ease: "Bounce",
            duration: 1000,
            delay: i * 200,
        });
    }
}

updateStarFrames(score: number): number[] {
    if (score > 900) {
        return [0, 0, 0];
    } else if (score >= 600) {
        return [0, 0, 1];
    } else if (score >= 300) {
        return [0, 1, 1];
    } else {
        return [1, 1, 1];
    }
}
}
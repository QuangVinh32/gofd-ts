import PlayerLevelResultDTO from "../DTOs/PlayerLevelResultDTO";
import PlayerLevelResultService from "../Services/PlayerLevelResultService";
import PlayerLevelResultController from "../Controllers/PlayerLevelResultController";
import ScoreboardView from "../Views/PlayerLevelResultView";

export class ScoreboardScene extends Phaser.Scene {
    private controller: PlayerLevelResultController;
    private scoreboardView: ScoreboardView;
    private scoreValue: number = 0;
    private launchCount: number = 1;
    private levelNumber: number;
    private highestScore: number = 0;
    private highestStar: number = 0;
    private isUnlocked: boolean = false;
    private isHoleAchieved: boolean = false;

    constructor() {
        super("scoreboard");
        const service = new PlayerLevelResultService(); 
        this.controller = new PlayerLevelResultController(service);
        this.scoreboardView = new ScoreboardView(this);
    }

    init(data: { score: number; launchCount: number; levelNumber: number; stars: number }) {
        this.scoreValue = data.score;
        this.launchCount = data.launchCount;
        this.levelNumber = data.levelNumber;
        this.highestStar = data.stars;
        console.log("Initialized with levelNumber:", this.levelNumber);
    }

    preload(): void {
        this.load.image("msg_box", "assets/images/msg_box.png");
        this.load.image("but_continue_big", "assets/images/but_continue_big.png");
        this.load.image("but_restart_big", "assets/images/but_restart_big.png");
        this.load.spritesheet("star", "assets/images/star.png", {
            frameWidth: 84,
            frameHeight: 84,
        });

    }

    create(): void {
        console.log("Creating scoreboard scene for level:", this.levelNumber);
        this.setupScoreboard();
        this.registerEvents();
    }

    setupScoreboard(): void {
        console.log("Current Level Number:", this.levelNumber);
        this.scoreboardView.createScoreboard(this.scoreValue, this.launchCount);

        let result = this.controller.getResult(this.levelNumber);
        console.log("Result fetched for level:", this.levelNumber, "Result:", result);

        if (!result) {
            console.log("Creating new result for level:", this.levelNumber);
            result = new PlayerLevelResultDTO(
                this.scoreValue,
                this.launchCount,
                this.highestScore,
                this.highestStar,
                this.isUnlocked,
                this.isHoleAchieved,
                this.levelNumber
            );
        } else {

            result.updateHighestScore(this.scoreValue);
            result.updateHighestStar(this.highestStar);
        }

        console.log("Updated score for level", this.levelNumber, "New highest score:", result.highestScore, "New highest stars:", result.highestStar);
        this.controller.addResult(this.levelNumber, result);
    }

    registerEvents(): void {
        this.events.on("restartGame", this.restartGame.bind(this));
        this.events.on("resumeGame", this.resumeGame.bind(this));
    }

    restartGame(): void {
    this.scene.stop("scoreboard");
    console.log("Game restarting...");
    }

    resumeGame(): void {
        const nextLevelNumber = this.levelNumber + 1;
        console.log(`Resuming to level ${nextLevelNumber}...`);

        const initialScore = this.controller.getResult(this.levelNumber)?.highestScore || 0; 
        const initialStars = this.controller.getResult(this.levelNumber)?.highestStar || 0;
        const launchCount = this.launchCount + 1;
        this.scene.start("Levels", { levelNumber: nextLevelNumber, score: initialScore, launchCount: launchCount, stars: initialStars });
    }
}

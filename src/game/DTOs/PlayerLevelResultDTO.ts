export default class PlayerLevelResultDTO {
    constructor(
        public score: number,
        public launchCount: number,
        public highestScore: number,
        public highestStar: number,
        public isUnlocked: boolean,
        public isHoleAchieved: boolean,
        public levelNumber: number
    ) {}

    updateHighestScore(newScore: number) {
        if (newScore > this.highestScore) {
            this.highestScore = newScore;
        }
    }

    updateHighestStar(newStarCount: number) {
        if (newStarCount > this.highestStar) {
            this.highestStar = newStarCount;
        }
    }
}

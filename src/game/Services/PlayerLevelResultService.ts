import PlayerLevelResultDTO from "../DTOs/PlayerLevelResultDTO";

export default class PlayerLevelResultService {
    private results: Map<number, PlayerLevelResultDTO> = new Map();

    constructor() {
        this.loadResults(); 
    }

    getResult(levelNumber: number): PlayerLevelResultDTO | undefined {
        return this.results.get(levelNumber);
    }

    addResult(levelNumber: number, result: PlayerLevelResultDTO): void {
        const existingResult = this.getResult(levelNumber);
        
        if (!existingResult) {
            result.highestScore = result.score; 
        } else {
            if (result.score > existingResult.highestScore) {
                existingResult.highestScore = result.score;
            }
        }

        this.results.set(levelNumber, result);
        this.saveResults(); 
    }

    loadResults(): void {
        const storedResults = localStorage.getItem('levelResults');
        if (storedResults) {
            const results: any = JSON.parse(storedResults); 
            for (const level of Object.keys(results)) {
                if (Array.isArray(results[level]) && results[level].length >= 7) {
                    this.results.set(
                        Number(level), 
                        new PlayerLevelResultDTO(
                            results[level][0], // score
                            results[level][1], // launchCount
                            results[level][2], // highestScore
                            results[level][3], // highestStar
                            results[level][4], // isUnlocked
                            results[level][5], // isHoleAchieved
                            results[level][6]  // levelNumber
                        )
                    );
                }
            }
        }
    }

    saveResults(): void {
        const resultsObj: Record<number, any[]> = {}; 
        this.results.forEach((result, key) => {
            resultsObj[key] = [
                result.score,
                result.launchCount,
                result.highestScore,
                result.highestStar,
                result.isUnlocked,
                result.isHoleAchieved,
                result.levelNumber,
            ]; 
        });
        localStorage.setItem('levelResults', JSON.stringify(resultsObj)); 
    }
}

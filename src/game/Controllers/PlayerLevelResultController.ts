import PlayerLevelResultService from "../Services/PlayerLevelResultService";
import PlayerLevelResultDTO from "../DTOs/PlayerLevelResultDTO";

export default class PlayerLevelResultController {
    private service: PlayerLevelResultService;

    constructor(service: PlayerLevelResultService) {
        this.service = service;
    }

    addResult(levelNumber: number, result: PlayerLevelResultDTO): void {
        this.service.addResult(levelNumber, result);
    }

    getResult(levelNumber: number): PlayerLevelResultDTO | undefined {
        return this.service.getResult(levelNumber);
    }

    // getAllResults(): PlayerLevelResultDTO[] {
    //     return this.service.getAllResults();
    // }
}

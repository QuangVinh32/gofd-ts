import LevelDTO from '../DTOs/LevelDTO';
export default class LevelController {
    private levels: LevelDTO[];

    constructor() {
        this.levels = [];
    }

    addLevel(dto: LevelDTO): void {
        this.levels.push(dto);
    }

    getAllLevels(): LevelDTO[] {
        return this.levels;
    }

    getLevelById(id: number): LevelDTO | undefined {
        return this.levels.find(level => level.levelId === id);
    }

    updateLevel(id: number, newData: { levelNumber?: number; width?: number; height?: number; columns?: number; rows?: number; origin?: { x: number; y: number } }): void {
        const level = this.getLevelById(id);
        if (level) {

            if (newData.levelNumber !== undefined) {
                level.levelNumber = newData.levelNumber;
            }
            if (newData.width !== undefined) {
                level.width = newData.width;
            }
            if (newData.height !== undefined) {
                level.height = newData.height;
            }
            if (newData.columns !== undefined) {
                level.columns = newData.columns;
            }
            if (newData.rows !== undefined) {
                level.rows = newData.rows;
            }
            // if (newData.origin !== undefined) {
            //     level.origin = newData.origin;
            // }
        }
    }

    deleteLevel(id: number): void {
        this.levels = this.levels.filter(level => level.levelId !== id);
    }
}

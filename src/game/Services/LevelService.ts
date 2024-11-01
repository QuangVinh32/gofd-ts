import LevelDTO from '../DTOs/LevelDTO';
import LevelController from '../Controllers/LevelController';
import LevelView from '../Views/LevelView';

export default class LevelService {
    public scene: any; 
    public jsonPath: string;
    public controller: LevelController;
    public levelViews: LevelView[];

    constructor(scene: any, jsonPath: string) {
        this.scene = scene;
        this.jsonPath = jsonPath;
        this.controller = new LevelController();
        this.levelViews = [];
    }

    async loadLevels(): Promise<LevelDTO[]> {
        try {
            const response = await fetch(this.jsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            data.forEach((levelData: any) => {
                const dto = new LevelDTO(
                    levelData.levelId,
                    levelData.levelNumber,
                    levelData.width,
                    levelData.height,
                    levelData.columns,
                    levelData.rows,
                    levelData.origin
                );
                this.controller.addLevel(dto);
            });
            return this.controller.getAllLevels();
        } catch (error) {
            console.error("Error loading levels:", error);
            return [];
        }
    }

    async initialize(levelNumber: number): Promise<void> {
        const levels = await this.loadLevels();
        const specificLevelDTO = levels.find(dto => dto.levelNumber === levelNumber);
        if (specificLevelDTO) {
            const levelView = this.createLevelView(specificLevelDTO);
            this.levelViews.push(levelView); // Lưu levelView vào mảng
        }
    }

    createLevelView(dto: LevelDTO): LevelView {
        return new LevelView(this.scene, dto);
    }

    getAllLevelViews(): LevelView[] {
        return this.levelViews;
    }

    getLevelViewById(id: number): LevelView | undefined {
        return this.levelViews.find(view => view.levelData.levelId === id);
    }

    getLevelDTOById(id: number): LevelDTO | undefined {
        return this.controller.getLevelById(id);
    }

    getAllLevelDTOs(): LevelDTO[] {
        return this.controller.getAllLevels();
    }
}

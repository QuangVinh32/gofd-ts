import SettingController from '../Controllers/SettingController';
import SettingDTO from '../DTOs/SettingDTO';
import SettingView from '../Views/SettingView';

class SettingService {
    private scene: Phaser.Scene;
    private jsonPath: string;
    private controller: SettingController;
    private settingViews: SettingView[];
    private settings: SettingDTO[] | null;

    constructor(scene: Phaser.Scene, jsonPath: string) {
        this.scene = scene;
        this.jsonPath = jsonPath;
        this.controller = new SettingController();
        this.settingViews = [];
        this.settings = null;
    }

    async loadSettings(): Promise<SettingDTO[]> {
        try {
            const response = await fetch(this.jsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            data.settings.forEach((settingData: any) => {
                const dto = new SettingDTO(
                    settingData.id,
                    settingData.positionX,
                    settingData.positionY,
                    settingData.isSoundOn,
                    settingData.currentFrame
                );
                this.controller.addSetting(dto);
            });
            return this.controller.getAllSettings();
        } catch (error) {
            console.error("Error loading settings:", error);
            return [];
        }
    }

    async initialize(settingId: number): Promise<void> {
        await this.loadSettings();
        const settingDTO = this.controller.getSettingById(settingId);
        if (settingDTO) {
            this.createSettingView(settingDTO);
        }
    }

    createSettingView(dto: SettingDTO): SettingView {
        const settingView = new SettingView(this.scene, dto);
        this.settingViews.push(settingView);
        return settingView;
    }

    updateSettingView(dto: SettingDTO): void {
        const settingView = this.settingViews.find(view => view.settingData.id === dto.id);
        if (settingView) {
            settingView.updateAudio();
            // settingView.updatePosition();
        }
    }

    updateSetting(id: number, newData: any): void {
        this.controller.updateSetting(id, newData);
        const updatedSetting = this.controller.getSettingById(id);
        if (updatedSetting) {
            this.updateSettingView(updatedSetting);
        }
    }

    getAllSettingViews(): SettingView[] {
        return this.settingViews;
    }

    getSettingViewById(id: number): SettingView | undefined {
        return this.settingViews.find(view => view.settingData.id === id);
    }

    getSettingDTOById(id: number): SettingDTO | undefined {
        return this.controller.getSettingById(id);
    }

    getAllSettingDTOs(): SettingDTO[] {
        return this.controller.getAllSettings();
    }
}

export default SettingService;

import SettingDTO  from "../DTOs/SettingDTO"
export default class SettingController {
    private settings: SettingDTO[];

    constructor() {
        this.settings = [];
    }

     addSetting(dto: SettingDTO) {
        this.settings.push(dto);
    }

    getAllSettings() {
        return this.settings;
    }
    
    getSettingById(id: number): SettingDTO | undefined {
        return this.settings.find(setting => setting.id === id);
    }

     updateSetting(id: number, newData: { positionX: number, positionY: number,isSoundOn: boolean,currentFrame: number  }): void {
        const setting = this.getSettingById(id);
        if (setting != null) {
            setting.positionX = newData.positionX ;
            setting.positionY = newData.positionY;
            setting.isSoundOn = newData.isSoundOn ;
            setting.currentFrame = newData.currentFrame ;
        } else {
            console.error(`Setting với ID ${id} không tồn tại.`);
        }
    }
}   


import Phaser from 'phaser';

interface SettingData {
    id: number;
    positionX: number;
    positionY: number;
    isSoundOn: boolean;
}

class SettingView extends Phaser.GameObjects.Container {
    updatePosition() {
        throw new Error('Method not implemented.');
    }
    private audioIcon: Phaser.GameObjects.Sprite;
    public settingData: SettingData;
    private isSoundOn: boolean;

    constructor(scene: Phaser.Scene, settingData: SettingData) {
        super(scene);
        this.settingData = settingData;
        this.isSoundOn = settingData.isSoundOn;
        this.createAudio();
        this.scene.add.existing(this);
    }

    createAudio(){
        this.audioIcon = this.scene.add.sprite(this.settingData.positionX, this.settingData.positionY, "audio")
            .setDisplaySize(55, 55)
            .setOrigin(0.5, 0.5)
            .setInteractive();

        this.updateAudio();

        this.audioIcon.on('pointerdown', () => {
            this.toggleAudio();
        });

        this.add(this.audioIcon);
    }

    updateAudio(){
        if (this.isSoundOn) {
            this.audioIcon.setFrame(0); 
            // console.log(0);
        } else {
            this.audioIcon.setFrame(1);
            // console.log(1);
        }
    }

    private toggleAudio(): void {
        this.isSoundOn = !this.isSoundOn;
        this.updateAudio();

        if (this.isSoundOn) {
            this.scene.sound.resumeAll();
        } else {
            this.scene.sound.pauseAll();
        }
    }
}

export default SettingView;

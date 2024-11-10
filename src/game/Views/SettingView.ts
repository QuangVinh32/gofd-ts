import Phaser from 'phaser';

interface SettingData {
    id: number;
    positionX: number;
    positionY: number;
    isSoundOn: boolean;
}

class SettingView extends Phaser.GameObjects.Container {
    private audioIcon: Phaser.GameObjects.Sprite;
    public settingData: SettingData;
    private isSoundOn: boolean;
    private isTweening: boolean = false;
    private soundTrack: Phaser.Sound.BaseSound;

    constructor(scene: Phaser.Scene, settingData: SettingData) {
        super(scene);
        this.settingData = settingData;
        this.isSoundOn = settingData.isSoundOn;
        this.createAudio();
        this.scene.add.existing(this);
    }

    createAudio() {
        this.audioIcon = this.scene.add.sprite(this.settingData.positionX, this.settingData.positionY, "audio")
            .setDisplaySize(55, 55)
            .setOrigin(0.5, 0.5)
            .setInteractive();

        this.updateAudio();

        this.soundTrack = this.scene.sound.add("soundtrack", { loop: true });
        if (this.isSoundOn) {
            this.soundTrack.play();
        }

        this.audioIcon.on('pointerdown', () => {
            this.toggleAudio();
            this.createAudioTween();
        });

        this.add(this.audioIcon);
    }

    updateAudio() {
        if (this.isSoundOn) {
            this.audioIcon.setFrame(0); 
        } else {
            this.audioIcon.setFrame(1);
        }
    }

    private toggleAudio(): void {
        this.isSoundOn = !this.isSoundOn;
        this.updateAudio();

        if (this.isSoundOn) {
            this.soundTrack.resume();
            this.scene.sound.resumeAll();
        } else {
            this.soundTrack.pause();
            this.scene.sound.pauseAll();
        }
    }

    private createAudioTween(): void {
        if (!this.isTweening) {
            this.isTweening = true;
            this.scene.tweens.add({
                targets: this.audioIcon,
                scaleX: 0.5,
                scaleY: 0.5,
                duration: 100,
                yoyo: true,
                ease: 'Power2',
                onComplete: () => {
                    this.isTweening = false;
                }
            });
        }
    }
}

export default SettingView;

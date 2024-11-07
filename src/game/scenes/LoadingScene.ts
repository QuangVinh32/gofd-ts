class LoadingScene extends Phaser.Scene {
  private loadingContainer!: Phaser.GameObjects.Container;
  private loadingImage!: Phaser.GameObjects.Image;
  private loadingText!: Phaser.GameObjects.Text;

  constructor() {
    super("loading");
  }

  preload(): void {
    this.load.image("loading", "assets/images/loading.png");
  }

  create(): void {
    this.loadingContainer = this.add.container(0, 0);

    this.loadingImage = this.add.image(0, 0, "loading")
      .setDisplaySize(200, 200)
      .setOrigin(0, 0);


    this.loadingText = this.add.text(0, 220, "Loading game...", {
      fontSize: "24px",
      color: "yellow"
    }).setOrigin(0, 0);

    this.loadingContainer.add([this.loadingImage, this.loadingText]);

    this.loadingContainer.setPosition(
      this.cameras.main.width / 2 - this.loadingImage.displayWidth / 2,
      this.cameras.main.height / 2 - this.loadingImage.displayHeight / 2
    );

    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start("playGame");
    });

    this.cameras.main.fadeOut(1000);
  }
}

export default LoadingScene;

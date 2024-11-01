import Phaser from 'phaser';

interface DestinationData {
    id: number;
    positionX: number;
    positionY: number;
    radius: number;
}

export default class DestinationView {
    private scene: Phaser.Scene;
    public destinationData: DestinationData;
    private phaserObject: Phaser.GameObjects.Graphics;
    public matterBody: MatterJS.Body; // Chỉ định kiểu Body thay vì BodyType | null

    constructor(scene: Phaser.Scene, destinationData: DestinationData) {
        this.scene = scene;
        this.destinationData = destinationData;
        
        this.phaserObject = this.createPhaserObject();
        this.matterBody = this.createMatterBody() as MatterJS.Body; // Chuyển đổi kiểu
    }

    private createPhaserObject(): Phaser.GameObjects.Graphics {
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(2, 0xff0000);
        graphics.strokeCircle(this.destinationData.positionX, this.destinationData.positionY, this.destinationData.radius);

        return graphics;
    }

    private createMatterBody(): MatterJS.Body {
        const body = this.scene.matter.add.circle(
            this.destinationData.positionX, 
            this.destinationData.positionY, 
            this.destinationData.radius / 2, 
            { isStatic: true }
        );

        return body; 
    }

    public update(): void {
        this.phaserObject.clear();
        this.phaserObject.lineStyle(2, 0xff0000);
        this.phaserObject.strokeCircle(this.destinationData.positionX, this.destinationData.positionY, this.destinationData.radius);
    }

    public updateDestination(newData: Partial<DestinationData>): void {
        if (newData.positionX !== undefined) this.destinationData.positionX = newData.positionX;
        if (newData.positionY !== undefined) this.destinationData.positionY = newData.positionY;
        if (newData.radius !== undefined) this.destinationData.radius = newData.radius;

        // Update Phaser object and Matter body to reflect new data
        this.update();
        // this.matterBody.position.x = this.destinationData.positionX;
        // this.matterBody.position.y = this.destinationData.positionY;
    }

    public getDestinationData(): DestinationData {
        return this.destinationData;
    }
}

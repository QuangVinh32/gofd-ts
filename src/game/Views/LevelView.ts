import Phaser from 'phaser';
import LevelDTO from '../DTOs/LevelDTO';

export default class LevelView {
    public scene: Phaser.Scene;
    public levelData: LevelDTO;

    constructor(scene: Phaser.Scene, levelData: LevelDTO) {
        this.scene = scene;
        this.levelData = levelData;
        this.createBackground();
    }

    createBackground() {
        const levels: string[] = [];
        // Tạo tên hình ảnh cho mỗi hình ảnh trong cấp độ
        for (let i = 1; i <= 18; i++) {
            levels.push(`level${this.levelData.levelNumber}_${i}`);
        }

        const columns = this.levelData.columns; // Số cột
        const rows = this.levelData.rows;       // Số hàng
        const imageWidth = 300;                 // Chiều rộng của mỗi hình ảnh
        const imageHeight = 300;                // Chiều cao của mỗi hình ảnh

        // Tạo hình ảnh cho từng ô trong lưới
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const index = row * columns + col;
                if (index < levels.length) {
                    this.scene.add.image(col * imageWidth, row * imageHeight, levels[index])
                        .setOrigin(0, 0)
                        .setDisplaySize(imageWidth, imageHeight);
                }
            }
        }
    }

    public calculateCanvasSize(): { width: number; height: number } {
        const imageWidth = 300;
        const imageHeight = 300;
        const columns = this.levelData.columns; // Sử dụng số cột từ levelData
        const rows = this.levelData.rows;       // Sử dụng số hàng từ levelData
        const canvasWidth = columns * imageWidth;
        const canvasHeight = rows * imageHeight;
        return { width: canvasWidth, height: canvasHeight };
    }
}

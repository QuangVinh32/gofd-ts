import Phaser from 'phaser';

class EditorPolygon extends Phaser.Scene {
    private points: Phaser.Math.Vector2[];
    private rectsOnEdges: Phaser.GameObjects.Rectangle[];
    private texts: Phaser.GameObjects.Text[];
    private dragStartPos: { x: number; y: number } | null;
    private line: Phaser.GameObjects.Line | null;
    private isPaused: boolean;
    private keyQ: Phaser.Input.Keyboard.Key;
    private keyW: Phaser.Input.Keyboard.Key;
    private graphics: Phaser.GameObjects.Graphics;
    private startX: number;
    private startY: number;
    private cameraFollowingBall: boolean;

    constructor() {
        super("editPolygon");
        this.points = [];
        this.rectsOnEdges = [];
        this.texts = [];
        this.dragStartPos = null;
        this.line = null;
        this.isPaused = false;
        this.cameraFollowingBall = false;
    }

    preload(): void {
        this.load.image("ball", "assets/images/ball.png");
    }

    create(): void {
        this.matter.world.setBounds(0, 0, 1800, 900);
        this.matter.world.disableGravity();

        this.add.text(560, 460, "HOLE: 1", { font: "22px Arial", color: "Yellow" });

        this.input.on('pointerdown', this.addPoint, this);

        this.graphics = this.add.graphics();

        // this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        // this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // Listen for W key

        this.drawPolygon();

        // const ball = this.matter.add.image(509, 290, "ball").setDisplaySize(10, 10);
        // ball.setCircle(5);
        // ball.setBounce(1);
        // ball.setFriction(0.001);

        // ball.setInteractive();
        // this.input.setDraggable(ball);

        // // Set up drag for the object
        // this.input.on('dragstart', (pointer: any, gameObject: any) => {
        //     this.dragStartPos = { x: gameObject.x, y: gameObject.y };
        //     this.line = this.add.line(0, 0, gameObject.x, gameObject.y, pointer.x, pointer.y, 0xff00ff);
        //     this.line.setLineWidth(2);
        // });

        // this.input.on('drag', (pointer: any, gameObject: any) => {
        //     if (this.line) {
        //         this.line.setTo(gameObject.x, gameObject.y, pointer.x, pointer.y);
        //     }
        // });

        // this.input.on('dragend', (pointer: any, gameObject: any) => {
        //     const directionX = pointer.x - this.dragStartPos!.x;
        //     const directionY = pointer.y - this.dragStartPos!.y;

        //     const velocityX = -directionX * 0.1;
        //     const velocityY = -directionY * 0.1;

        //     gameObject.setVelocity(velocityX, velocityY);
        //     if (this.line) {
        //         this.line.destroy();
        //         this.line = null;
        //     }
        // });

        // Set camera bounds according to the map size
        this.cameras.main.setBounds(0, 0, 1800, 900);
        this.setupCameraInteractions();

        this.cameras.main.setZoom(1);
    }

    update(): void {
        if (this.keyQ && this.keyQ.isDown) {
            this.isPaused = !this.isPaused;
            console.log("Toggled pause:", this.isPaused);
        }
        if (this.keyW && Phaser.Input.Keyboard.JustDown(this.keyW)) {
            this.savePointsToFile(); 
        }
    }
    addPoint(pointer: Phaser.Input.Pointer): void {
        if (this.isPaused) return;

        console.log("Camera Scroll:", this.cameras.main.scrollX, this.cameras.main.scrollY);

        const worldX = pointer.x + this.cameras.main.scrollX;
        const worldY = pointer.y + this.cameras.main.scrollY;

        const newPoint = new Phaser.Math.Vector2(worldX, worldY);
        this.points.push(newPoint);

        console.log("New point added at:", newPoint.x, newPoint.y); 
        this.drawPolygon();
    }

    drawPolygon(): void {
        this.graphics.clear();
        this.rectsOnEdges.forEach(rect => rect.destroy());
        this.rectsOnEdges = [];
        this.texts.forEach(text => text.destroy());
        this.texts = [];

        if (this.points.length > 1) {
            this.graphics.lineStyle(2, 0x002bff, 1);
            this.graphics.beginPath();
            this.graphics.moveTo(this.points[0].x, this.points[0].y);

            for (let i = 1; i < this.points.length; i++) {
                this.graphics.lineTo(this.points[i].x, this.points[i].y);
            }

            this.graphics.lineTo(this.points[0].x, this.points[0].y);
            this.graphics.strokePath();
            this.drawRectanglesOnEdges();
            this.displayCoordinates();
        }
    }

    drawRectanglesOnEdges(): void {
        for (let i = 0; i < this.points.length; i++) {
            const pointA = this.points[i];
            const pointB = this.points[(i + 1) % this.points.length];

            const length = Phaser.Math.Distance.Between(pointA.x, pointA.y, pointB.x, pointB.y);
            const angle = Phaser.Math.Angle.Between(pointA.x, pointA.y, pointB.x, pointB.y);
            const height = 25;

            const normalX = Math.cos(angle + Math.PI / 2);
            const normalY = Math.sin(angle + Math.PI / 2);
            const offsetX = normalX * height / 2;
            const offsetY = normalY * height / 2;

            const midPointX = (pointA.x + pointB.x) / 2;
            const midPointY = (pointA.y + pointB.y) / 2;

            const rect = this.add.rectangle(midPointX, midPointY, length, height, 0xff5500, 0.5);
            rect.setPosition(midPointX + offsetX, midPointY + offsetY);

            this.matter.add.gameObject(rect, {
                shape: { type: 'rectangle', width: length, height: height },
                angle: angle,
                isStatic: true,
                restitution: 0
            });
            this.rectsOnEdges.push(rect);
        }
    }

    displayCoordinates(): void {
        this.points.forEach(point => {
            const text = this.add.text(point.x - 15, point.y - 15, `(${Math.round(point.x)}, ${Math.round(point.y)})`, {
                fontSize: '12px',
            });
            this.texts.push(text);
        });
    }

    savePointsToFile(): void {
        const pointsData = this.points.map(point => `(${Math.round(point.x)}, ${Math.round(point.y)})`).join("\n");

        const blob = new Blob([pointsData], { type: 'text/plain' });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'points.txt';
        document.body.appendChild(a);
        a.click(); 
        document.body.removeChild(a);
    }

    setupCameraInteractions(): void {
        this.input.on('pointerdown', (pointer: any) => {
            this.startX = pointer.x;
            this.startY = pointer.y;
        });

        this.input.on('pointermove', (pointer: any) => {
            if (pointer.isDown) {
                this.handleCameraMovement(pointer);
            }
        });
    }

    handleCameraMovement(pointer: Phaser.Input.Pointer): void {
        const dx = pointer.x - this.startX;
        const dy = pointer.y - this.startY;
        const camera = this.cameras.main;
        camera.scrollX -= dx / camera.zoom;
        camera.scrollY -= dy / camera.zoom;

        this.startX = pointer.x;
        this.startY = pointer.y;

        if (this.cameraFollowingBall) {
            this.cameras.main.stopFollow();
            this.cameraFollowingBall = false;
        }
    }
}

export default EditorPolygon;

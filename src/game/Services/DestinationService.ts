import Phaser from 'phaser';
import DestinationDTO from '../DTOs/DestinationDTO'; 
import DestinationController  from '../Controllers/DestinationController';
import DestinationView from '../Views/DestinationView'; 
class DestinationService {
    public scene: Phaser.Scene;
    private jsonPath: string;
    private controller: DestinationController;
    private destinationViews: DestinationView[];

    constructor(scene: Phaser.Scene, jsonPath: string) {
        this.scene = scene;
        this.jsonPath = jsonPath;
        this.controller = new DestinationController();
        this.destinationViews = [];
    }

    async loadDestinations(): Promise<DestinationDTO[]> {
        try {
            const response = await fetch(this.jsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            data.destinations.forEach((destinationData: any) => { 
                const dto = new DestinationDTO(
                    destinationData.id,
                    destinationData.positionX,
                    destinationData.positionY,
                    destinationData.radius,
                    destinationData.origin,
                    destinationData.shape,
                    destinationData.levelNumber
                );
                this.controller.addDestination(dto);
            });
            return this.controller.getAllDestinations();
        } catch (error) {
            console.error("Error loading destinations:", error);
            return [];
        }
    }

    async initialize(levelNumber: number): Promise<void> {
        const destinations = await this.loadDestinations();
        const specificDestinationDTO = destinations.find(dto => dto.id === levelNumber);
        if (specificDestinationDTO) {
            this.createDestinationView(specificDestinationDTO);
        }
    }

    createDestinationView(dto: DestinationDTO): DestinationView {
        const destinationView = new DestinationView(this.scene, dto);
        this.destinationViews.push(destinationView);
        return destinationView;
    }

    updateDestinationView(dto: DestinationDTO): void {
        const destinationView = this.destinationViews.find(view => view.destinationData.id === dto.id);
        if (destinationView) {
            destinationView.updateDestination(dto); 
        }
    }

    updateDestination(id: number, newData: Partial<DestinationDTO>): void {
        const currentDestination = this.controller.getDestinationById(id);
        if (currentDestination) {
            currentDestination.positionX = newData.positionX ?? currentDestination.positionX;
            currentDestination.positionY = newData.positionY ?? currentDestination.positionY;
            currentDestination.radius = newData.radius ?? currentDestination.radius;
            currentDestination.shape = newData.shape ?? currentDestination.shape;
            currentDestination.origin = newData.origin ?? currentDestination.origin;
            currentDestination.levelNumber = newData.levelNumber ?? currentDestination.levelNumber;

            this.controller.updateDestination(id, currentDestination);

            this.updateDestinationView(currentDestination);
        }
    }


    getAllDestinationViews(): DestinationView[] {
        return this.destinationViews;
    }

    getDestinationViewById(id: number): DestinationView | undefined {
        return this.destinationViews.find(view => view.destinationData.id === id);
    }

    getDestinationDTOById(id: number): DestinationDTO | undefined {
        return this.controller.getDestinationById(id);
    }

    getAllDestinationDTOs(): DestinationDTO[] {
        return this.controller.getAllDestinations();
    }
}

export default DestinationService;

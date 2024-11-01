import  DestinationDTO from "../DTOs/DestinationDTO"

export default class DestinationController {
    private destinations: DestinationDTO[];

    constructor() {
        this.destinations = [];
    }

    addDestination(dto: DestinationDTO) {
        this.destinations.push(dto);
    }

    getAllDestinations() {
        return this.destinations;
    }
    getDestinationById(id : number): DestinationDTO | undefined {
        return this.destinations.find(destination => destination.id === id);
    }

    updateDestination(id: number, newData:{ positionX: number, positionY: number}): void{
        const destination = this.getDestinationById(id);
        if (destination != null) {
            destination.positionX = newData.positionX;
            destination.positionY = newData.positionY;
        } else {
            console.error(`Destination với ID ${id} không tồn tại.`);
        }
    }

 
}

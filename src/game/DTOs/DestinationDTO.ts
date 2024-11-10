export default class DestinationDTO {
    private _id: number;
    private _positionX: number;
    private _positionY: number;
    private _alpha: number;
    private _radius: number;
    private _origin: { x: number, y: number };
    private _shape: string;
    private _levelNumber : number;

	constructor(id: number, positionX: number, positionY: number ,radius: number, origin: number, shape: string, levelNumber: number,alpha: number) {
		this._id = id;
		this._positionX = positionX;
        this._positionY = positionY;
		this._radius = radius;
        this._origin = { x: 0, y: 0 }; 
		this._shape = shape;
        this._alpha = alpha;
		this._levelNumber = levelNumber;

	}
    public get alpha(): number {
        return this._alpha;
    }

    public set alpha(alpha: number) {
        this._alpha = alpha;
    }

    /**
     * Getter positionY
     * @return {number}
     */
	public get positionY(): number {
		return this._positionY;
	}

    /**
     * Setter positionY
     * @param {number} value
     */
	public set positionY(value: number) {
		this._positionY = value;
	}


    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Getter positionX
     * @return {number}
     */
	public get positionX(): number {
		return this._positionX;
	}

    /**
     * Getter radius
     * @return {number}
     */
	public get radius(): number {
		return this._radius;
	}

    /**
     * Getter shape
     * @return {string}
     */
	public get shape(): string {
		return this._shape;
	}

    /**
     * Getter levelNumber
     * @return {number}
     */
	public get levelNumber(): number {
		return this._levelNumber;
	}

    /**
     * Setter id
     * @param {number} value
     */
	public set id(value: number) {
		this._id = value;
	}

    /**
     * Setter positionX
     * @param {number} value
     */
	public set positionX(value: number) {
		this._positionX = value;
	}

    /**
     * Setter radius
     * @param {number} value
     */
	public set radius(value: number) {
		this._radius = value;
	}

    /**
     * Setter shape
     * @param {string} value
     */
	public set shape(value: string) {
		this._shape = value;
	}

    /**
     * Setter levelNumber
     * @param {number} value
     */
	public set levelNumber(value: number) {
		this._levelNumber = value;
	}
    /**
     * Getter origin
     * @return {string}
     */
	public get origin(): {x: number, y: number} {
		return this._origin;
	}

    /**
     * Setter origin
     * @param {string} value
     */
	public set origin(value: { x: number, y: number }) {
		this._origin = value;
	}


    


    
}



export default class ObstacleDTO {
    private _id: number;
    private _pointA: {x: number ,y: number}
    private _pointB:  {x: number ,y: number}
    private _height: number;
    private _color: number;
    private _alpha: number;
    private _isStatic: boolean;
    private _restitution: number;
    private _shape: string;
    private _levelNumber: number;


    constructor(
        id: number,
        pointA: { x: number; y: number }, 
        pointB: { x: number; y: number }, 
        height: number = 20,
        color: number = 0xff5500,
        alpha: number = 0.5,
        isStatic: boolean = true,
        restitution: number = 0,
        shape: string = "rectangle",
        levelNumber: number = 1
    ) {
        this._id = id;
        this._pointA = pointA; 
        this._pointB = pointB;
        this._height = height;
        this._color = color;
        this._alpha = alpha;
        this._isStatic = isStatic;
        this._restitution = restitution;
        this._shape = shape;
        this._levelNumber = levelNumber;
    }

    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Getter height
     * @return {number}
     */
	public get height(): number {
		return this._height;
	}

    /**
     * Getter color
     * @return {number}
     */
	public get color(): number {
		return this._color;
	}

    /**
     * Getter alpha
     * @return {number}
     */
	public get alpha(): number {
		return this._alpha;
	}

    /**
     * Getter isStatic
     * @return {boolean}
     */
	public get isStatic(): boolean {
		return this._isStatic;
	}

    /**
     * Getter restitution
     * @return {number}
     */
	public get restitution(): number {
		return this._restitution;
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
     * Setter height
     * @param {number} value
     */
	public set height(value: number) {
		this._height = value;
	}

    /**
     * Setter color
     * @param {number} value
     */
	public set color(value: number) {
		this._color = value;
	}

    /**
     * Setter alpha
     * @param {number} value
     */
	public set alpha(value: number) {
		this._alpha = value;
	}

    /**
     * Setter isStatic
     * @param {boolean} value
     */
	public set isStatic(value: boolean) {
		this._isStatic = value;
	}

    /**
     * Setter restitution
     * @param {number} value
     */
	public set restitution(value: number) {
		this._restitution = value;
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
	public get pointA(): {x: number, y: number} {
		return this._pointA;
	}

    /**
     * Setter origin
     * @param {string} value
     */
	public set pointA(value: { x: number, y: number }) {
		this._pointA = value;
	}
        /**
     * Getter origin
     * @return {string}
     */
	public get pointB(): {x: number, y: number} {
		return this._pointB;
	}

    /**
     * Setter origin
     * @param {string} value
     */
	public set pointB(value: { x: number, y: number }) {
		this._pointB = value;
	}



   
    
    



	
	
    


    



  
}


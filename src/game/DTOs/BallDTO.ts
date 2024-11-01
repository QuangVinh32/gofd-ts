export default class BallDTO {
     private _id: number;
     private _positionX: number;
     private _positionY: number;
     private _width: number;
     private _height: number;
     private _origin: { x: number, y: number };
     private _bounce: number;
     private _friction: number;
     private _velocity: { x: number; y: number };
     private _levelId: number;

	constructor(id: number, positionX: number, positionY: number, width: number, height: number,  origin: { x: number; y: number }, bounce: number, friction: number, levelId: number) {
		this._id = id;
		this._positionX = positionX;
		this._positionY = positionY;
		this._width = width;
		this._height = height;
          this._origin = { x: 0, y: 0 }; 
		this._bounce = bounce;
		this._friction = friction;
          this._velocity = { x: 0, y: 0 }; 
		this._levelId = levelId;
	}



    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Setter id
     * @param {number} value
     */
	public set id(value: number) {
		this._id = value;
	}

    /**
     * Getter positionX
     * @return {number}
     */
	public get positionX(): number {
		return this._positionX;
	}

    /**
     * Setter positionX
     * @param {number} value
     */
	public set positionX(value: number) {
		this._positionX = value;
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
     * Getter width
     * @return {number}
     */
	public get width(): number {
		return this._width;
	}

    /**
     * Setter width
     * @param {number} value
     */
	public set width(value: number) {
		this._width = value;
	}

    /**
     * Getter height
     * @return {number}
     */
	public get height(): number {
		return this._height;
	}

    /**
     * Setter height
     * @param {number} value
     */
	public set height(value: number) {
		this._height = value;
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

    /**
     * Getter bounce
     * @return {number}
     */
	public get bounce(): number {
		return this._bounce;
	}

    /**
     * Setter bounce
     * @param {number} value
     */
	public set bounce(value: number) {
		this._bounce = value;
	}

    /**
     * Getter friction
     * @return {number}
     */
	public get friction(): number {
		return this._friction;
	}

    /**
     * Setter friction
     * @param {number} value
     */
	public set friction(value: number) {
		this._friction = value;
	}

     public get velocity(): { x: number; y: number } {
          return this._velocity;
     }
  
      public set velocity(value: { x: number; y: number }) {
          this._velocity = value;
     }

    /**
     * Getter levelId
     * @return {number}
     */
	public get levelId(): number {
		return this._levelId;
	}

    /**
     * Setter levelId
     * @param {number} value
     */
	public set levelId(value: number) {
		this._levelId = value;
	}

 }
 
export default class SettingDTO {
    private _id: number;
    private _positionX: number;
    private _positionY: number;
    private _isSoundOn: boolean;
    private _currentFrame: number;

	constructor(id: number, positionX: number, positionY: number, isSoundOn: boolean, currentFrame: number) {
		this._id = id;
		this._positionX = positionX;
		this._positionY = positionY;
		this._isSoundOn = isSoundOn;
		this._currentFrame = currentFrame;
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
     * Getter positionY
     * @return {number}
     */
	public get positionY(): number {
		return this._positionY;
	}

    /**
     * Getter isSoundOn
     * @return {boolean}
     */
	public get isSoundOn(): boolean {
		return this._isSoundOn;
	}

    /**
     * Getter currentFrame
     * @return {number}
     */
	public get currentFrame(): number {
		return this._currentFrame;
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
     * Setter positionY
     * @param {number} value
     */
	public set positionY(value: number) {
		this._positionY = value;
	}

    /**
     * Setter isSoundOn
     * @param {boolean} value
     */
	public set isSoundOn(value: boolean) {
		this._isSoundOn = value;
	}

    /**
     * Setter currentFrame
     * @param {number} value
     */
	public set currentFrame(value: number) {
		this._currentFrame = value;
	}


}
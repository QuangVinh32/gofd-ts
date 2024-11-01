export default class LevelDTO {

    private _levelId: number;
    private _levelNumber: number;
    private _width: number;
    private _height: number;
    private _columns: number;
    private _rows: number;
    private _origin: number;


	constructor(levelId: number, levelNumber: number, width: number, height: number, columns: number, rows: number, origin: number) {
		this._levelId = levelId;
		this._levelNumber = levelNumber;
		this._width = width;
		this._height = height;
		this._columns = columns;
		this._rows = rows;
		this._origin = origin;
	}

    /**
     * Getter levelId
     * @return {number}
     */
	public get levelId(): number {
		return this._levelId;
	}

    /**
     * Getter levelNumber
     * @return {number}
     */
	public get levelNumber(): number {
		return this._levelNumber;
	}

    /**
     * Getter width
     * @return {number}
     */
	public get width(): number {
		return this._width;
	}

    /**
     * Getter height
     * @return {number}
     */
	public get height(): number {
		return this._height;
	}

    /**
     * Getter columns
     * @return {number}
     */
	public get columns(): number {
		return this._columns;
	}

    /**
     * Getter rows
     * @return {number}
     */
	public get rows(): number {
		return this._rows;
	}

    /**
     * Getter origin
     * @return {number}
     */
	public get origin(): number {
		return this._origin;
	}

    /**
     * Setter levelId
     * @param {number} value
     */
	public set levelId(value: number) {
		this._levelId = value;
	}

    /**
     * Setter levelNumber
     * @param {number} value
     */
	public set levelNumber(value: number) {
		this._levelNumber = value;
	}

    /**
     * Setter width
     * @param {number} value
     */
	public set width(value: number) {
		this._width = value;
	}

    /**
     * Setter height
     * @param {number} value
     */
	public set height(value: number) {
		this._height = value;
	}

    /**
     * Setter columns
     * @param {number} value
     */
	public set columns(value: number) {
		this._columns = value;
	}

    /**
     * Setter rows
     * @param {number} value
     */
	public set rows(value: number) {
		this._rows = value;
	}

    /**
     * Setter origin
     * @param {number} value
     */
	public set origin(value: number) {
		this._origin = value;
	}
	
    
}

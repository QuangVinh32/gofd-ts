export default class PlayerDataDTO{
    private _id: number;
    private _totalHigestScore: number;
    private _totalHigestStar: number;
    private _highestLevelsUnlocked: number;

	constructor(id: number, totalHigestScore: number, totalHigestStar: number, highestLevelsUnlocked: number) {
		this._id = id;
		this._totalHigestScore = totalHigestScore;
		this._totalHigestStar = totalHigestStar;
		this._highestLevelsUnlocked = highestLevelsUnlocked;
	}

    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Getter totalHigestScore
     * @return {number}
     */
	public get totalHigestScore(): number {
		return this._totalHigestScore;
	}

    /**
     * Getter totalHigestStar
     * @return {number}
     */
	public get totalHigestStar(): number {
		return this._totalHigestStar;
	}

    /**
     * Getter highestLevelsUnlocked
     * @return {number}
     */
	public get highestLevelsUnlocked(): number {
		return this._highestLevelsUnlocked;
	}

    /**
     * Setter id
     * @param {number} value
     */
	public set id(value: number) {
		this._id = value;
	}

    /**
     * Setter totalHigestScore
     * @param {number} value
     */
	public set totalHigestScore(value: number) {
		this._totalHigestScore = value;
	}

    /**
     * Setter totalHigestStar
     * @param {number} value
     */
	public set totalHigestStar(value: number) {
		this._totalHigestStar = value;
	}

    /**
     * Setter highestLevelsUnlocked
     * @param {number} value
     */
	public set highestLevelsUnlocked(value: number) {
		this._highestLevelsUnlocked = value;
	}
    
}
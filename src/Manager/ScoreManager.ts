import Score from "../Objects/Score";

export default class ScoreManager {

    private score: number;

    private onScoreChanged: Function;

    constructor(onScoreChanged: (number: number) => void) {
        this.score = 0;

        this.onScoreChanged = onScoreChanged;
    }
    
    getScore() {
        return this.score;
    }

    addScore(amount: number) {
        this.score += amount;

        this.show();
    }

    show() {
        this.onScoreChanged(this.score);
    }
}
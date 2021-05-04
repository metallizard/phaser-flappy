export default class Score {
  private digits: Phaser.GameObjects.Image[];

  private xOrigin: number;
  private spacing: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.digits = [];
    for (let i = 0; i < 4; i++) {
      const digit = scene.add.image(x, y, "0");
      this.digits.push(digit);
      digit.setDepth(2);
      digit.setVisible(false);
    }

    this.xOrigin = x;

    this.spacing = this.digits[0].displayWidth * 0.125;
  }

  setScore(score: number) {
      // 1. Get score length.
      // 2. Setactive unused digit image.
      // 3. Position each digit image.
      // 4. set each digit image texture.

    // Get score length.
    const scoreLength = score < 1 ? 1 : Math.ceil(Math.log10(score + 1));

    for(let i = 0; i < this.digits.length; i++) {
        // Setactive unused digit image.
        if(i > scoreLength - 1) {
            this.digits[i].setVisible(false);
        } else {
            // Set each digit image texture.
            this.digits[i].setTexture(score.toString()[i]);
            // Position each digit image.
            const movePoint = ((i - (scoreLength - 1) / 2) * this.digits[0].displayWidth);
            this.digits[i].x = this.xOrigin + movePoint + (i * this.spacing);
            this.digits[i].setVisible(true);
        }
    }
  }
}

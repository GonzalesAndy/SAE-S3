class Score extends Phaser.GameObjects.Text {
    constructor(scene) {
      super(scene, 15, 50, ''); // Coordonnées x et y de l'objet Text
      this.setFontSize(34);
      this.setColor('white');
      this.setScrollFactor(0);
  
      this.score = 0;
  
      this.scene = scene;
      scene.add.existing(this);
    }
  
    increaseScore() {
      // Incrémentation du score
      this.score++;
  
      // Mise à jour du score affiché
      this.setText(`Score: ${this.score}`);
    }
  }
  
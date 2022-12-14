class PointDeVie extends Phaser.GameObjects.Image {

	constructor(scene, intPerso, questionRecap) {
		super(scene, scene.game.scale.width - 150, 30, "3vies");

		this.pntDeVie = 3;
		this.setScrollFactor(0);
		this.scene = scene;
		this.intPerso = intPerso;
		this.questionRecap = questionRecap;
		scene.add.existing(this);
	} // Fin constructor

	perdVie(){
		if(this.pntDeVie == 2){
			this.setTexture("2vies");
		}
		else if(this.pntDeVie == 1){
			this.setTexture("1vies");
		}
		else if(this.pntDeVie == 0){
            this.scene.scene.launch('GameOver',{intPerso: this.intPerso, questionRecap: this.questionRecap})
		} // Fin if else
	} // Fin perdVie()

} // Fin class

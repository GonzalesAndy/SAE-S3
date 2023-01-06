class PointDeVie extends Phaser.GameObjects.Image {

	constructor(scene) {
		super(scene, 930, 30, "3vies");

		this.pntDeVie = 3;
		this.setScrollFactor(0);
		this.scene = scene;
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
            this.scene.scene.start('GameOver')
		} // Fin if else
	} // Fin perdVie()

} // Fin class

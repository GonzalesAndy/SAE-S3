class Option extends Phaser.Scene {

	constructor() {
		super("Option");

		
	} // Fin constructor()
    editorCreate(){

		// feuilleOption
		const option = this.add.image(500, 294, "feuilleOption");
		option.scaleX = 0.8;
		option.scaleY = 0.8;

		// quitter
		const quitter = this.add.image(710, 100, "quitter");
		quitter.scaleX = 0.07;
		quitter.scaleY = 0.07;

		//annimation boutons
		new PushOnClick(quitter);

        this.quitter = quitter;

        this.quitter.once('pointerup', function(event) { 
            this.scene.resume('Menu');
            this.scene.resume('Level');
            this.scene.stop()
			//this.scene.sendToBack();
		}, this);

        this.events.emit("scene-awake");
    } // Fin editorCreate()

    create(){

		this.editorCreate();
    } // Fin create()

} //Fin class

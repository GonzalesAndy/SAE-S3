
// You can write more code here

/* START OF COMPILED CODE */

class SecondStage extends Phaser.Scene {

	constructor() {
		super("SecondStage");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// dino
		this.add.image(346, 225, "dino");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

        this.cameras.main.setViewport(0, 0,3200, 1640);
		

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("SecondStage"));
	}

	update(){
		//this.cameras.main.fadeOut(450, 255);
	}
}



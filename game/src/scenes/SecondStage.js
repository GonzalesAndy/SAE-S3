
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

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("SecondStage"));
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

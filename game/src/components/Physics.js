
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

class Physics {

	constructor(gameObject) {
		this.gameObject = gameObject;
		gameObject["__Physics"] = this;

		/* START-USER-CTR-CODE */
		this.static = false;


		this.scene = this.gameObject.scene

		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this)


		/* END-USER-CTR-CODE */
	}

	/** @returns {Physics} */
	static getComponent(gameObject) {
		return gameObject["__Physics"];
	}

	/** @type {Phaser.GameObjects.Image} */
	gameObject;
	/** @type {boolean} */
	static = false;

	/* START-USER-CODE */

	start()
	{
		this.scene.physics.add.existing(this.gameObject, this.static)
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

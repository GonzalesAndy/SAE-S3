class Physics {

	constructor(gameObject) {
		this.gameObject = gameObject;
		gameObject["__Physics"] = this;

		this.static = false;

		this.scene = this.gameObject.scene

		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this)

	}

	/** @returns {Physics} */
	static getComponent(gameObject) {
		return gameObject["__Physics"];
	}

	/** @type {Phaser.GameObjects.Image} */
	gameObject;
	/** @type {boolean} */
	static = false;
	start()
	{
		this.scene.physics.add.existing(this.gameObject, this.static)
	}

}

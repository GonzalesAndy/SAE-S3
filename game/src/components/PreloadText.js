class PreloadText extends UserComponent {

	constructor(gameObject) {
		super(gameObject);

		this.gameObject = gameObject;
		gameObject["__PreloadText"] = this;

		this.scene.load.on(Phaser.Loader.Events.PROGRESS, p => {

			this.gameObject.text = Math.floor(p * 100) + "%";
		});
	}

	/** @returns {PreloadText} */
	static getComponent(gameObject) {
		return gameObject["__PreloadText"];
	}

	/** @type {Phaser.GameObjects.Text} */
	gameObject;
}
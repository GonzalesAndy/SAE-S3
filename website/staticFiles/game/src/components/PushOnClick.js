class PushOnClick extends UserComponent {
	constructor(gameObject) {
		super(gameObject);

		this.gameObject = gameObject;
		gameObject['__PushOnClick'] = this;
	}

	/** @returns {PushOnClick} */
	static getComponent(gameObject) {
		return gameObject['__PushOnClick'];
	}

	/** @type {Phaser.GameObjects.Image} */
	gameObject;

	awake() {
		this.gameObject.setInteractive().on('pointerdown', () => {
			this.scene.add.tween({
				targets: this.gameObject,
				scaleX: '*=0.8',
				scaleY: '*=0.8',
				duration: 80,
				yoyo: true,
			});
		});
	}
}

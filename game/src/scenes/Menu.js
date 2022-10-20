
// You can write more code here

/* START OF COMPILED CODE */

class Menu extends Phaser.Scene {

	constructor() {
		super("Menu");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		const background = this.add.tileSprite(0, 0, 800, 900, "Background");
		background.scaleY = 0.75;
		background.setOrigin(0, 0);

		// titre
		const titre = this.add.image(401, 142, "logo");
		titre.scaleX = 0.15;
		titre.scaleY = 0.15;

		// start
		const start = this.add.image(398, 321, "Start");
		start.scaleX = 0.1;
		start.scaleY = 0.1;

		// walker
		const walker = this.add.sprite(59, 471, "10 idle", 0);
		walker.scaleX = 3;
		walker.scaleY = 3;

		// option
		const option = this.add.image(767, 42, "Option_");
		option.scaleX = 0.15;
		option.scaleY = 0.15;

		start.once('pointerup', this.runGame, this);
		new PushOnClick(start);

		new PushOnClick(option);

		this.background = background;
		this.titre = titre;
		this.start = start;
		this.walker = walker;
		this.option = option;

		this.events.emit("scene-awake");
	}

	runGame(){
		this.scene.start("Level");
	}

	/** @type {Phaser.GameObjects.TileSprite} */
	background;
	/** @type {Phaser.GameObjects.Image} */
	titre;
	/** @type {Phaser.GameObjects.Image} */
	start;
	/** @type {Phaser.GameObjects.Sprite} */
	walker;
	/** @type {Phaser.GameObjects.Image} */
	option;

	/* START-USER-CODE */

	create() {



		this.editorCreate();
		this.walker.play('walk');


	}

	update() {

		this.background.tilePositionX += 0.7;


	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

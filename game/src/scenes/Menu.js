class Menu extends Phaser.Scene {

	constructor() {
		super("Menu");

	}

	/** @returns {void} */
	editorCreate() {

		// background
		const background = this.add.tileSprite(0, 0, 1200, 672, "background");
		background.scaleY = 1;
		background.setOrigin(0, 0);

		// titre
		const titre = this.add.image(500, 142, "logo");
		titre.scaleX = 1;
		titre.scaleY = 1;

		// start
		const start = this.add.image(500, 550, "start");
		start.scaleX = 0.75;
		start.scaleY = 0.75;

		// walker
		const walker = this.add.sprite(59, 420, "10 idle", 0);
		walker.scaleX = 3;
		walker.scaleY = 3;

		// engrenage
		const engrenage = this.add.image(950, 70, "engrenage");
		engrenage.scaleX = 0.15;
		engrenage.scaleY = 0.15;

		//annimation boutons
		new PushOnClick(engrenage);

		// feuilleOption
		const option = this.add.image(500, 294, "feuilleOption");
		option.scaleX = 0.8;
		option.scaleY = 0.8;

		//visibilité option
		option.visible = false;


		// quitter
		const quitter = this.add.image(710, 100, "quitter");
		quitter.scaleX = 0.07;
		quitter.scaleY = 0.07;

		//annimation boutons
		new PushOnClick(quitter);

		//visibilité bouton quitter
		quitter.visible = false;

		//quand on appuie sur entrer, on run le jeu
		this.input.keyboard.on('keydown-ENTER', function(){
			this.scene.start("Level","map1");
      
			//this.scene.start("SecondStage");
		}, this);

		this.background = background;
		this.quitter = quitter;
		this.option = option;
		this.titre = titre;
		this.start = start;
		this.walker = walker;
		this.engrenage = engrenage;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.TileSprite} */
	background;
	/** @type {Phaser.GameObjects.Image} */
	titre;
	/** @type {Phaser.GameObjects.Image} */
	start;
	/** @type {Phaser.GameObjects.Image} */
	quitter;
	/** @type {Phaser.GameObjects.Image} */
	option;
	/** @type {Phaser.GameObjects.Sprite} */
	walker;
	/** @type {Phaser.GameObjects.Image} */
	engrenage;


	runOption(){

		this.start.visible = false;
		this.engrenage.visible = false;

		this.quitter.visible = true;
		this.option.visible = true;


		this.quitter.once('pointerup', function(event) { 
			this.quitter.visible = false;
			this.option.visible = false;

			this.start.visible = true;
			this.engrenage.visible = true;
		}, this);

	}

	create() {

		this.editorCreate();
		this.walker.play('walk');


	}

	update() {

		//quand on clique, on passe a autre chose
		this.engrenage.once('pointerup',this.runOption, this);

        //this.scene.input.keyboard.on('keyup-'+'W', function (event) { console.log("echap") });
		this.background.tilePositionX += 0.7;


	}
}

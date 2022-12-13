class SecondStage extends Phaser.Scene {

	constructor() {
		super("SecondStage");
	}

	/** @returns {void} */
	editorCreate() {

		
		this.scene.switch('level',"map1");
		this.scene.switch('Question');

		/*
		// Création carte/jeu de tuile
		const carte = this.make.tilemap({key : "map2"});
		const tileSet1 = carte.addTilesetImage("JeuTuile","JeuTuile");

		//Création "Layer"
		const fond = carte.createLayer("Fond", [tileSet1]);
		const platforme = carte.createLayer("Platforme", [tileSet1]);
		const demiPlatforme = carte.createLayer("DemiPlatforme", [tileSet1]);

		//Création collision layer
		fond.setCollisionByProperty({ estSolide: true });
		platforme.setCollisionByProperty({ estSolide: true });
		demiPlatforme.setCollisionByProperty({ estSolide: true });

		// player
		const player = this.add.sprite(100, 100, "1 idle", 0);
		player.scaleX = 3;
		player.scaleY = 3;

		// player (components)
		new Physics(player);
		new Mouvement(player);

		//ajout collision layer - joueur/ennemy
		this.physics.add.collider(player, [fond,platforme,demiPlatforme]);

		//limité la caméra
		this.cameras.main.setBounds(0, 0, 1200, 672);

		// ancrage de la caméra sur le joueur
		this.cameras.main.startFollow(player); 

		//flash quand on entre dans le stage
		this.cameras.main.flash();


		////			OPTION			////


		//quand on appuie sur entrer, on lance les options
		this.input.keyboard.on('keydown-ENTER', this.runOption, this);

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


		option.visible = false;
		quitter.visible = false;

		////			/////			////

		this.fond = fond;
		this.platforme = platforme;
		this.demiPlatforme = demiPlatforme;
		this.player = player;
		this.carte = carte;
		this.option = option;
		this.quitter = quitter;

		this.events.emit("scene-awake");
		*/
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	//fond;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	//platforme;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	//demiPlatforme;
	/** @type {Phaser.GameObjects.Sprite} */
	//player;
	/** @type {Phaser.Tilemaps.Tilemap} */
	//carte;
	/** @type {Phaser.GameObjects.Sprite} */
	//option;
	/** @type {Phaser.GameObjects.Sprite} */
	//quitter; 

	create() {

		this.editorCreate();

		/*
		//perso joue les animations
		this.player.play("idle");

		//Limite du monde
		this.physics.world.setBounds(0, 0, 1200, 672);*/
	}

	/*
	runOption(){

		this.player.visible = false;

		this.quitter.visible = true;
		this.option.visible = true;
		//this.scene.pause();


		this.quitter.once('pointerup', function(event) { 

            //this.scene.launch();
			this.quitter.visible = false;
			this.option.visible = false;

			this.player.visible = true;
		}, this);

		console.log("et voila")

	}
	*/
	update(){
		/*
		//Si le joueur arrivé à la porte, lancement stage suivant
		if(this.player.x > 1200+8){
			this.scene.start("Level3");
			this.player.x = this.player.x + 10;
		}

		if(this.player.x < 8){
			this.player.x = this.player.x + 10;
		}*/
	}
}

class Level extends Phaser.Scene {
	
	init(arg) {
		this.nameMap = arg[0]; //nom de la map
		this.xDepart  = arg[1]; //coordoné X de départ du joueur
		this.yDepart = arg[2]; //coordoné Y de départ du joueur
		this.porteY = arg[3]; //coordoné Y de la porte (sortie de map)
	}

	/** @returns {void} */
	editorCreate() {

		// Création carte/jeu de tuile
		const carte = this.make.tilemap({key : this.nameMap});
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
		//const player = this.physics.add.sprite(32, 455, "1 idle", 0);
		const player = this.physics.add.sprite(this.xDepart, this.yDepart, "1 idle", 0);
		player.scaleX = 3;
		player.scaleY = 3;

		player.setCollideWorldBounds(true);

		// ennemy
		const ennemy = this.add.sprite(32, 265, "ennemy", 0);
		ennemy.scaleX = 1/2;
		ennemy.scaleY = 1/2;

		// player (components)
		new Physics(player);
		const mouvementPlayer = new Mouvement(player);

		// ennemy (components)
		new Physics(ennemy);

		const ennemyMouvement = new Mouvement(ennemy);
		ennemyMouvement.playable = false;
	
		const question = new Question(this);



		//ajout collision layer - joueur/ennemy
		this.physics.add.collider(player, [fond,platforme,demiPlatforme]);
		this.physics.add.collider(ennemy, [fond,platforme,demiPlatforme]);

		//ajout collision joueur - ennemy
		this.physics.add.collider(ennemy, player);

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
		const option = this.add.image(500, 294, "feuilleOption").setScrollFactor(0);
		option.scaleX = 0.8;
		option.scaleY = 0.8;

		// quitter
		const quitter = this.add.image(710, 100, "quitter").setScrollFactor(0);
		quitter.scaleX = 0.07;
		quitter.scaleY = 0.07;

		//annimation boutons
		new PushOnClick(quitter);

		option.visible = false;
		quitter.visible = false;

		option.setImmovable = true;

		////			/////			////
		
		this.scene.launch("PointDeVie");
		this.scene.sendToBack();

		const move = true

		this.sur = new PointDeVie();
		this.question = question;
		this.player = player;
		this.mouvementPlayer = mouvementPlayer;
		this.move = move;
		this.carte = carte;
		this.ennemy = ennemy;
		this.fond = fond;
		this.platforme = platforme;
		this.demiPlatforme = demiPlatforme;
		this.quitter = quitter;
		this.option = option;

		this.ennemyX = this.ennemy.x;
		this.ennemyY = this.ennemy.y;
		this.i = 0;
		this.pv = 0;
		this.timer = 0;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	fond;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	platforme;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	demiPlatforme;
	/** @type {Phaser.GameObjects.Sprite} */
	player;
	/** @type {Phaser.GameObjects.Sprite} */
	quitter;
	/** @type {Phaser.GameObjects.Sprite} */
	option;
	/** @type {Phaser.Tilemaps.Tilemap} */
	carte;

	sur;
	ennemyX;
	ennemyY;
	i;
	pv;
	timer;

	runOption(){

		this.move = false;


		this.quitter.visible = true;
		this.option.visible = true;

		
		this.quitter.once('pointerup', function(event) { 

			this.quitter.visible = false;
			this.option.visible = false;

			this.move = true;
		}, this);

	}

	create() {

		this.editorCreate();

	
		//perso joue les animations
		this.player.play("idle");
		this.ennemy.play("idleN");


		//Limite du monde
		this.physics.world.setBounds(0, 0, 1200, 672);

	}

	update(){

		if (!this.move){
			this.mouvementPlayer.stop();
		}

		//quand on clique, on passe a autre chose
		this.player.once('pointerup',this.runOption, this);

		//Si le joueur arrivé à la porte, lancement stage suivant
		if(this.player.x > 1175){
			
			if(this.player.y <= this.porteY[1] && this.player.y > this.porteY[0]){

				//flash quand on sors du stage
				this.cameras.main.flash();

				this.player.x = 1160;
				this.move = false;
				
				this.question.runQuestion();
			}
		}

		////////////////////////////////////////////////////// Mouvement entité
					//timer avant deplacement par rapport au joueur
					this.timer+=1;
					if(this.timer === 2){
					this.physics.moveToObject(this.ennemy,this.player,200);

					// si les coordonnée de la frame precedante et actuelle sont === on fait bouger l'entité
					if(Math.abs(this.ennemy.x - this.ennemyX) < 0.1 && Math.abs(this.ennemy.y - this.ennemyY) < 0.1){
						this.i+= 1;
					}
					if(this.i>= 50){
						this.ennemy.y -= 110;
						this.ennemy.x -= 10;
						this.i = 0;	
					}
					this.timer=0;
				
					//////////////////////////////////////////////////////////

				///redefinition des ancienne valeur de coordonnée au novelle
				this.ennemyX = this.ennemy.x;
				this.ennemyY = this.ennemy.y;
			}
			//condition de collision entre l'ennemy et le joueur
			//toucher 1 fois , 1 vie de perdu et ainsi de suite jusqu'au game over
			if(this.physics.collide(this.player,this.ennemy)){
				console.log("ca touche");
				this.player.x +=80;
				this.pv+=1;
				this.sur.premierCoeur();

				if(this.pv === 2){
				}
				if(this.pv === 3){
				}	
			}	

	}
}
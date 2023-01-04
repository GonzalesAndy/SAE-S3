class Level extends Phaser.Scene {
	
	/*
	this.nameMap -> nom de la map
	this.xDepart -> coordoné X de départ du joueur
	this.yDepart -> coordoné Y de départ du joueur
	this.porteY -> coordoné Y de la porte (sortie de map)
	*/
	init(arg){

		//En fonction de quel map est appelé, on change les paramettres
		switch(arg[0]){
			case 1 : //si map1
				this.nameMap = "map1";
				this.xDepart  = 32;
				this.yDepart = 455;
				this.porteY = [0,150];
				break;
			case 2 : //si map2
				this.nameMap = "map2";
				this.xDepart  = 100;
				this.yDepart = 100;
				this.porteY = [312,360];
				break;
		}//Fin case

		//En fonction de quel personnage a été choisi (homme/femme)
		switch(arg[1]){
			case 1 :
				this.nomPerso = "idleF";
				break;
			case 2 :
				this.nomPerso = "idleG";
				break;
		} //Fin case
		this.intPerso = arg[1];
		this.vitesseEnnemy = arg[2];
		this.pointDeViePerso = arg[3];

	}// Fin init

	/** @returns {void} */
	editorCreate() {

		// Création carte/jeu de tuile
		const carte = this.make.tilemap({key : this.nameMap});
		const tileSet1 = carte.addTilesetImage("JeuTuile","JeuTuile");

		//Création "Layer"
		const fond = carte.createLayer("Fond", [tileSet1]);
		const platforme = carte.createLayer("Platforme", [tileSet1]);

		//Création collision layer
		fond.setCollisionByProperty({ estSolide: true });
		platforme.setCollisionByProperty({ estSolide: true });

		// player
		const player = this.physics.add.sprite(this.xDepart, this.yDepart, this.nomPerso, 0);
		player.scaleX = 1/2;
		player.scaleY = 1/2;
		player.setCollideWorldBounds(true);

		// player (components)
		new Physics(player);
		const mouvementPlayer = new Mouvement(player, this.nomPerso);

		// ennemy
		const ennemy = this.add.sprite(32, 265, "ennemy", 0);
		ennemy.scaleX = 1/2;
		ennemy.scaleY = 1/2;

		// ennemy (components)
		new Physics(ennemy);

		//ajout collision layer - joueur/ennemy
		this.physics.add.collider(player, [fond,platforme]);

		//ajout collision joueur - ennemy
		this.physics.add.collider(ennemy, player);

		//limité la caméra
		this.cameras.main.setBounds(0, 0, 1200, 672);

		// ancrage de la caméra sur le joueur
		this.cameras.main.startFollow(player); 

		//flash quand on entre dans le stage
		this.cameras.main.flash();

		//quand on appuie sur entrer, on lance les options
		this.input.keyboard.on('keydown-ENTER', function(){
			this.scene.launch('Option');
			this.scene.pause('Level');
			this.scene.sendToBack();
		}, this);


		this.sur = new PointDeVie(this);
		this.sur.pntDeVie = this.pointDeViePerso;
		this.sur.perd();

		this.move = true;

		this.player = player;
		this.mouvementPlayer = mouvementPlayer;
		this.ennemy = ennemy;

		///    ///    ///    Test    ///    ///    ///


		///    ///    ///    ////    ///    ///    ///



		this.events.emit("scene-awake");
	} //Fin editorCreate

	/** @type {Phaser.GameObjects.components} */
	//question;
	/** @type {Phaser.GameObjects.components} */
	sur;
	/** @type {boolean} */
	player;
	/** @type {Phaser.GameObjects.Sprite} */
	player;
	/** @type {Phaser.GameObjects.components} */
	mouvementPlayer;
	/** @type {Phaser.GameObjects.components} */
	//ennemyMouvement;
	/** @type {Phaser.GameObjects.Sprite} */
	ennemy;

	create() {

		this.editorCreate();

		//perso joue les animations
		if(this.nomPerso == "idleF"){
			this.player.play("idleF");
		}else if(this.nomPerso == "idleG"){
			this.player.play("idleG");
		} // Fin else if

		this.ennemy.play("idleN");

		//Limite du monde
		//this.physics.world.setBounds(0, 0, 2880, 960);
		this.physics.world.setBounds(0, 0, 1200, 672);

	} // Fin create()

	update(){

		//this.ennemyMouvement.suivre(this.player);
        this.physics.moveToObject(this.ennemy, this.player, this.vitesseEnnemy);
		//this.mouvementPlayer.update();

		if (!this.move){
			this.mouvementPlayer.stop();
		} // Fin if

		//Si le joueur arrivé à la limite du monde, lancement stage suivant 2880 ou 1175
		if(this.player.x > 1165){
			
			//Si le joueur arrivé à la porte, lancement stage suivant
			if(this.player.y <= this.porteY[1] && this.player.y > this.porteY[0]){

				//flash quand on sors du stage
				//this.cameras.main.flash();

				this.player.x = 1160;
				this.move = false;
				this.scene.launch('Question',{ nameMap: this.nameMap, intPerso: this.intPerso , vitesseEnnemy: this.vitesseEnnemy, pointDeViePerso : this.pointDeViePerso});
				this.scene.pause('Level');
				this.scene.sendToBack();

			} //Fin if
		} // Fin if

		//Si le joueur touche l'ennemy 
		if( this.player.x - 32 <= this.ennemy.x + 32 &&
			this.player.x + 32 >= this.ennemy.x - 32 &&
			this.player.y - 32 <= this.ennemy.y + 32 &&
			this.player.y + 32 >= this.ennemy.y - 32){
			
			// On enlève un point de vie et on recule l'ennemy
			this.sur.pntDeVie -= 1;
			this.pointDeViePerso -=1;
			this.sur.perd();
			this.ennemy.x -= 100;
			this.ennemy.y -= 100;
		} // Fin if

	//console.log(this.sur.pntDeVie)

	} //Fin update()
} //Fin class
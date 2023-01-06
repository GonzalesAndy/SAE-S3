class Level extends Phaser.Scene {
	
	/*
	arg[0] {
		this.nameMap -> nom de la map
		this.xDepart -> coordoné X de départ du joueur
		this.yDepart -> coordoné Y de départ du joueur
		this.porteY -> coordoné Y de la porte (sortie de map)
	}
	arg[4]{
		this.questionRecap -> tableau de question déja vue, nombre de bonne réponse
	}*/
	init(arg){

		//En fonction de quel map est appelé, on change les paramettres
		switch(arg[0]){
			case 1 : //si map1
				this.nomMap = "map1";
				this.xDepart  = 32;
				this.yDepart = 455;
				this.porteY = [0,150];
				break;
			case 2 : //si map2
				this.nomMap = "map2";
				this.xDepart  = 100;
				this.yDepart = 100;
				this.porteY = [312,360];
				break;
		} //Fin case

		//En fonction de quel personnage a été choisi (femme/homme)
		switch(arg[1]){
			case 1 : // si femme
				this.nomPerso = "idleF";
				break;
			case 2 : // si homme
				this.nomPerso = "idleG";
				break;
		} //Fin case
		this.intPerso = arg[1];
		this.vitesseEnnemi = arg[2];
		this.pointDeViePerso = arg[3];
		this.questionRecap = arg[4];

	} // Fin init

	/** @returns {void} */
	editorCreate() {

		// Création carte/jeu de tuile
		const carte = this.make.tilemap({key : this.nomMap});
		const tileSet1 = carte.addTilesetImage("JeuTuile","JeuTuile");

		//Création "Layer"
		const fond = carte.createLayer("Fond", [tileSet1]);
		const platforme = carte.createLayer("Platforme", [tileSet1]);

		//Création collision layer
		fond.setCollisionByProperty({ estSolide: true });
		platforme.setCollisionByProperty({ estSolide: true });

		// player
		const joueur = this.physics.add.sprite(this.xDepart, this.yDepart, this.nomPerso, 0);
		joueur.scaleX = 1/2;
		joueur.scaleY = 1/2;
		joueur.setCollideWorldBounds(true);

		// player (components)
		new Physics(joueur);
		new Mouvement(joueur, this.nomPerso);

		// ennemy
		const ennemi = this.add.sprite(32, 265, "ennemy", 0);
		ennemi.scaleX = 1/2;
		ennemi.scaleY = 1/2;

		// ennemy (components)
		new Physics(ennemi);

		//ajout collision layer - joueur/ennemy
		this.physics.add.collider(joueur, [fond,platforme]);

		//ajout collision joueur - ennemy
		this.physics.add.collider(ennemi, joueur);

		//limité la caméra
		this.cameras.main.setBounds(0, 0, 1200, 672);

		// ancrage de la caméra sur le joueur
		this.cameras.main.startFollow(joueur); 

		//flash quand on entre dans le stage
		this.cameras.main.flash();

		//quand on appuie sur entrer, on lance les options
		this.input.keyboard.on('keydown-ENTER', function(){
			this.scene.launch('Option');
			this.scene.pause('Level');
			this.scene.sendToBack();
		}, this);

		this.scenePointDeVie = new PointDeVie(this);
		this.scenePointDeVie.pntDeVie = this.pointDeViePerso;
		this.scenePointDeVie.perdVie();

		this.joueur = joueur;
		this.ennemi = ennemi;

		this.events.emit("scene-awake");
	} //Fin editorCreate

	/** @type {Phaser.GameObjects.components} */
	scenePointDeVie;
	/** @type {Phaser.GameObjects.Sprite} */
	joueur;
	/** @type {Phaser.GameObjects.Sprite} */
	ennemi;

	create() {

		this.editorCreate();

		this.ennemi.play("idleN");
		//Limite du monde
		this.physics.world.setBounds(0, 0, 1200, 672);

	} // Fin create()

	update(){

		//this.ennemyMouvement.suivre(this.player);
        this.physics.moveToObject(this.ennemi, this.joueur, this.vitesseEnnemi);

		//Si le joueur arrivé à la porte, lancement stage suivant
		if(this.joueur.x > 1165 && this.joueur.y <= this.porteY[1] && this.joueur.y > this.porteY[0]){

			this.joueur.x = 1160;
			this.scene.launch('Question',{ nameMap: this.nomMap, 
						intPerso: this.intPerso , 
						vitesseEnnemy: this.vitesseEnnemi, 
						pointDeViePerso : this.pointDeViePerso,
						questionRecap : this.questionRecap});
			this.scene.pause('Level');
			this.scene.sendToBack();

		} //Fin if

		//Si le joueur touche l'ennemy 
		if( this.joueur.x - 32 <= this.ennemi.x + 32 &&
			this.joueur.x + 32 >= this.ennemi.x - 32 &&
			this.joueur.y - 32 <= this.ennemi.y + 32 &&
			this.joueur.y + 32 >= this.ennemi.y - 32){
			
			// On enlève un point de vie et on recule l'ennemy
			this.scenePointDeVie.pntDeVie -= 1;
			this.pointDeViePerso -=1;
			this.scenePointDeVie.perdVie();
			this.ennemi.x -= 100;
			this.ennemi.y -= 100;
		} // Fin if

	} //Fin update()
} //Fin class
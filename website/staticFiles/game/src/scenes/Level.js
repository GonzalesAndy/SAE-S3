class Level extends Phaser.Scene {
	
	/*
	arg[0] {

		this.nomMap -> nom de la map

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

				this.double = false;
				this.tile = "JeuTuile";
				// fin de declaration des tiles
        
				this.xDepart  = 32;
				this.yDepart = 455;
				this.porte = [0,150];
				break;

			case 2 : //si map3
				this.nomMap = "map3";
				// declaration des tiles
				this.double = false;
				this.tile = "JeuTuile";
				// fin de declaration des tiles
				this.xDepart  = 31;
				this.yDepart = 696;
				this.porte = [2805,888];
				break;
			case 3 : //si map12
				this.nomMap = "map4";
				// declaration des tiles
				this.double = false;
				this.tile = "JeuTuile";
				// fin de declaration des tiles
				this.xDepart  = 72;
				this.yDepart = 744;
				this.porte = [2830,360];
				break;
			case 4 : //si map12
				this.nomMap = "map5";
				// declaration des tiles
				this.double = false;
				this.tile = "JeuTuile";
				// fin de declaration des tiles
				this.xDepart  = 52;
				this.yDepart = 840;
				this.porte = [2846,840];
				break;
			case 5 : //si map12
				this.nomMap = "map6";
				// declaration des tiles
				this.double = false;
				this.tile = "JeuTuile";
				// fin de declaration des tiles
				this.xDepart  = 41;
				this.yDepart = 792;
				this.porte = [2737,168];
				break;
			case 6 : //si map12
				this.nomMap = "map7";
				// declaration des tiles
				this.double = true;
				this.tile = "Frozen-Pixel-Art-Environment-Assets-Pack2";
				this.tile2 = "Frozen-Pixel-Art-Environment-Assets-Pack3";
				// fin de declaration des tiles
				this.xDepart  = 56;
				this.yDepart = 792;
				this.porte = [2846,888];
				break;
			case 7 : //si map12
				this.nomMap = "map8";
				// declaration des tiles
				this.double = true;
				this.tile = "Frozen-Pixel-Art-Environment-Assets-Pack2";
				this.tile2 = "Frozen-Pixel-Art-Environment-Assets-Pack3";
				// fin de declaration des tiles
				this.xDepart  = 849;
				this.yDepart = 2760;
				this.porte = [869,216];
				break;
			case 8 : //si map12
				this.nomMap = "map9";
				// declaration des tiles
				this.double = true;
				this.tile = "Frozen-Pixel-Art-Environment-Assets-Pack2";
				this.tile2 = "Frozen-Pixel-Art-Environment-Assets-Pack3";
				// fin de declaration des tiles
				this.xDepart  = 24;
				this.yDepart = 840;
				this.porte = [150,744];
				break;
			case 9 : //si map12
				this.nomMap = "map10";
				// declaration des tiles
				this.double = true;
				this.tile = "Frozen-Pixel-Art-Environment-Assets-Pack2";
				this.tile2 = "Frozen-Pixel-Art-Environment-Assets-Pack3";
				// fin de declaration des tiles
				this.xDepart  = 24;
				this.yDepart = 840;
				this.porte = [150,744];
				break;
				
			case 10 : //si map12
				this.nomMap = "map12";
				// declaration des tiles
				this.double = true;
				this.tile = "Desert-Pixel-Art-Environment-Assets-Pack2";
				this.tile2 = "Desert-Pixel-Art-Environment-Assets-Pack3";
				// fin de declaration des tiles
				this.xDepart  = 24;
				this.yDepart = 840;
				this.porte = [150,744];
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
		this.carte = carte;
		
		if(this.double == true){
				
			console.log("je suis double");
			const tileSet1 = carte.addTilesetImage(this.tile,this.tile);
			const tileSet2 = carte.addTilesetImage(this.tile2,this.tile2);
			
		

			//Création "Layer"
			this.fond = carte.createLayer("Ciel", [tileSet1,tileSet2] );
			this.platforme = carte.createLayer("Sol+Mur", [tileSet1,tileSet2]);
		
		}
		// si la map posséde un layer
		else{
			console.log("je suis pas double");
			const tileSet1 = carte.addTilesetImage(this.tile,this.tile);	


			//Création "Layer"
			this.fond = carte.createLayer("Ciel", [tileSet1] );
			this.platforme = carte.createLayer("Sol+Mur", [tileSet1]);
		}

		//Création collision layer
		this.fond.setCollisionByProperty({ estSolide: true });
		this.platforme.setCollisionByProperty({ estSolide: true });


		// joueur
		const joueur = this.physics.add.sprite(this.xDepart, this.yDepart, this.nomPerso, 0);
		joueur.scaleX = 1/2;
		joueur.scaleY = 1/2;
		joueur.setCollideWorldBounds(true);


		// joueur (components)

		new Physics(joueur);
		new Mouvement(joueur, this.nomPerso);

		// ennemy
		const ennemi = this.add.sprite(32, 265, "ennemy", 0);
		ennemi.scaleX = 1/2;
		ennemi.scaleY = 1/2;

		// ennemy (components)
		new Physics(ennemi);

		//ajout collision layer - joueur/ennemy

		this.physics.add.collider(joueur, [this.fond,this.platforme]);


		//ajout collision joueur - ennemy
		this.physics.add.collider(ennemi, joueur);

		//limité la caméra
		this.cameras.main.setBounds(0, 0, this.carte.widthInPixels, this.carte.heightInPixels);

		// ancrage de la caméra sur le joueur
		this.cameras.main.startFollow(joueur); 


		// initialisation des pixels au deplacement de la caméra
		this.cameras.main.roundPixels = true;

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


	carte

	create() {

		this.editorCreate();

		this.ennemi.play("idleN");
		//Limite du monde

		this.physics.world.setBounds(0, 0, this.carte.widthInPixels, this.carte.heightInPixels);

	} // Fin create()

	update(){


		//this.ennemyMouvement.suivre(this.joueur);
        this.physics.moveToObject(this.ennemi, this.joueur, this.vitesseEnnemi);

		//Si le joueur arrivé à la porte, lancement stage suivant
		if(this.joueur.x >= this.porte.x - 1 && this.joueur.x <= this.porte.x + 1 && this.joueur.y >= this.porte.y - 1 && this.joueur.y <= this.porte.y + 1){

			this.joueur.x = 1160;
			this.scene.launch('Question',{ nomMap: this.nomMap, 

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
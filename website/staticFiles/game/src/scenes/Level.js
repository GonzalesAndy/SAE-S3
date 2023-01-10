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
				this.xDepart  = 138;
				this.yDepart = 784;
				this.porte = {x:2726,y:256};
				this.fantome = {x:-50,y:750};
				break;
			case 2 : //si map2
				this.nomMap = "map2";
				this.double = false;
				this.tile = "JeuTuile";
				// fin de declaration des tiles
				this.xDepart  = 404;
				this.yDepart = 1840;
				this.porte = {x:1326,y:208};
				this.fantome = {x:-50,y:1840};
				break;
			case 3 : //si map3
				this.nomMap = "map3";
				// declaration des tiles
				this.double = false;
				this.tile = "JeuTuile";
				// fin de declaration des tiles
				this.xDepart  = 31;
				this.yDepart = 696;
				this.porte = {x:2751,y:880};
				this.fantome = {x:-50,y:688};
				break;
			case 4 : //si map4
				this.nomMap = "map4";
				// declaration des tiles
				this.double = false;	
				this.tile = "JeuTuile";
				// fin de declaration des tiles
				this.xDepart  = 72;
				this.yDepart = 744;
				this.porte = {x:2821,y:496};
				this.fantome = {x:-100,y:688};
				break;
			case 5 : //si map5
				this.nomMap = "map5";
				// declaration des tiles
				this.double = false;
				this.tile = "JeuTuile";
				// fin de declaration des tiles	
				this.xDepart  = 173;
				this.yDepart = 784;
				this.porte = {x:2475,y:880};
				this.fantome = {x:-100,y:688};
				break;
			case 6 : //si map6
				this.nomMap = "map6";
				// declaration des tiles
				this.double = false;
				this.tile = "JeuTuile";
				// fin de declaration des tiles
				this.xDepart  = 150;
				this.yDepart = 784;
				this.porte = {x:2804,y:160};
				this.fantome = {x:-100,y:688};
				break;
			case 7 : //si map7
				this.nomMap = "map7";
				// declaration des tiles
				this.double = true;
				this.tile = "Frozen-Pixel-Art-Environment-Assets-Pack2";
				this.tile2 = "Frozen-Pixel-Art-Environment-Assets-Pack3";
				// fin de declaration des tiles
				this.xDepart  = 56;
				this.yDepart = 792;
				this.porte = {x:2828,y:880};
				this.fantome = {x:-100,y:688};
				break;
			case 8 : //si map8
				this.nomMap = "map8";
				// declaration des tiles
				this.double = true;
				this.tile = "Frozen-Pixel-Art-Environment-Assets-Pack2";
				this.tile2 = "Frozen-Pixel-Art-Environment-Assets-Pack3";
				// fin de declaration des tiles
				this.xDepart  = 849;
				this.yDepart = 2760;
				this.porte = {x:855,y:208};
				this.fantome = {x:0,y:2752};
				break;
			case 9 : //si map9
				this.nomMap = "map9";
				// declaration des tiles
				this.double = true;
				this.tile = "Frozen-Pixel-Art-Environment-Assets-Pack2";
				this.tile2 = "Frozen-Pixel-Art-Environment-Assets-Pack3";
				// fin de declaration des tiles
				this.xDepart  = 169;
				this.yDepart = 160;
				this.porte = {x:2785,y:784};
				this.fantome = {x:-10,y:160};
				break;
			case 10 : //si map10
				this.nomMap = "map10";
				// declaration des tiles
				this.double = true;
				this.tile = "Frozen-Pixel-Art-Environment-Assets-Pack2";
				this.tile2 = "Frozen-Pixel-Art-Environment-Assets-Pack3";
				// fin de declaration des tiles
				this.xDepart  = 87;
				this.yDepart = 880;
				this.porte ={x:2816,y:448};
				this.fantome = {x:-40,y:880};
				break;			
			case 11 : //si map11
				this.nomMap = "map11";
				// declaration des tiles
				this.double = true;
				this.tile = "Desert-Pixel-Art-Environment-Assets-Pack2";
				this.tile2 = "Desert-Pixel-Art-Environment-Assets-Pack3";
				// fin de declaration des tiles
				this.xDepart  = 136;
				this.yDepart = 736;
				this.porte = {x:2746,y:880};
				this.fantome = {x:-40,y:736};
				break;
			case 12 : //si map12
				this.nomMap = "map12";
				// declaration des tiles
				this.double = true;
				this.tile = "Desert-Pixel-Art-Environment-Assets-Pack2";
				this.tile2 = "Desert-Pixel-Art-Environment-Assets-Pack3";
				// fin de declaration des tiles
				this.xDepart  = 187;
				this.yDepart = 832;
				this.porte = {x:2792,y:880};
				this.fantome = {x:-40,y:832};
				break;
			case 13 : //si map13
				this.nomMap = "map13";
				// declaration des tiles
				this.double = true;
				this.tile = "Desert-Pixel-Art-Environment-Assets-Pack2";
				this.tile2 = "Desert-Pixel-Art-Environment-Assets-Pack3";
				// fin de declaration des tiles
				this.xDepart  = 136;
				this.yDepart = 832;
				this.porte = {x:2830,y:256};
				this.fantome = {x:-40,y:832};
				break;
			case 14 : //si map14
				this.nomMap = "map14";
				// declaration des tiles
				this.double = true;
				this.tile = "Desert-Pixel-Art-Environment-Assets-Pack2";
				this.tile2 = "Desert-Pixel-Art-Environment-Assets-Pack3";
				// fin de declaration des tiles
				this.xDepart  = 166;
				this.yDepart = 592;
				this.porte = {x:182,y:63};
				this.fantome = {x:-40,y:592};
				break;
			case 15 : //si map15
				this.nomMap = "map15";
				// declaration des tiles
				this.double = true;
				this.tile = "Desert-Pixel-Art-Environment-Assets-Pack2";
				this.tile2 = "Desert-Pixel-Art-Environment-Assets-Pack3";
				// fin de declaration des tiles
				this.xDepart  = 215;
				this.yDepart = 496;
				this.porte ={x:2780,y:352};
				this.fantome = {x:-40,y:496};
				break;
			case 16 : //si map16
				this.nomMap = "map16";
				// declaration des tiles
				this.double = true;
				this.tile = "Frozen-Pixel-Art-Environment-Assets-Pack2";
				this.tile2 = "Frozen-Pixel-Art-Environment-Assets-Pack3";
				// fin de declaration des tiles
				this.xDepart  = 204;
				this.yDepart = 736;
				this.porte ={x:2764,y:304};
				this.fantome = {x:-40,y:736};
				break;
			case 17 : //si map17
				this.nomMap = "map17";
				// declaration des tiles
				this.double = true;
				this.tile = "Frozen-Pixel-Art-Environment-Assets-Pack2";
				this.tile2 = "Frozen-Pixel-Art-Environment-Assets-Pack3";
				// fin de declaration des tiles
				this.xDepart  = 242;
				this.yDepart = 544;
				this.porte ={x:2806,y:496};
				this.fantome = {x:-40,y:544};
				break;
			case 18 : //si map18
				this.nomMap = "map18";
				// declaration des tiles
				this.double = true;
				this.tile = "Desert-Pixel-Art-Environment-Assets-Pack2";
				this.tile2 = "Desert-Pixel-Art-Environment-Assets-Pack3";
				// fin de declaration des tiles
				this.xDepart  = 189;
				this.yDepart = 736;
				this.porte ={x:2799,y:832};
				this.fantome = {x:-40,y:736};
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
		this.old_random = arg[5];
		this.temps = arg[6];

		//this.old_score = arg[8];

	} // Fin init

	/** @returns {void} */
	editorCreate() {


		// Création carte/jeu de tuile
		const carte = this.make.tilemap({key : this.nomMap});
		this.carte = carte;

		this.limiteBas = this.yDepart + this.carte.heightInPixels;
		
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
		joueur.setCollideWorldBounds(false);


		// joueur (components)

		new Physics(joueur);
		new Mouvement(joueur, this.nomPerso);


		// ennemy
		const ennemi = this.add.sprite(this.fantome.x,this.fantome.y, "ennemy", 0);
		ennemi.scaleX = 1/2;
		ennemi.scaleY = 1/2;
		
		//porte
		const porte_fin = this.add.sprite(this.porte.x,this.porte.y,"porte_sprite_ouvrir");
		porte_fin.scaleX = 1/2;
		porte_fin.scaleY = 1/2;

		
		// porte (physics)
		new Physics(porte_fin);

		// ennemy (components)
		new Physics(ennemi);

		//ajout collision layer - joueur/ennemy

		this.physics.add.collider(joueur, [this.fond,this.platforme]);


		//ajout collision joueur - ennemy
		this.physics.add.collider(ennemi, joueur);

		//ajout colision porte -joueur et sol

		this.physics.add.collider(porte_fin, [this.platforme,this.joueur]);

		porte_fin.setSize(porte_fin.width, porte_fin.height / 2, true);

		//limité la caméra
		this.cameras.main.setBounds(0, 0, this.carte.widthInPixels, this.carte.heightInPixels);
		//this.cameras.main.setBounds(0, 0, 5, 5);

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

		this.physics.add.collider(joueur,porte_fin,function(joueur,porte_fin){
		
			porte_fin.play("ouverture-porte");
		})


		this.scenePointDeVie = new PointDeVie(this, this.intPerso);

		this.scenePointDeVie.pntDeVie = this.pointDeViePerso;
		//this.scenePointDeVie.pntDeVie = 0;
		this.scenePointDeVie.perdVie();

		this.timer = new Timer(this);
		this.timer.setTimer(this.temps[0], this.temps[1], this.temps[2]);

		if(this.temps === undefined){
			this.temps= 0;
		}		

		if(this.old_random === undefined){
			this.old_random = 0;
		}
		if(this.nombre_random === undefined){
			this.nombre_random = 0;
		}


		this.joueur = joueur;
		this.ennemi = ennemi;
		this.porte_fin = porte_fin;


		this.events.emit("scene-awake");
	} //Fin editorCreate

	/** @type {Phaser.GameObjects.components} */
	scenePointDeVie;
	/** @type {Phaser.GameObjects.Sprite} */
	joueur;
	/** @type {Phaser.GameObjects.Sprite} */
	ennemi;
	nombre_random;
	
	old_random;

	carte;

	timer;
	temps;
	limiteBas;
	porte_fin;

	create() {

		this.editorCreate();
		
		

		this.ennemi.play("idleN");
		//Limite du monde

		this.physics.world.setBounds(0, 0, this.carte.widthInPixels, this.carte.heightInPixels);

	} // Fin create()

	update(time,delta){
		this.porte_fin.body.moves = false;
	
		this.timer.update(time,delta);
		console.log("x",this.joueur.x);
		console.log("y",this.joueur.y);
		
		//condition de mort de chute du joueur
		if(this.joueur.y>this.limiteBas){
			this.scenePointDeVie.pntDeVie -= 1;
			this.pointDeViePerso -=1;
			this.scenePointDeVie.perdVie();
		}

		//this.ennemyMouvement.suivre(this.joueur);
        this.physics.moveToObject(this.ennemi, this.joueur, this.vitesseEnnemi);

		//Si le joueur arrivé à la porte, lancement stage suivant
		if(this.joueur.x >= this.porte.x - 1 && this.joueur.x <= this.porte.x + 1 && this.joueur.y >= this.porte.y - 1 && this.joueur.y <= this.porte.y + 1){
		
		while(this.nombre_random === this.old_random){
				this.nombre_random = Math.floor(Math.random() * 10) + 1;

			}
			this.joueur.x = 1160;
			this.scene.launch('Question',{ nomMap: this.nomMap, 

						intPerso: this.intPerso , 
						vitesseEnnemy: this.vitesseEnnemi, 
						pointDeViePerso : this.pointDeViePerso,
						questionRecap : this.questionRecap,
						nombre_random: this.nombre_random,
						temps: this.timer.getTimer()});
			
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
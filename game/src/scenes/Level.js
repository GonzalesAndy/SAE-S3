
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// carte
		const carte = this.add.tilemap("carte");
		carte.addTilesetImage("Nature_environment_01", "Nature_environment_01");

		// sky_1
		carte.createLayer("sky", ["Nature_environment_01"], 0, 0);

		// background_near_1
		carte.createLayer("background_near", ["Nature_environment_01"], 0, 0);

		// foreground_1
		const foreground_1 = carte.createLayer("Foreground", ["Nature_environment_01"], 0, 0);

		// background_far_1
		carte.createLayer("background_far", ["Nature_environment_01"], 0, 0);

		// player
		const player = this.add.sprite(419, 254, "1 idle", 0);
		player.scaleX = 3;
		player.scaleY = 3;

		// ennemy
		const ennemy = this.add.sprite(366, 400, "10 idle", 0);
		ennemy.scaleX = 3;
		ennemy.scaleY = 3;

		// player (components)
		new Physics(player);
		new Mouvement(player);

		// ennemy (components)
		new Physics(ennemy);
		const ennemyMouvement = new Mouvement(ennemy);
		ennemyMouvement.playable = false;

		this.cameras.main.setBounds(0, 0, 3200, 1640);
		// ancrage de la caméra sur le joueur
		this.cameras.main.startFollow(player); 

		//  Listen for this signal to reset once the fade is over
		//this.scene.onFadeComplete.add(resetFade, this);

		//this.input.onDown.add(fade, this);

		this.player = player;
		this.carte = carte;
		this.ennemy = ennemy;
		this.foreground_1 = foreground_1;
		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Sprite} */
	player;
	/** @type {Phaser.Tilemaps.Tilemap} */
	carte;

	/* START-USER-CODE */
	lescollision(){

		this.physics.add.collider(this.player, this.foreground_1);
		//this.player.add.collider.WorldBounds(true);
		this.physics.add.collider(this.ennemy, this.foreground_1);
		this.physics.add.collider(this.ennemy, this.player);
		this.foreground_1.setCollision([74,93,94,99,117,120,140,141,142,144]);
	

	}

	create() {

		this.editorCreate();
		this.player.play("idle");
		this.ennemy.play("idleN");
	

		this.physics.world.setBounds(0, 0, 3200, 1640);
		//  ajout du champs de la caméra de taille identique à celle du monde



		this.lescollision(); 
	}

	update(){
		
		if(this.player.x < 0+8){
			//this.cameras.main.fadeOut(450, 255);
			console.log(this.player.x, this.player.y);
			this.scene.start("SecondStage");
		}

        //this.cameras.main.fadeOut(450, 255);

	}

	fade() {

		//  You can set your own fade color and duration
		this.camera.fade(0x000000, 4000);

	}

	resetFade() {

		this.camera.resetFX();

	}

	
}


// You can write more code here

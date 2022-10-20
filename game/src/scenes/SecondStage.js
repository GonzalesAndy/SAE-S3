
// You can write more code here

/* START OF COMPILED CODE */

class SecondStage extends Phaser.Scene {

	constructor() {
		super("SecondStage");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {


		// carte
		const carte = this.add.tilemap("carte");
		carte.addTilesetImage("Nature_environment_01", "Nature_environment_01");

		// foreground_1
		const foreground_1 = carte.createLayer("Foreground", ["Nature_environment_01"], -700, -48);

		// player
		const player = this.add.sprite(778, 312, "1 idle", 0);
		player.scaleX = 3;
		player.scaleY = 3;

		// player (components)
		new Physics(player);
		new Mouvement(player);

		this.cameras.main.setBounds(0, 0, 3200, 1640);
		this.cameras.main.startFollow(player); 

		this.foreground_1 = foreground_1;
		this.player = player;
		this.carte = carte;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	foreground_1;
	/** @type {Phaser.GameObjects.Sprite} */
	player;
	/** @type {Phaser.Tilemaps.Tilemap} */
	carte;

	/* START-USER-CODE */

	lescollision(){

		this.physics.add.collider(this.player, this.foreground_1);
		//this.player.add.collider.WorldBounds(true);
		//this.physics.add.collider(this.ennemy, this.foreground_1);
		//this.physics.add.collider(this.ennemy, this.player);
		this.foreground_1.setCollision([74,93,94,99,117,120,140,141,142,144]);
	}

	create() {

		this.editorCreate();
		this.player.play("idle");
		this.lescollision();
		this.physics.world.setBounds(0, 0, 3200, 1640);
		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("SecondStage"));
	}

	update(){
		if(this.player.x > 800-8){
			//this.cameras.main.fadeOut(450, 255);
			this.scene.start("Level");
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
/* END-USER-CODE */

/* END OF COMPILED CODE */

// You can write more code here

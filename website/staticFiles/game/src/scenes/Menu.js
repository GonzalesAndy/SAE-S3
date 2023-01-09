class Menu extends Phaser.Scene {

	constructor() {
		super("Menu");

	} // Fin constructor()

	/** @returns {void} */
	editorCreate() {

		// fond
		const fond = this.add.tileSprite(0, 0, 1200, 672, "background");
		fond.setOrigin(0, 0);

		// titre
		const titre = this.add.image(500, 142, "logo");

		// start
		const titreStart = this.add.image(500, 550, "start");
		titreStart.scaleX = 0.75;
		titreStart.scaleY = 0.75;

		// joueur
		const joueur = this.add.sprite(59, 420, "idleF", 0);
		joueur.scaleX = 1/2;
		joueur.scaleY = 1/2;
		joueur.play('walkF');

		// engrenage
		const engrenage = this.add.image(950, 70, "engrenage");
		engrenage.scaleX = 0.15;
		engrenage.scaleY = 0.15;

		//annimation boutons
		new PushOnClick(engrenage);

		const choixPerso = new ChoixPerso(this);

		//quand on appuie sur entrer, on run le jeu
		this.input.keyboard.on('keydown-ENTER', function(){
			choixPerso.runChoixPerso();
		}, this);

		this.bringToTop;
		console.log("mENU");

		this.fond = fond;
		this.engrenage = engrenage;

		this.events.emit("scene-awake");
	} // Fin editorCreate()

	/** @type {Phaser.GameObjects.TileSprite} */
	fond;
	/** @type {Phaser.GameObjects.Image} */
	engrenage;

	create() {
		this.editorCreate();

	} // Fin create()

	update() {

		//quand on clique sur l'engrenage, on affiche le menu
		this.engrenage.once('pointerup',function(){
			this.scene.launch('Option');
			this.scene.pause('Menu');
		}, this);

        // Faire bouger l'arrière plan
		this.fond.tilePositionX += 0.7;

	} // Fin update()
} //Fin class

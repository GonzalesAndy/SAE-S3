class Menu extends Phaser.Scene {

    constructor() {
        super("Menu");

    } // Fin constructor()

    /* @returns {void} */
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
        const walker = this.add.sprite(59, 420, "idleF", 0);
        walker.scaleX = 1/2;
        walker.scaleY = 1/2;

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

        this.background = background;
        this.titre = titre;
        this.start = start;
        this.walker = walker;
        this.engrenage = engrenage;

        this.events.emit("scene-awake");
    } // Fin editorCreate()

    /* @type {Phaser.GameObjects.TileSprite} */
    background;
    /* @type {Phaser.GameObjects.Image}*/
    titre;
    /* @type {Phaser.GameObjects.Image} */
    start;
    /* @type {Phaser.GameObjects.Sprite} */
    walker;
    /* @type {Phaser.GameObjects.Image}*/
    engrenage;

    create() {

        this.editorCreate();
        this.walker.play('walk');

    } // Fin create()

    update() {

        //quand on clique sur l'engrenage, on affiche le menu
        this.engrenage.once('pointerup',function(){
            this.scene.launch('Option');
            this.scene.pause('Menu');
        }, this);
        // Faire bouger l'arrière plan
        this.background.tilePositionX += 0.7;

    } // Fin update()
} //Fin class
class ChoixPerso{

    constructor(scene, intPerso){

        //Feuille
        const feuille = scene.add.image(500, 294, "feuille").setScrollFactor(0);
        feuille.scaleX = 1.3;
        feuille.scaleY = 1.3;
        feuille.visible = false;

        // Texte
        const choix1 = scene.add.text(0, 0, "Choix 1", { font: "45px Helvetica bold", fill: "#000000" }).setScrollFactor(0);
        Phaser.Display.Align.In.Center(choix1, feuille, -200, +150);
        choix1.visible = false;
        // Texte
        const choix2 = scene.add.text(0, 0, "Choix 2", { font: "45px Helvetica bold", fill: "#000000" }).setScrollFactor(0);
        Phaser.Display.Align.In.Center(choix2, feuille, +200, +150);
        choix2.visible = false;

        //Choix
        var choix;

		// player
		const player1 = scene.physics.add.sprite(0, 0, "1 idle", 0).setScrollFactor(0);
        Phaser.Display.Align.In.Center(player1, feuille, -200, 0);
        player1.body.setAllowGravity(false)
		player1.scaleX = 5;
		player1.scaleY = 5;

		// player2
		const player2 = scene.physics.add.sprite(0, 0, "1 idle", 0).setScrollFactor(0);
        Phaser.Display.Align.In.Center(player2, feuille, 200, 0);
        player2.body.setAllowGravity(false)
		player2.scaleX = 5;
		player2.scaleY = 5;

        player1.visible = false;
        player2.visible = false;

        player1.play("walk");
        player2.play("walk");

        new PushOnClick(player1);
        new PushOnClick(player2);
        
        this.feuille = feuille;
        this.choix1 = choix1;
        this.choix2 = choix2;
        this.choix = choix;
        this.player1 = player1;
        this.player2 = player2;
        this.scene = scene;
    
    }

	runChoixPerso(){

        //On rend tout visible 
		this.feuille.visible = true;
        this.choix1.visible = true;
        this.choix2.visible = true;
        this.player1.visible = true;
        this.player2.visible = true;

        this.player1.once('pointerup', function(event) { 
            this.choix = 1;
            this.scene.scene.start('Level', [1, 1]);
        }, this);
        this.player2.once('pointerup', function(event) { 
            this.choix = 2;
            this.scene.scene.start('Level', [1, 2]);
        }, this);

	}
}
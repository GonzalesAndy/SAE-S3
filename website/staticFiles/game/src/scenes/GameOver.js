class GameOver extends Phaser.Scene {

    init(data) {

        this.intPerso = data.intPerso;
        this.questionRecap = data.questionRecap;

    } // Fin constructor()

    /** @returns {void} */
    editorCreate() {

		// fond en fonction du personnage selectionnee
        var fond;
        if(this.intPerso == 1){
            fond = this.add.image(this.game.scale.width/2, this.game.scale.height/2, "gameOverLostF");
        } else {
            fond = this.add.image(512, 384, "gameOverLostM");
        } // Fin if else
        fond.scaleX = 1.17;
        //fond.scaleY = 1.17;

        // bouton pour recommencer
        const retryButton = this.add.image(0, 0, "retryButton");
        new PushOnClick(retryButton);
        Phaser.Display.Align.In.Center(retryButton, fond, 0, 320);
        
        // si le joueur n'a pas repondu a aucune question, le score est 0/0
        if(this.questionRecap == undefined){
            var texte = "0/0";
        } else {
            var texte = this.questionRecap[1] + "/" + this.questionRecap[0].length;
        } // Fin else if

        // affichage du score
        const score = this.add.text(150, 150, texte);
        score.setStyle({ "fontSize": "30px" });
        retryButton.once('pointerup', function(event) {
            this.scene.launch('Menu');
        }, this);
     
        this.events.emit("scene-awake");
    } // Fin editorCreate()

    create() {
        this.editorCreate();
    } // Fin create()

} // Fin class GameOver
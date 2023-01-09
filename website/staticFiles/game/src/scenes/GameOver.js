class GameOver extends Phaser.Scene {

    init(data) {

        this.intPerso = data.intPerso;

    } // Fin constructor()

    /** @returns {void} */
    editorCreate() {

		// fond en fonction du personnage selectionnee
        var fond;
        if(this.intPerso == 1){
            fond = this.add.image(512, 384, "gameOverLostF");
        } else {
            fond = this.add.image(512, 384, "gameOverLostM");
        }

        const retryButton = this.add.image(0, 0, "retryButton");
        new PushOnClick(retryButton);
        Phaser.Display.Align.In.Center(retryButton, fond, 0, 320);
        
        this.scene.stop("Level");

        retryButton.once('pointerup', function(event) {
            
            this.scene.stop();
            this.scene.start("Menu");
        }, this);
     

        this.events.emit("scene-awake");
    } // Fin editorCreate()

    create() {
        this.editorCreate();
    } // Fin create()


} // Fin class GameOver
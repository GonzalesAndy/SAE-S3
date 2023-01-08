class GameOver extends Phaser.Scene {

    init(data) {

        this.intPerso = data.intPerso;

    } // Fin constructor()

    /** @returns {void} */
    editorCreate() {

		// fond en fonction du personnage selectionnee
        if(this.intPerso == 1){
            const fond = this.add.image(512, 384, "gameOverLostF");
        } else {
            const fond = this.add.image(512, 384, "gameOverLostM");
        }
        
        this.events.emit("scene-awake");
    } // Fin editorCreate()

    create() {
        this.editorCreate();
    } // Fin create()

} // Fin class GameOver
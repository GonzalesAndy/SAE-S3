class GameOver extends Phaser.Scene {

	constructor() {
		super("GameOver");

	} // Fin constructor()


	/** @returns {void} */
	editorCreate() {

		// progress
		const progress = this.add.text(500, 349, "Game Over", {});
		this.events.emit("scene-awake");
	} // Fin editorCreate()

	create() {
		this.editorCreate();
	} // Fin create()


} // Fin class GameOver
class Preload extends Phaser.Scene {

    constructor() {
        super("Preload");
    }

    /** @returns {void} */
    editorPreload() {

        this.load.pack("asset-pack", "staticFiles/game/assets/asset-pack.json");
    }

    /** @returns {void} */
    editorCreate() {

        // progress
        const progress = this.add.text(500, 349, "", {});
        progress.setOrigin(0.5, 0.5);
        progress.text = "0%";
        progress.setStyle({ "fontSize": "30px" });

        // progress (components)
        new PreloadText(progress);

        this.events.emit("scene-awake");
    }

    preload() {

        this.editorCreate();

        this.editorPreload();

        //load le menu
        this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start('Menu'));
    }

}
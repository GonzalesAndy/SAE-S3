
window.addEventListener('load', function () {

	var game = new Phaser.Game({
		max : {
			width: 1200,
			height: 672,
		},
		min : {
			width: 1200,
			height: 672,
		},
		type: Phaser.AUTO,
        backgroundColor: "#242424",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		},
		physics : {
			default : "arcade",
			arcade: {
				gravity : { y: 1250 },
				debug : true
			}
		}
	});
	
	game.scene.add('Boot', Boot, true);
	game.scene.add('Preload', Preload);
	game.scene.add('Menu', Menu);
	game.scene.add('PointDeVie', PointDeVie);
	game.scene.add('Level', Level);
});

class Boot extends Phaser.Scene {

	preload() {
		
		this.load.pack("pack", "assets/preload-asset-pack.json");

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Preload"));
	}
}
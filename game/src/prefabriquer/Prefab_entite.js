
// You can write more code here

/* START OF COMPILED CODE */

class Prefab_entité extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 405, y ?? 290, texture || "enemy_anim1", frame);
		this.play("idle_ent");
		this.scaleX = 5;
		this.scaleY = 5;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

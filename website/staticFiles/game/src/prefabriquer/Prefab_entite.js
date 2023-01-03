class Prefab_entité extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 405, y ?? 290, texture || "enemy_anim1", frame);
		this.play("idle_ent");
		this.scaleX = 5;
		this.scaleY = 5;
	}

}

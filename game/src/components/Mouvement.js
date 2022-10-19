
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

class Mouvement {

	constructor(gameObject) {
		this.gameObject = gameObject;
		gameObject["__Mouvement"] = this;

		/* START-USER-CTR-CODE */
		const scene = this.gameObject.scene

		this.cursors = scene.input.keyboard.createCursorKeys()
		this.playable = true;

		scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)

		/* END-USER-CTR-CODE */
	}

	/** @returns {Mouvement} */
	static getComponent(gameObject) {
		return gameObject["__Mouvement"];
	}

	/** @type {Phaser.GameObjects.Sprite} */
	gameObject;
	/** @type {boolean} */
	playable = true;

    updateMouvement()
    {
        const vel = 200;

        const player = this.gameObject;

        const body = player.body;

        /**@type {Phaser.Physics.Arcade.Body}*/

        if (this.cursors.left.isDown)
        {
            if(body.velocity.x > -vel){
                body.velocity.x -= 30;
            }

            player.flipX = true
            player.play('walk', true)
        }
        else if (this.cursors.right.isDown)
        {
            if(body.velocity.x < vel){
                body.velocity.x += 30;
            }

            player.flipX = false
            player.play('walk', true)
        }
        else if (this.cursors.up.isDown)
        {
            //jump en fonction de l'appuie
            if(this.timer === 0  && body.onFloor()){
                body.velocity.y = -250;
                this.timer += 1;
            }
            else if(this.timer > 0 && this.timer < 3){
                this.timer += 1;
            }
            else if(this.timer > 2 && this.timer < 15){
                body.velocity.y = -250 + (this.timer * 2);
                this.timer += 1;
            }

            player.flipX = true
            player.play('walk', true)
        }
        else if (this.cursors.down.isDown)
        {
            body.setVelocity(0, vel)
            player.flipX = false
            player.play('walk', true)
        }
        else
        {
            //arrêt progressif du saut
            if(body.velocity.y < -20){
                body.velocity.y = body.velocity.y/1.2;
            }
            else if(body.velocity.y > -21 && body.velocity.y < 0){
                body.velocity.y = 0
            }
            //remise du timer à 0
            this.timer = 0;
            if(Math.sign(body.velocity.x) === 1 && body.velocity.x > 0){
                body.velocity.x -= 30;
            }
            else if(Math.sign(body.velocity.x) === -1 && body.velocity.x < 0){
                body.velocity.x += 30;
            }

            player.play("idle", true)
        }
    }

	update2Mouvement(){
		const player = this.gameObject
		/**@type {Phaser.Physics.Arcade.Body} */
		const body = player.body
		body.setVelocity(0, 0)
		player.play('idleN', true);
	}

	/* START-USER-CODE */
	update()
	{
		if (this.playable == true){
			this.updateMouvement();
		}else if (this.playable == false){
			this.update2Mouvement();
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

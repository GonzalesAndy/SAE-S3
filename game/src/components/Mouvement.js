
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

        this.scene = scene;

		this.cursors = scene.input.keyboard.createCursorKeys()
        
        this.upLeft = scene.input.keyboard.createCombo([this.cursors.up,this.cursors.left]);
        this.upRight = scene.input.keyboard.createCombo([this.cursors.up,this.cursors.right]);
        this.downLeft = scene.input.keyboard.createCombo([this.cursors.down,this.cursors.left]);
        this.downRight = scene.input.keyboard.createCombo([this.cursors.down,this.cursors.right]);
        
		this.playable = true;

		scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)

		/* END-USER-CTR-CODE */
	}

	/** @returns {Mouvement} */
	static getComponent(gameObject){
		return gameObject["__Mouvement"];
    }

	/** @type {Phaser.GameObjects.Sprite} */
	gameObject;
	/** @type {boolean} */
    scene;

	playable = true;

    isDashing = false;
    hasDashed = false;
    dashTimer = 60;

    upLeft;
    upRight;
    downLeft;
    downRight;

    updateMouvement()
    {
        const vel = 250;

        const player = this.gameObject;

        const body = player.body;

        if(body.onFloor() && this.hasDashed === true)
            this.hasDashed = false;


        /**@type {Phaser.Physics.Arcade.Body}*/
        if (this.cursors.space.isDown)
            body.velocity.y = -2000;

        if (this.cursors.up.isDown){
            //jump en fonction de l'appuie
            if(this.timer === 0  && body.onFloor()){
                body.velocity.y = -400;
                this.timer += 1;
            }

            else if(this.timer > 0 && this.timer < 3)
                this.timer += 1;

            else if(this.timer > 0 && this.timer < 15){
                body.velocity.y = -400 + (this.timer * 2);
                this.timer += 1;
            }
            
        }
        else
            this.timer = 0;
        
        if (this.cursors.left.isDown && this.isDashing === false)
        {
            if(body.velocity.x > -vel)
                body.velocity.x -= 20;

            player.flipX = true
            player.play('walk', true)
        }
        else if (this.cursors.right.isDown && this.isDashing === false)
        {
            if(body.velocity.x < vel)
                body.velocity.x += 20;

            player.flipX = false
            player.play('walk', true)
        }
        if(!body.onFloor())
        {
            //arrêt progressif du saut
            if(body.velocity.y < -20 && !this.cursors.up.isDown)
                body.velocity.y = body.velocity.y/1.2;

            else if(body.velocity.y >= -21 && body.velocity.y < 0 && !this.cursors.up.isDown)
                body.velocity.y = 0
        }
        //arrêt progressif lors d'un déplacement
        if(!this.cursors.left.isDown && !this.cursors.right.isDown){
            if(Math.sign(body.velocity.x) === 1 && body.velocity.x > 29)
                body.velocity.x -= 10;

            else if(Math.sign(body.velocity.x) === -1 && body.velocity.x < -29)
                body.velocity.x += 10;

            else if(body.velocity.x < 30 && body.velocity.x > -30 && body.velocity.x != 0)
                body.velocity.x = 0;
                
            player.play("idle", true)
        }
        if(this.cursors.shift.isDown && this.hasDashed === false){
            this.hasDashed = true;
            this.isDashing = true;
        }
        if(this.isDashing === true)
            this.dash();
    }

    dash()
    {
        const vel = 250;

        const player = this.gameObject;

        const body = player.body;

        if (this.dashTimer > 0){
            player.body.setAllowGravity(false);
            if (this.cursors.right.isDown){
                body.velocity.x = vel * 2;
                body.velocity.y = 0;
                this.dashTimer -= 1;
            }
            else if(this.cursors.left.isDown){
                body.velocity.x = -vel * 2;
                body.velocity.y = 0;
                this.dashTimer -= 1;
            }
            else if(this.cursors.up.isDown){
                body.velocity.x = 0;
                body.velocity.y = -vel * 2;
                this.dashTimer -= 1;
            }
            else if(this.cursors.down.isDown){
                body.velocity.x = 0;
                body.velocity.y = vel * 2;
                this.dashTimer -= 1;
            }
            else if(this.upLeft.matched){
                body.velocity.x = vel * 2;
                body.velocity.y = -vel * 2;
                this.dashTimer -= 1;
            }
            else if(this.upRight.matched){
                body.velocity.x = -vel * 2;
                body.velocity.y = -vel * 2;
                this.dashTimer -= 1;
            }
            else if(this.downLeft.matched){
                body.velocity.x = vel * 2;
                body.velocity.y = vel * 2;
                this.dashTimer -= 1;
            }
            else if(this.downRight.matched){
                body.velocity.x = -vel * 2;
                body.velocity.y = vel * 2;
                this.dashTimer -= 1;
            }
            if(!(this.cursors.right.isDown || this.cursors.left.isDown || this.cursors.up.isDown || this.cursors.down.isDown)){
                if (player.flipX === false){
                    body.velocity.x = vel * 2;
                    body.velocity.y = 0;
                }
                else{
                    body.velocity.x = -vel * 2;
                    body.velocity.y = 0;
                }
            }
        }
        else{
            this.isDashing = false;
            this.dashTimer = 45;
            player.body.setAllowGravity(true);
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
		if (this.playable){
			this.updateMouvement();
		}else{
			this.update2Mouvement();
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
class Mouvement {

    // const
    X_ACCELERATION = 15;
    X_INERTIE = 0.05;
    MAX_X_SPEED = 10000;

    GRAVITY_ACCELERATION = 5;
    MAX_FALL_SPEED = 800;
    GLIDE_TIMER = 100;  // ms

    // var
	gameObject;
	playable = true;
    isDashing = false;
    hasDashed = false;
    jump = false;
    jumpBegin = 0;
    dashVel = 600;
    dashTime = 0;
    xKeys = 0;
    yKeys = 0;

	constructor(gameObject) {
		this.gameObject = gameObject;
		gameObject["__Mouvement"] = this;

		const scene = this.gameObject.scene

		this.cursors = scene.input.keyboard.addKeys({
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT, 
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'up': Phaser.Input.Keyboard.KeyCodes.UP,
            'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
            'spacebar': Phaser.Input.Keyboard.KeyCodes.SPACE,
            'shift': Phaser.Input.Keyboard.KeyCodes.SHIFT,
            'm':Phaser.Input.Keyboard.KeyCodes.M});

		scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
	}

	/** @returns {Mouvement} */
	static getComponent(gameObject) {
		return gameObject["__Mouvement"];
    }

    isOnFloor() {
        return this.gameObject.body.onFloor();
    }

    getNow() {
        return this.gameObject.scene.time.now; // time in milliseconds
    }

    timeBetween(timer){
        return this.getNow - timer
    }

    updateVelocity() {
        if(this.cursors.m.isDown){
            this.vel.y = -500
        }
        if(!this.isDashing){
            // x movement
            this.gameObject.body.velocity.x += (this.cursors.right.isDown-this.cursors.left.isDown)*this.X_ACCELERATION;
            this.gameObject.body.velocity.x = Phaser.Math.Clamp(this.gameObject.body.velocity.x, -this.MAX_X_SPEED, this.MAX_X_SPEED);
            this.gameObject.body.velocity.x = Phaser.Math.Linear(this.gameObject.body.velocity.x, 0, this.X_INERTIE);

            // y movement
            if (this.cursors.spacebar.isDown){
			// adaptative jump
			    if(this.isOnFloor() && this.jump === false){
				    this.jump = true;
                    this.jumpBegin = this.getNow()
			    }
                else if(this.getNow() - this.jumpBegin < 100){
                    this.gameObject.body.velocity.y = -300;
                }
			    else if(this.getNow() - this.jumpBegin >= 100 && this.getNow() - this.jumpBegin < 325){
                    console.log("prout")
				    this.gameObject.body.velocity.y = -400 + Math.floor((this.getNow() - this.jumpBegin)/1.7);
			    }
		    }

            if(Phaser.Input.Keyboard.JustDown(this.cursors.shift) && this.hasDashed === false){
                this.hasDashed = true;
                this.isDashing = true;
                this.dashTime = this.getNow();
                this.dash();
            }
            if (this.isOnFloor()){
                if(this.hasDashed && !this.isDashing){
                    this.hasDashed = false;
                }
                if(!this.cursors.spacebar.isDown){
                    this.jump = false;
                }
            }
        }
        
        // end of dash
        else if(this.getNow() - this.dashTime > 150){
            this.isDashing = false;
            this.gameObject.body.setAllowGravity(true);
            this.gameObject.body.velocity.x /= 2;
            this.gameObject.body.velocity.y /= 2;
        }
    }

    // implementing dash
    dash() {
        this.gameObject.body.setAllowGravity(false);
        this.gameObject.body.velocity.x = this.cursors.right.isDown-this.cursors.left.isDown;
        this.gameObject.body.velocity.y = this.cursors.down.isDown-this.cursors.up.isDown;
        this.gameObject.body.velocity.normalize();
        this.gameObject.body.velocity.x *= this.dashVel;
        this.gameObject.body.velocity.y *= this.dashVel;
    }

    // npc
	update2Mouvement(){
		const player = this.gameObject
		const body = player.body
		body.setVelocity(0, 0)
		player.play('idleN', true);
	}

	update()
	{
        // movements playable character
		if (this.playable){
        this.updateVelocity();
        // this.updateMovement();
		}
        // movements npc
        else{
			this.update2Mouvement();
		}
	}
}
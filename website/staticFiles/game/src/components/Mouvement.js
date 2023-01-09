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
    isDashing = false;
    hasDashed = false;
    jump = false;
    jumpBegin = 0;
    dashVel = 600;
    dashTime = 0;

    constructor(gameObject, nomJoueur) {
        this.gameObject = gameObject;
        this.nomJoueur =nomJoueur;
        gameObject["__Mouvement"] = this;

        const scene = this.gameObject.scene

        this.cursors = scene.input.keyboard.addKeys({
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'up': Phaser.Input.Keyboard.KeyCodes.UP,
            'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
            'spacebar': Phaser.Input.Keyboard.KeyCodes.SPACE,
            'shift': Phaser.Input.Keyboard.KeyCodes.SHIFT,
            'm': Phaser.Input.Keyboard.KeyCodes.M
        });

        this.scene = scene;

        scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    } // Fin constructeur()

    /** @returns {Mouvement} */
    static getComponent(gameObject) {
        return gameObject["__Mouvement"];
    } // Fin getComponent()

    isOnFloor() {
        return this.gameObject.body.onFloor();
    } // Fin isOnFloor()

    getNow() {
        return this.gameObject.scene.time.now; // time in milliseconds
    } // Fin getNow()

    timeBetween(timer) {
        return this.getNow - timer
    } // Fin timeBetween()

    updateVelocity() {
        this.gameStop = false;
        if (!this.isDashing) {
            // x movement
            this.gameObject.body.velocity.x += (this.cursors.right.isDown - this.cursors.left.isDown) * this.X_ACCELERATION;
            this.gameObject.body.velocity.x = Phaser.Math.Clamp(this.gameObject.body.velocity.x, -this.MAX_X_SPEED, this.MAX_X_SPEED);
            this.gameObject.body.velocity.x = Phaser.Math.Linear(this.gameObject.body.velocity.x, 0, this.X_INERTIE);

            if (this.cursors.m.isDown) {
                this.gameObject.body.velocity.y = -500
            } // Fin if

            // y movement
            if (this.cursors.spacebar.isDown) {
                // animation
                if(this.nomJoueur == "idleF"){
                    this.gameObject.play("jumpF", true);
                }else if (this.nomJoueur == "idleG"){
                    this.gameObject.play("jumpF", true);
                } // Fin else if
                // adaptative jump
                if (this.isOnFloor() && this.jump === false) {
                    this.jump = true;
                    this.jumpBegin = this.getNow()
                } else if (this.getNow() - this.jumpBegin < 100) {
                    this.gameObject.body.velocity.y = -300;
                } else if (this.getNow() - this.jumpBegin >= 100 && this.getNow() - this.jumpBegin < 325) {
                    this.gameObject.body.velocity.y = -400 + Math.floor((this.getNow() - this.jumpBegin) / 1.7);
                } // Fin else if
            } // Fin if

            if (Phaser.Input.Keyboard.JustDown(this.cursors.shift) && this.hasDashed === false) {
                this.hasDashed = true;
                this.isDashing = true;
                this.dashTime = this.getNow();
                this.dash();
            } // Fin if
            
            if (this.isOnFloor()) {
                if (this.hasDashed && !this.isDashing) {
                    this.hasDashed = false;
                } // Fin if
                if (!this.cursors.spacebar.isDown) {
                    this.jump = false;
                } // Fin if
            } // Fin if

        } else if (this.getNow() - this.dashTime > 150) { // Fin du dash
            this.isDashing = false;
            this.gameObject.body.setAllowGravity(true);
            this.gameObject.body.velocity.x /= 2;
            this.gameObject.body.velocity.y /= 2;
        } // Fin else if

    } // Fin updateVelocity()

    // implementing dash
    dash() {
        this.gameObject.body.setAllowGravity(false);
        this.gameObject.body.velocity.x = this.cursors.right.isDown - this.cursors.left.isDown;
        this.gameObject.body.velocity.y = this.cursors.down.isDown - this.cursors.up.isDown;
        this.gameObject.body.velocity.normalize();
        this.gameObject.body.velocity.x *= this.dashVel;
        this.gameObject.body.velocity.y *= this.dashVel;
    } // Fin dash()

    // // // A changer // // //
    stop() {
        this.gameObject.body.velocity.x = 0;
        this.gameObject.body.velocity.y = 0;
    } // Fin stop()

    direction(){
        if(this.cursors.left.isDown){
            this.gameObject.flipX = true;
        }
        if((this.cursors.right.isDown || this.cursors.left.isDown)){
            if(this.gameObject.body.isOnFloor){
                if(this.nomJoueur == "idleF"){
                    this.gameObject.play("walkF", true);
                }else if (this.nomJoueur == "idleG"){
                    this.gameObject.play("walkG", true);
                } // Fin else if 
            }
            else if(!this.gameObject.body.isOnFloor && this.isDashing){
                if(this.nomJoueur == "idleF"){
                    this.gameObject.play("dashF", true);
                }else if (this.nomJoueur == "idleG"){
                    this.gameObject.play("dashG", true);
                } // Fin else if
            }
            else if(!this.gameObject.isOnFloor){
                if(this.nomJoueur == "idleF"){
                    this.gameObject.play("fallF", true);
                }else if (this.nomJoueur == "idleG"){
                    this.gameObject.play("fallG", true);
                } // Fin else if
            }
        } else{
            this.gameObject.play(this.nomJoueur, true);
        }// Fin else
    } // Fin direction

    update() {
        if (typeof this.gameObject.body !== "undefined") {
            this.gameObject.flipX = false;
            this.direction();
            this.updateVelocity();
        } // Fin if 

    } // Fin update()
}
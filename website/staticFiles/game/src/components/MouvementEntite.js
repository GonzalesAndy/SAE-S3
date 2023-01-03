class MouvementEntite {


	constructor(gameObjectEnnemy, gameObjectPlayer) {
        this.gameObjectEnnemy = gameObjectEnnemy;
        gameObjectEnnemy["__Mouvement"] = this;

        const player = this.gameObjectEnnemy

		this.ennemyX = this.gameObjectEnnemy.x;
		this.ennemyY = this.gameObjectEnnemy.y;
		this.i = 0;
		this.pv = 0;
		this.timer = 0;

        scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }//Fin constructeur

    runM(){
        //timer avant deplacement par rapport au joueur
        this.timer+=1;
        if(this.timer === 2){
            this.physics.moveToObject(this.ennemy,this.player,200);

            // si les coordonnée de la frame precedante et actuelle sont === on fait bouger l'entité
            if(Math.abs(this.ennemy.x - this.ennemyX) < 0.1 && Math.abs(this.ennemy.y - this.ennemyY) < 0.1){
                this.i+= 1;
            }
            if(this.i>= 50){
                this.ennemy.y -= 110;
                this.ennemy.x -= 10;
                this.i = 0;	
            }
            this.timer=0;

            //redefinition des ancienne valeur de coordonnée au novelle
            this.ennemyX = this.ennemy.x;
            this.ennemyY = this.ennemy.y;
        }

        /*      COLLISION       
        //condition de collision entre l'ennemy et le joueur
        //toucher 1 fois , 1 vie de perdu et ainsi de suite jusqu'au game over
        if(this.physics.collide(this.player,this.ennemy)){
            console.log("ca touche");
            this.player.x +=80;
            this.pv+=1;
            this.sur.premierCoeur();

            if(this.pv === 2){
            }
            if(this.pv === 3){
            }	
        } */

    } //Fin run

}
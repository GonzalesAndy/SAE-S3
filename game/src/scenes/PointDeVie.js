class PointDeVie extends Phaser.Scene {

	constructor() {
		super("PointDeVie");

	}

	/** @returns {void} */
	editorCreate() {

		// coeur1
		
		console.log("SOMETHING:")
		console.log(this)
    
		const coeur1 = this.add.image(900, 30, "Coeur");
		coeur1.scaleX = 0.07;
		coeur1.scaleY = 0.07;
		// coeur2
		const coeur2 = this.add.image(950, 30, "Coeur");
		coeur2.scaleX = 0.07;
		coeur2.scaleY = 0.07;

		// coeur3
		const coeur3 = this.add.image(1000, 30, "Coeur");
		coeur3.scaleX = 0.07;
		coeur3.scaleY = 0.07;

		// coeur1_vide
		const coeur1_vide = this.add.image(900, 25, "Coeur_vide");
		coeur1_vide.scaleX = 0.08;
		coeur1_vide.scaleY = 0.08;
		
		// coeur2_vide
		const coeur2_vide = this.add.image(950, 25, "Coeur_vide");
		coeur2_vide.scaleX = 0.08;
		coeur2_vide.scaleY = 0.08;

		// coeur3_vide
		const coeur3_vide = this.add.image(1000, 25, "Coeur_vide");
		coeur3_vide.scaleX = 0.08;
		coeur3_vide.scaleY = 0.08;

		// text_pv
		const text_pv = this.add.text(780, 3, "", {});
		text_pv.text = "PV :";
		text_pv.setStyle({ "align": "center", "color": "#000000ff", "fontSize": "40px", "fontStyle": "bold italic", "shadow.stroke":true});
		
		
		
		console.log("DEFINE COEUR: ")
		console.log(this)
    
		this.coeur1 = coeur1;
		this.coeur2 = coeur2;
		this.coeur3 = coeur3;
		this.coeur1_vide = coeur1_vide;
		this.coeur2_vide = coeur2_vide;
		this.coeur3_vide = coeur3_vide;
		this.text_pv = text_pv;

		this.coeur1_vide.visible = false;
		this.coeur2_vide.visible = false;
		this.coeur3_vide.visible = false;
	


		this.events.emit("scene-awake");
	}

	/* @type {Phaser.GameObjects.Image} */
	coeur1;
	/* @type {Phaser.GameObjects.Image} */
	coeur2;
	/* @type {Phaser.GameObjects.Image} */
	coeur3;
	/* @type {Phaser.GameObjects.Image} */
	coeur1_vide;
	/* @type {Phaser.GameObjects.Image} */
	coeur2_vide;
	/* @type {Phaser.GameObjects.Image} */
	coeur3_vide;
	///text pour les pv
	text_pv;
	/* START-USER-CODE */

	// Write your code here

	create() {
		

		this.editorCreate();
	}

/*
	premierCoeur(){
		console.log("USE COEUR: ")
		console.log(this)
		this.coeur1.visible = false;
	}


	visible2(){
		this.coeur2.visible = false;
		this.coeur2_vide.visible = true;
	}
	visible3(){
		this.coeur3.visible = false;
		this.coeur3_vide.visible = true;
	}
	
	*/

	update(){
		
	}

}

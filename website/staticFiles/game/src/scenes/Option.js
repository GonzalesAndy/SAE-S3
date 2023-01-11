class Option extends Phaser.Scene {

	constructor() {
		super("Option");

		
	} // Fin constructor()
    editorCreate(){


		// fondOption
		const fondOption = this.add.image(this.game.scale.width/2, this.game.scale.height/2, "backgroundOption");
		fondOption.scaleX = 0.8;
		fondOption.scaleY = 0.8;

		// flecheMoinsButton
		const flecheMoinsButton = this.add.image(0, 0, "arrowDownButton");
		Phaser.Display.Align.In.Center(flecheMoinsButton, fondOption, 125, 0);

		// flechePlusButton
		const flechePlusButton = this.add.image(0, 0, "arrowUpButton");
		Phaser.Display.Align.In.Center(flechePlusButton, fondOption, -125, 0);

        // progress
        const difficulty = this.add.text("", 0, 70);
        difficulty.setStyle({ "fontSize": "50px", color : "#66431a" });
		Phaser.Display.Align.In.Center(difficulty, fondOption, 0, 0);

		// classement
		const classement = this.add.image(0, 0, "leaderboardButton");
		classement.scaleX = 0.8;
		classement.scaleY = 0.8;
		Phaser.Display.Align.In.Center(classement, fondOption, 0, 125);

		// quitter
		const quitter = this.add.image(this.game.scale.width/2+ fondOption.width/2 -100,this.game.scale.height/2 - fondOption.height/2 +140 , "quitter");
		quitter.scaleX = 0.07;
		quitter.scaleY = 0.07;
		//Aligner quitter et fond
		//Phaser.Display.Align.In.Center(quitter, fondOption, fondOption.width/2, -fondOption.height/2);
		//Phaser.Display.Align.In.Center(quitter, fondOption, fondOption.width/2 - quitter.wi, 0);

		//annimation boutons
		new PushOnClick(quitter);
		new PushOnClick(flecheMoinsButton);
		new PushOnClick(flechePlusButton);
		new PushOnClick(classement);

        this.quitter = quitter;
		this.fondOption = fondOption;
		this.difficulty = difficulty;
		this.flecheMoinsButton = flecheMoinsButton;
		this.flechePlusButton = flechePlusButton;
		this.quitter = quitter;

        this.quitter.once('pointerup', function(event) { 
            this.scene.resume('Menu');
            this.scene.resume('Level');
            this.scene.stop()
		}, this);

		var vitesse = 70;
		this.vitesse = vitesse;

		this.flecheMoinsButton.setInteractive({ useHandCursor: true }).on("pointerdown", () => {
			if(this.vitesse == 70 || this.vitesse == 90){
				this.vitesse -= 20;
			}
		  });

		this.flechePlusButton.setInteractive({ useHandCursor: true }).on("pointerdown", () => {
			if(this.vitesse == 70 || this.vitesse == 50){
				this.vitesse += 20;
			}
		}, this);

		this.classement.setInteractive({ useHandCursor: true }).on("pointerdown", () => {
			window.open("http://127.0.0.1:5000/leaderboard", "_blank")
		}, this);

        this.events.emit("scene-awake");
    } // Fin editorCreate()

	setTextDifficulty(vitesse){
		var text = "";
		if(vitesse == 70 ){
			text = "Normal";
		} else if(vitesse == 50) {
			text = "Easy";
		} else if(vitesse == 90){
			text = "Hard";
		} // Fin else if
		return text;
	} // Fin setTextDifficulty

    create(){

		this.editorCreate();
    } // Fin create()

	update(){

		this.difficulty.setText(this.setTextDifficulty(this.vitesse));
		Phaser.Display.Align.In.Center(this.difficulty, this.fondOption, 0, 0);
	}

} //Fin class

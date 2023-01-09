class Option extends Phaser.Scene {

	constructor() {
		super("Option");

		
	} // Fin constructor()
    editorCreate(){

		// fondOption
		const fondOption = this.add.image(500, 294, "backgroundOption");
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
		const quitter = this.add.image(710, 100, "quitter");
		quitter.scaleX = 0.07;
		quitter.scaleY = 0.07;

		//annimation boutons
		new PushOnClick(quitter);
		new PushOnClick(flecheMoinsButton);
		new PushOnClick(flechePlusButton);

        this.quitter = quitter;
		this.fondOption = fondOption;
		this.difficulty = difficulty;
		this.flecheMoinsButton = flecheMoinsButton;
		this.flechePlusButton = flechePlusButton;

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

        this.events.emit("scene-awake");
    } // Fin editorCreate()

	setTextDifficulty(vitesse){
		console.log(vitesse);
		var text = "";
		if(vitesse == 70 ){
			text = "Normal";
		} else if(vitesse == 50) {
			text = "Easy";
		} else if(vitesse == 90){
			text = "Hard";
		} // Fin else if
		console.log(text);
		return text;
	} // Fin setTextDifficulty

    create(){

		this.editorCreate();
    } // Fin create()

	update(){

		console.log(this.setTextDifficulty(this.vitesse));
		this.difficulty.setText(this.setTextDifficulty(this.vitesse));
		Phaser.Display.Align.In.Center(this.difficulty, this.fondOption, 0, 0);
	}

} //Fin class

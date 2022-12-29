class Question{

    constructor(scene,intPerso,vitesseEnnemy){

        this.scene = scene;
        this.intPerso = intPerso;
        this.vitesseEnnemy = vitesseEnnemy;


        console.log(this.scene);
        console.log(this.vitesseEnnemy);

        const feuilleQuestion =  this.scene.add.image(500, 294, "feuille").setScrollFactor(0);
    
        const quest = this.scene.add.text(230, 150, "How do we say 'Informatique' in English ?", { font: "32px Helvetica bold", fill: "#66431a" }).setScrollFactor(0);
        
        const Aright = this.scene.add.text(420, 200, "Right", { font: "60px Helvetica bold", fill: "#228B22" }).setScrollFactor(0);
        const Afalse = this.scene.add.text(420, 200, "False", { font: "60px Helvetica bold", fill: "#ff0000" }).setScrollFactor(0);
        var groupeBoutons = this.scene.physics.add.staticGroup([
            { key: 'qcm', frame: 0, repeat: 1, setXY: { x: 350, y: 300, stepX: 280, scrollFactorX : 0} },
            { key: 'qcm', frame: 0, repeat: 1, setXY: { x: 350, y: 350, stepX: 280 } }
        ])

        var children = groupeBoutons.getChildren();

        for (var i = 0; i < children.length; i++){
            var child = children[i];
            new PushOnClick(child);
            child.setScrollFactor(0);
            child.visible = false;
        }


        const valider = this.scene.add.image(490, 415, "valider").setScrollFactor(0);
        valider.scaleX = 0.07;
        valider.scaleY = 0.07;

        const Tbutton1 = this.scene.add.text(260, 285, "Informatique", { font: "30px Helvetica bold", fill: "#66431a" }).setScrollFactor(0);
        const Tbutton2 = this.scene.add.text(512, 285, "Computer Science", { font: "30px Helvetica bold", fill: "#66431a" }).setScrollFactor(0);
        const Tbutton3 = this.scene.add.text(235, 335, "Ordinateur Science", { font: "30px Helvetica bold", fill: "#66431a" }).setScrollFactor(0);
        const Tbutton4 = this.scene.add.text(552, 335, "Informatick", { font: "30px Helvetica bold", fill: "#66431a" }).setScrollFactor(0);
        new PushOnClick(valider);

        //centrer les trucs
        Phaser.Display.Align.In.Center(quest, feuilleQuestion, 0, -120);
        Phaser.Display.Align.In.Center(Tbutton1, children[0]);
        Phaser.Display.Align.In.Center(Tbutton2, children[1]);
        Phaser.Display.Align.In.Center(Tbutton3, children[2]);
        Phaser.Display.Align.In.Center(Tbutton4, children[3]);


        var liste = [Tbutton1, Tbutton2, Tbutton3, Tbutton4];

		var reponse = 0;

        this.reponse = reponse;

        valider.visible = false;
        Afalse.visible = false;
        Aright.visible = false;
        Tbutton1.visible = false;
        Tbutton2.visible = false;
        Tbutton3.visible = false;
        Tbutton4.visible = false;
        feuilleQuestion.visible = false;
        quest.visible = false;

        this.valider = valider;

        this.groupeBoutons = groupeBoutons;
        this.children = children;
        this.liste = liste;

        this.Tbutton1 = Tbutton1;
        this.Tbutton2 = Tbutton2;
        this.Tbutton3 = Tbutton3;
        this.Tbutton4 = Tbutton4;
        this.Afalse = Afalse;
        this.feuilleQuestion = feuilleQuestion
        this.quest = quest
        this.Aright = Aright;

    }

	runQuestion(){

        //On rend tout visible 
		this.feuilleQuestion.visible = true;
		this.quest.visible = true;
		this.valider.visible = true;
        for (var i = 0; i < this.children.length; i++){
            this.children[i].visible = true;
            this.liste[i].visible = true;
        }
        
        var Bonnereponse = 0

        if (this.reponse == 0){
            
            //Mettre la séléction on vert
            this.children[0].once('pointerup', function(event) { 
                this.Tbutton1.setStyle({color : "#228B22"})
                this.Tbutton2.setStyle({color : "#66431a"})
                this.Tbutton3.setStyle({color : "#66431a"})
                this.Tbutton4.setStyle({color : "#66431a"})
            }, this);
            this.children[1].once('pointerup', function(event) { 
                this.Tbutton1.setStyle({color : "#66431a"})
                this.Tbutton2.setStyle({color : "#228B22"})
                this.Tbutton3.setStyle({color : "#66431a"})
                this.Tbutton4.setStyle({color : "#66431a"})
                Bonnereponse = 1;
            }, this);
            this.children[2].once('pointerup', function(event) { 
                this.Tbutton1.setStyle({color : "#66431a"})
                this.Tbutton2.setStyle({color : "#66431a"})
                this.Tbutton3.setStyle({color : "#228B22"})
                this.Tbutton4.setStyle({color : "#66431a"})
            }, this);
            this.children[3].once('pointerup', function(event) { 
                this.Tbutton1.setStyle({color : "#66431a"})
                this.Tbutton2.setStyle({color : "#66431a"})
                this.Tbutton3.setStyle({color : "#66431a"})
                this.Tbutton4.setStyle({color : "#228B22"})
            }, this);
        }

        //On regarde si la réponse est juste ou fausse
		this.valider.once('pointerup', function(event) { 
            this.reponse = 1;

			if (Bonnereponse == 1){
				this.Aright.visible = true;
				this.Afalse.visible = false;

			}
			if (Bonnereponse == 0){
				this.Aright.visible = false;
				this.Afalse.visible = true;
			}
            
			this.valider.once('pointerup', function(event) { 

                if (Bonnereponse == 1){
                    if (this.vitesseEnnemy <= 80){
                        this.scene.scene.start("Level", [2, this.intPerso, 70]);
                    }else{
                        this.scene.scene.start("Level", [2, this.intPerso, this.vitesseEnnemy - 10]);
                    }
                }
                if (Bonnereponse == 0){
                    this.scene.scene.start("Level", [2, this.intPerso, this.vitesseEnnemy + 50]);
                }
				
			}, this);
		}, this);

	}
    

}
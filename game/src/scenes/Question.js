class Question extends Phaser.Scene{

    init(data){
    //constructor(){ 
        //super('Question');
        
        this.nameMap = data.nameMap;
        this.intPerso = data.intPerso;
        this.vitesseEnnemy = data.vitesseEnnemy;
        /*
        const nameMap = data.nameMap;
        const intPerso = data.intPerso;
        const vitesseEnnemy = data.vitesseEnnemy;

        this.nameMap = nameMap;
        this.intPerso = this.intPerso;
        this.vitesseEnnemy = this.vitesseEnnemy;*/

    } // Fin init()

    editorCreate(){
        
        const feuilleQuestion =  this.add.image(500, 294, "feuille").setScrollFactor(0);
        const quest = this.add.text(230, 150, "How do we say 'Informatique' in English ?", { font: "32px Helvetica bold", fill: "#66431a" }).setScrollFactor(0);
        
        const Aright = this.scene.scene.add.text(420, 200, "Right", { font: "60px Helvetica bold", fill: "#228B22" }).setScrollFactor(0);
        const Afalse = this.scene.scene.add.text(420, 200, "False", { font: "60px Helvetica bold", fill: "#ff0000" }).setScrollFactor(0);
        var groupeBoutons = this.scene.scene.physics.add.staticGroup([
            { key: 'qcm', frame: 0, repeat: 1, setXY: { x: 350, y: 300, stepX: 280, scrollFactorX : 0} },
            { key: 'qcm', frame: 0, repeat: 1, setXY: { x: 350, y: 350, stepX: 280 } }
        ])

        var children = groupeBoutons.getChildren();

        for (var i = 0; i < children.length; i++){
            var child = children[i];
            new PushOnClick(child);
            child.setScrollFactor(0);
        }


        const valider = this.scene.scene.add.image(490, 415, "valider").setScrollFactor(0);
        valider.scaleX = 0.07;
        valider.scaleY = 0.07;


        const Tbutton1 = this.scene.scene.add.text(260, 285, "Informatique", { font: "30px Helvetica bold", fill: "#66431a" }).setScrollFactor(0);
        const Tbutton2 = this.scene.scene.add.text(512, 285, "Computer Science", { font: "30px Helvetica bold", fill: "#66431a" }).setScrollFactor(0);
        const Tbutton3 = this.scene.scene.add.text(235, 335, "Ordinateur Science", { font: "30px Helvetica bold", fill: "#66431a" }).setScrollFactor(0);
        const Tbutton4 = this.scene.scene.add.text(552, 335, "Informatick", { font: "30px Helvetica bold", fill: "#66431a" }).setScrollFactor(0);
        new PushOnClick(valider);

        console.log(1);
        //centrer les trucs
        Phaser.Display.Align.In.Center(quest, feuilleQuestion, 0, -120);
        Phaser.Display.Align.In.Center(Tbutton1, children[0]);
        Phaser.Display.Align.In.Center(Tbutton2, children[1]);
        Phaser.Display.Align.In.Center(Tbutton3, children[2]);
        Phaser.Display.Align.In.Center(Tbutton4, children[3]);


        var liste = [Tbutton1, Tbutton2, Tbutton3, Tbutton4];

		var reponse = 0;

        Afalse.visible = false;
        Aright.visible = false;

        //On rend tout visible 
        for (var i = 0; i < children.length; i++){
            children[i].visible = true;
            liste[i].visible = true;
        }
        
        var Bonnereponse = 0

        if (reponse == 0){
            
            //Mettre la séléction on vert
            children[0].once('pointerup', function(event) { 
                Tbutton1.setStyle({color : "#228B22"})
                Tbutton2.setStyle({color : "#66431a"})
                Tbutton3.setStyle({color : "#66431a"})
                Tbutton4.setStyle({color : "#66431a"})
            }, this);
            children[1].once('pointerup', function(event) { 
                Tbutton1.setStyle({color : "#66431a"})
                Tbutton2.setStyle({color : "#228B22"})
                Tbutton3.setStyle({color : "#66431a"})
                Tbutton4.setStyle({color : "#66431a"})
                Bonnereponse = 1;
            }, this);
            children[2].once('pointerup', function(event) { 
                Tbutton1.setStyle({color : "#66431a"})
                Tbutton2.setStyle({color : "#66431a"})
                Tbutton3.setStyle({color : "#228B22"})
                Tbutton4.setStyle({color : "#66431a"})
            }, this);
            children[3].once('pointerup', function(event) { 
                Tbutton1.setStyle({color : "#66431a"})
                Tbutton2.setStyle({color : "#66431a"})
                Tbutton3.setStyle({color : "#66431a"})
                Tbutton4.setStyle({color : "#228B22"})
            }, this);
        }

        //On regarde si la réponse est juste ou fausse
		valider.once('pointerup', function(event) { 
            reponse = 1;

			if (Bonnereponse == 1){
				Aright.visible = true;
				Afalse.visible = false;

			}
			if (Bonnereponse == 0){
				Aright.visible = false;
				Afalse.visible = true;
			}
            
			valider.once('pointerup', function(event) { 

                
                if (Bonnereponse == 1){
                    if (vitesseEnnemy <= 80){
                        this.scene.start("Level", [2, this.intPerso, 70]);
                    }else{
                        this.scene.start("Level", [2, this.intPerso, this.vitesseEnnemy - 10]);
                    }
                }else if (Bonnereponse == 0){
                    this.scene.start("Level", [2, this.intPerso, this.vitesseEnnemy + 50]);
                }
				
			}, this);
		}, this); 


        this.events.emit("scene-awake");

    } // Fin editorCreate()
    create(){

		this.editorCreate();
    } // Fin create()
    

} //Fin class
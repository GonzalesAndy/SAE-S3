class Timer extends Phaser.GameObjects.Text {
    constructor(scene) {
        super(scene, 15, 10, ''); // Coordonnées x et y de l'objet Text
        this.setFontFamily('Arial');
        this.setFontSize(34);
        this.setColor('white');
        this.setScrollFactor(0);

        this.tempsEcoule = 0;

        this.scene = scene;
        scene.add.existing(this);
    }

    heures;
    minutes;
    secondes;
    tempsEcoule;

    getTimer(){
        return [this.heures, this.minutes, this.secondes]
    }

    setTimer(heures,minutes,secondes){
        this.heures = heures;
        this.minutes = minutes;
        this.secondes = secondes;
        this.tempsEcoule = secondes + minutes*60 + heures*3600
    }

    update(time,delta) {
        this.tempsEcoule += delta / 1000; // on ajoute le temps écoulé en secondes
        this.heures = Math.floor(this.tempsEcoule / 3600);
        this.minutes = Math.floor((this.tempsEcoule % 3600) / 60);
        this.secondes = Math.floor(this.tempsEcoule % 60);
        this.setText(`Time: ${this.heures}:${this.minutes}:${this.secondes}`);
    }

   
    
}
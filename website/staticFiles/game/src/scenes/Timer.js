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

    update(time, delta) {
        this.tempsEcoule += delta / 1000; // on ajoute le temps écoulé en secondes
        const heures = Math.floor(this.tempsEcoule / 3600);
        const minutes = Math.floor((this.tempsEcoule % 3600) / 60);
        const secondes = Math.floor(this.tempsEcoule % 60);
        this.setText(`Time: ${heures}:${minutes}:${secondes}`);
    }

   
    
}
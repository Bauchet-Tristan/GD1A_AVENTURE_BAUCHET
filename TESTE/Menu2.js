
class Menu2 extends Phaser.Scene //
{
    constructor()
    {
        super("menu2"); //nom = menu
    }

    init(data)
    {
        //dispo partout
        //this.pintsDeVie = data.pv; 
        //this.monScore = data.score; 
    }

    preload()
    {

    }

    create()
    {
        this.add.text(20,20, "Playing game...");
    }

    update()
    {

    }

}


////////////

//this.scene.start(menu, {pv : 12, score: 80});
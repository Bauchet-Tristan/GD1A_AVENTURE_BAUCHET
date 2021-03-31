
class Menu extends Phaser.Scene //
{
    constructor()
    {
        super("menu"); //nom = menu
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
        this.add.text(20,20, "Loading game...");
        this.scene.start("menu2");
    }

    update()
    {

    }

}


////////////

//this.scene.start(menu, {pv : 12, score: 80});
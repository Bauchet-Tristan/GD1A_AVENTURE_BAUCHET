
class Menu extends Phaser.Scene //
{
    constructor()
    {
        super("Menu"); //nom = menu
    }

    init(data)
    {
        //dispo partout
    }

    preload()
    {

    }

    create()
    {
        this.add.text(20,20, "menu");
        this.scene.start("lvl1");
    }

    update()
    {

    }

}


////////////


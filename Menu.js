
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
        
    }

    update()
    {
        score ++;
        console.log(score);
        if(score == 50)
        {  
            this.scene.setVisible(false);
            this.scene.sleep("Menu");
        }
        else if(score == 100)
        {
            this.scene.setVisible(true);
            console.log("tes revenu woaw");
        }
    }

}


////////////


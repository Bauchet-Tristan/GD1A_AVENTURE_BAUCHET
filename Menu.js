
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
        this.change=0;
    }

    create()
    {
        this.add.text(20,20, "menu");  
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    

    update()
    {
        score ++;
        console.log(score);

        if(this.cursors.up.isDown)
        {  
            this.change=1;
        }

        if (this.cursors.up.isUp && this.change==1 )
        {
            this.change=0;
            this.scene.start("lvl1");
        }

        else if(score >= 1)
        {
            this.scene.start("lvl1");
        }
    }

}


////////////


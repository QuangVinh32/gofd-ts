import Boot from './scenes/Boot';
import { AUTO, Game } from 'phaser';
import LoadingScene from './scenes/LoadingScene';
import MainScene from './scenes/MainScene';
import MenuLevelScene  from './scenes/MenuLevelScene';
import { LevelsScene } from './scenes/LevelsScene';
import UIScene from './scenes/UIScene';
import { ScoreboardScene } from './scenes/ScoreboardScene';
import EditorPolygon from './Editor/EditorPolygon';
import ChoiceScene from './scenes/ChoiceScene';

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 650,
    height: 500,
    parent: 'phaser-example',
    backgroundColor: '#000000',



    scale: {
        mode: Phaser.Scale.FIT, 
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  
    //hello
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0, 
                y: 0  
            },
            // debug: false
            // debugShowVelocity: false

        }
    },

    scene: [ 
        Boot,
        LoadingScene,
        MenuLevelScene,
        ChoiceScene,
        LevelsScene,
        EditorPolygon,
        MainScene,
        UIScene,
        ScoreboardScene,

    ]
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
}

export default StartGame;

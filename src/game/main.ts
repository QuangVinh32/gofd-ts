import Boot from './scenes/Boot';
import { AUTO, Game } from 'phaser';
import LoadingScene from './scenes/LoadingScene';
import MainScene from './scenes/MainScene';
import MenuLevelScene  from './scenes/MenuLevelScene';
import { LevelsScene } from './scenes/LevelsScene';
import UIScene from './scenes/UIScene';
import { ScoreboardScene } from './scenes/ScoreboardScene';
import EditorPolygon from './Editor/EditorPolygon';

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 650,
    height: 500,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0, 
                y: 0  
            },
            debug: false
        }
    },

    scene: [ 
        Boot,
        LoadingScene,
        MenuLevelScene,
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

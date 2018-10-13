import React from 'react';
import { Avatar } from '../common/avatar';
import _compact from 'lodash.compact';
import { getInitials } from '../../utils/utilities';

export const RecentGames = React.createClass({

  render() {
    const {games, player, playerById, number} = this.props;
    let playerId = player.id;

     return (
      <div className="RecentGames">
        <ul>
        { _compact(games.map( (game, i) => {
            let playerWon = game.winner == playerId;
            let opponent = playerId == game.winner ? playerById(game.loser) : playerById(game.winner);

            let winnerGain = game.winnerNewScore - game.winnerOldScore;
            let loserLoss = game.loserNewScore - game.loserOldScore;

            return player && opponent ? (
              <li key={i} className="rg_game">
                <p className="rg_date">
                  <span>{ new Date(game.dateTime).format("MMM DD - HH.mmA") }</span>
                </p>

                <div className="rg_gameStats">
                  <div className="rg_result">
                    <div style={{width: '52px'}}>{(playerWon ? 'WIN over ' : 'LOSS to ')}</div>
                    <Avatar src={opponent.image} className="img-tiny" initials={ getInitials(opponent.name) }/>{ opponent.name } 
                  </div>

                  { playerWon ?
                    <span style={{ paddingRight: '6px' }} className="points points-winner">{`+${winnerGain}`}</span>
                    :
                    <span style={{ paddingRight: '6px' }} className="points points-loser">{`${loserLoss}`}</span>
                  }
                </div>
              </li>
            ) : null
          })).slice(0, number)
        }
        </ul>
      </div>
    );
  },

});

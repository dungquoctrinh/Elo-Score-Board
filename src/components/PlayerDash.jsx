import React from 'react';
import { Link } from 'react-router';
import { PlayerCard } from './playerdash/player-card';
import { EloGraph } from './playerdash/elo-graph';
import { OpponentStats } from './playerdash/opponent-stats';
import { RecentGames } from './playerdash/recent-games';
import { Loader } from './common/loader';
import 'date-format-lite';

import _find from 'lodash.find';
import _sortBy from 'lodash.sortby';

export const PlayerDash = React.createClass({

  getInitialState() {
    return {
      gameData: [],
      days: this.props.params.days || 90,
      fetching: true
    }
  },

  componentWillMount() {
    this.firebase = this.props.firebase;
    this.loadGameData(this.props.params.playerId, this.state.days);
  },

  componentWillReceiveProps(newProps) {
    let {days: newDays, playerId: newPlayerId} = newProps.params;
    let {days, playerId} = this.props.params;

    if( days != newDays || playerId != newPlayerId ) {
      this.setState({
        days: newDays || 90,
        gameData: [],
        fetching: true
      });

      this.state.fbGameDataRef.off();
      this.loadGameData(newPlayerId, newDays);
    }
  },

  componentWillUnmount: function() {
    // Close the connection to the player game data.
    this.state.fbGameDataRef && this.state.fbGameDataRef.off();
  },

  render() {

    let col3 = document.querySelector('.col-md-3');
    let col3w = col3 ? col3.offsetWidth : 0;
    let constrained = col3w < 334;

    let { players, params } = this.props;
    let { gameData, days, fetching } = this.state;
    let playerId = params.playerId;

    let rootPath = window.location.pathname.replace(/\/(?:days\/[0-9]*)?\/?$/,'');

    const player = this.playerById(playerId);

    return (
      <div className={"PlayerDash " + (constrained ? ' constrained' : 'yo momma')}>
        { fetching && <Loader /> }

        <div className="UtilHeader">
          <Link to={`/league/${params.league}`} className="btn--util-left btn btn-default btn-sm">
            &larr; Back <span className="hide_sm">to league</span>
          </Link>
          { player &&
              <h1 className="headerText"><span className="hide_sm">{ `${ player.name.toUpperCase() } - `}</span>{`${ player.league } League`.toUpperCase() }</h1>
          }
        </div>

        <div className="col-md-5">
          <h2>Player Stats</h2>
          { player
            ? <PlayerCard {...player}  days={days} />
            : <p>{ fetching ? 'Loading Player Stats...' : 'Player not found.'} </p>
          }
          <h2>Recent Games</h2>
          { gameData.length && player
            ? <RecentGames games={gameData} player={player} playerById={this.playerById} number="5" />
            : <p>{ fetching ? 'Loading Graph...' : 'No games found.'} </p>
          }
        </div>

        <div className="col-md-1">
        </div>

        {/* <div id="EloGraphWrapper" className="col-md-3">
          <h2 className="sep">Elo Graph</h2>
          { gameData.length
            ? <EloGraph graph={gameData} playerId={playerId} days={days} />
            : <p>{ fetching ? 'Loading Games...' : 'No games found.'} </p>
          }
        </div> */}

        <div className="col-md-6">
          


          <h2>Performance Versus Specific Opponents</h2>
         { gameData.length && player
            ? <OpponentStats games={gameData} player={player} playerById={this.playerById} days={params.days} />
            : <p>{ fetching ? 'Loading Opponents...' : 'No games found.'} </p>
         }

         <div className="dayLinks">
            <div style={{ marginBottom: '5px',fontStyle: 'italic' }}>{`Showing Results for Last ${days} Days`}</div>
            {/* <small></small> */}
            <div style={{ marginBottom: '15px' }}>Select: 
              { [3, 7, 14, 30, 90, 365].map( (item) => {
                  return (
                    <Link key={item} to={[ rootPath, 'days', item].join('/')} className={item == days && 'active' }>
                      {item}
                    </Link>
                  )
              })}
            </div>
          </div>
        </div>

      </div>
      );
  },

  playerById(id) {
    return _find(this.props.players, (p) => p.id == id);
  },

  loadGameData(playerId, days=30) {
    let fbGameDataRef = this.firebase.playerDataForNumDays( playerId, days, (games) => {
      this.setState({
        fetching: false,
        gameData: _sortBy(games, (g) => -g.dateTime),
        fbGameDataRef: fbGameDataRef,
      });
    });
  }

});

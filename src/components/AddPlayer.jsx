import React from 'react';
import { Link } from 'react-router';
import { Icon } from './common/icon';
import { PlayerForm } from './gametable/player-form';
import { Avatar } from './common/avatar';

import { getInitials } from '../utils/utilities';

export const AddPlayer = React.createClass({

  getInitialState() {
    return ({
      playerAdded: false,
      player: false,
      error: false
    });
  },

  componentWillMount() {
    this.firebase = this.props.firebase;
  },

  render() {
    let { authed, leagues } = this.props;
    let { player, playerAdded, error } = this.state;
    let league = this.props.params.leagueName;

    let goTo = player.league || league || false;

    return (
      <div className="AddPlayer">
        <div className="UtilHeader">
          <Link to={ goTo ? `/league/${goTo}` : '/' } className="btn--util-left btn-sm btn btn-default">
           <Icon type="remove" />
            { this.state.playerAdded ? " Done" : " Cancel" }
          </Link>
          <h1 className="headerText">ADD NEW PLAYER</h1>
        </div>

        { authed
          ? <div className="col-md-4 col-md-offset-4">

              { error &&
                <div className="alert bg-danger">
                  There was a problem adding the new player.
                </div>
              }

              { player &&
                <div className="alert border-success">
                  <Avatar src={player.image} alt={player.name} initials={getInitials(player.name)} />
                  {player.name} has been added to <Link to={`/league/${player.league}`}>{player.league} league</Link>.
                  <a className="alert-remove" onClick={() => this.setState({player:false})}><Icon type="remove" /></a>
                </div>
              }

              <PlayerForm submitCallback={this.addNewPlayer} method="add" leagues={leagues} league={league} />
            </div>
          : <p>You must log in.</p>
        }

      </div>
      );
  },

  addNewPlayer(newPlayer) {
    this.firebase.newPlayer(newPlayer, (success) => {
      let newState = success ? { playerAdded: true, player: newPlayer } : {error: true};
      this.setState(newState);
    });
  },
});

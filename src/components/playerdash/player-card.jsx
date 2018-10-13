import React from 'react';
import _u, { getInitials } from '../../utils/utilities.js';
import { TableLine as CardLine } from './table-line';
import { Avatar } from '../common/avatar';
import { Link } from 'react-router'
import 'date-format-lite';

import _time from 'vague-time';

const getStreak = streak => {
  if (streak > 0) {
    if (streak === 1) {
      return '1 win';
    }
    return `${streak} wins`;
  } else if (streak < 0) {
    if (streak === -1) {
      return '1 loss';
    }
    return `${Math.abs(streak)} losses`;
  }
  return '-';
};

export const PlayerCard = React.createClass({

  render() {
    const { name, image, league, score, topScore, wins, losses,
                id, bottomScore, streak, bestStreak, worstStreak, lastPlayed } = this.props;

    return (
        <div className="PlayerCard panel panel-default">
          <table className="table">
            <thead>
              <tr>
                <th colSpan="2">
                  <div className="flex flex-center">
                    <div className="player-avatar-name">
                      <Avatar src={image} initials={ getInitials(name) } className="jumbo"/>
                      <div style={{ fontSize: '24px' }}>{name}</div>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <CardLine title='Rating' value={score} className='hug-right' />
              <CardLine title='Current Streak' value={getStreak(streak)} className='hug-right' />
              <CardLine title='Record' value={`${wins} - ${losses}`} className='hug-right' />
              <CardLine title='Win Percent' value={_u.percentOfPlayerWins(wins, losses)} className='hug-right' />
              { lastPlayed &&
                  <CardLine title='Last Game' value={ _time.get({ to: lastPlayed }) } className='last-played hug-right' />
              }
            </tbody>
          </table>
      </div>
    );
  }
});

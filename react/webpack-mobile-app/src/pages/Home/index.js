import React from 'react';
import { connect } from 'react-redux';
import ViewConfig from '../../components/ViewConfig';
import * as types from '../../constants/actionTypes';

@connect(state => {
  return {

  }
}, (dispatch) => ({
}))
export default class Home extends React.PureComponent {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
  }

  render () {
    return (
      <div>
        <ViewConfig documentTitle={'悦惠赏金联盟'}/>
        saaa
      </div>
    )
  }
}

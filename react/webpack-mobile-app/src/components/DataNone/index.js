import React, { PropTypes } from 'react';

class DataNone extends React.PureComponent {
    constructor (props) {
        super(props);
        this.state = {};
    }
    render () {
        const { dataNoneTxt, marginTop } = this.props;
        return (
            <section className="mod-dataNone" style={{marginTop: marginTop}}>
                <img src="http://img-cows.kkkd.com/Fr_bedtvYG6AXCpNhT6WJ7o6afsq" alt="暂无数据"/>
                <p>{dataNoneTxt}</p>
            </section>
        )
    }
}

export default DataNone;
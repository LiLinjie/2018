import React from 'react';
import PropTypes from 'prop-types';
import { remainParmas } from '../../config';
import { getQuery } from '../utils';
import { concatUrlAndQuery } from '../utils/url';
import { Link as RouterLink } from 'react-router-dom';

class Link extends React.PureComponent {
  static propTypes = {
    ...RouterLink.propTypes,
    onlyActiveOnIndex: PropTypes.bool
  };
  static defaultProps = {
    onlyActiveOnIndex: true
  };

  getTargetQuery = () => {
    let targetQuery = {};
    const { location } = this.context.router.route;
    const urlQuery = getQuery(location);
    remainParmas.forEach(param => {
      urlQuery[param] && (targetQuery[param] = urlQuery[param]);
    });
    return targetQuery;
  }

  getRealLink = () => {
    const { to, query = {} } = this.props;
    if (!to) {
      return 'javascript:;';
    }
    let targetQuery = {...query, ...this.getTargetQuery()};

    return concatUrlAndQuery(to, targetQuery);
  }

  linkHref = (e) => {
    e.preventDefault();
    const { to, query = {} } = this.props;

    if (to && to.indexOf('http') > -1) {
      let targetQuery = {...query, ...this.getTargetQuery()};
      const url = concatUrlAndQuery(to, targetQuery);
      window.location.href = url;
    }
  }

  render () {
    const { to, children, className: classNames, handleClick } = this.props;
    const noLite = 1;
    let liteProps = {};
    if (noLite) {
      liteProps.target = '_self';
    }
    if (to) {
      if (to.indexOf('http') > -1) {
        return (
          <a className={classNames} href={to}>{children}</a>
        )
      } else {
        return (
          <RouterLink {...liteProps} {...this.props} to={this.getRealLink()} />
        )
      }
    } else {
      return (
        <section>{children}</section>
      );
    }
  }
}

Link.contextTypes = {
  router: PropTypes.object,
};

export default Link;

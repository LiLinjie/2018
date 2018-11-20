import { getSetting } from '../../config';
import { UC } from '../constants/api';
import { post, get } from '../utils/request';

export function getWebOAuthUrl ({
  appId,
  domain,
  qunId,
  oauthPlatform = 'cloud',
  callbackUrl,
  redirectUri = window.location.href,
}) {
  const redirectServerUri = getSetting('redirectServerUri');
  const state = getSetting('oauthState');

  redirectUri = redirectUri.replace(/&/g, '--');
  redirectUri += `&domain=${domain}&qunId=${qunId}&oauthPlatform=${oauthPlatform}`;

  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}` +
    `&redirect_uri=${encodeURIComponent(redirectServerUri + '?referer=' + redirectUri)}` +
    `&response_type=code&scope=snsapi_userinfo&state=${encodeURIComponent(state)}#wechat_redirect`;
}

export function getUser () {
  return post(UC.USER_INFO);
}

function wxAsync ({ api, params = {} }) {
  return new Promise((resolve, reject) => {
    wx[api]({
      ...params,
      success: (apiRes) => {
        if (apiRes.errMsg === api + ':ok') {
          resolve(apiRes);
        } else {
          reject(apiRes);
        }
      },
      fail: (e) => {
        reject(e);
      }
    });
  });
}

export default wxAsync;

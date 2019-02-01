export default {
  mobile: state => state.tokenTypes.mbTokenType.jwtInfo.jti,
  fontRate: state => state.fontRate,
  delegate: state => state.delegate,
  code: state => state.code,
  mbTokenType: state => state.tokenTypes.mbTokenType,
  cardId: state => state.cardId,
  initUrl: state => state.initUrl,
};

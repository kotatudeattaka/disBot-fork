/**
 * [ここ](https://qiita.com/tawatawa/items/c458f76ff364bf9f5781#%E3%81%8A%E3%81%BE%E3%81%91) から引用しました
 * 
 * Array.prototype.forEachで非同期callbackがうまく稼働しないことについては、以下を参照してください
 * @link https://qiita.com/tawatawa/items/c458f76ff364bf9f5781
 * 
 * Array.protype.forEachAsyncの引数(parameter)や返値(return)については、以下を参照してください
 * @link https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#%E5%BC%95%E6%95%B0
 */

/**
 * Array.protype.forEachAsync: 非同期型forEach
 * @author https://github.com/tawaship
 * 
 * @param { Array<any> } array
 * @param { (value: any, index: number, array: any[]) => Promise<any> } callback
 * @returns { Promise<undefined> }
 * 
 */

export const forEachAsync = async function(array, callback, thisArg) {
  const promises = [];
  array.forEach(function(...args) {
    promises.push(callback.call(array, ...args));
  }, thisArg);
  await Promise.all(promises);

  return undefined;
}
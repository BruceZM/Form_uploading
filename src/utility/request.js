
//全局路径测试
//const commonUrl = 'http://htwapapi.local.com/'

//全局路径正式
const commonUrl = 'https://twx.yijiahaohuo.com/?service='
//解析json
function parseJSON(response){
  return response.json()
}
//检查请求状态
function checkStatus(response){
  if(response.status >= 200 && response.status < 500){
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}
//封装请求
function request(options){
  //console.log(options)
  const {url} = options;
  delete options.url;
  //options.mode = 'no-cors';
  //options.credentials = 'include';
  options.headers = {
    'Accept': 'application/json', 
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' 
  }
  return fetch(commonUrl + url,options)
    .then(checkStatus)
    .then(parseJSON)
    .catch(err=>({err}))
}
export {
  request
}
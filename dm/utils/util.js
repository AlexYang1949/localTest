const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var post = function(req) {
  
  wx.request({
    url: 'https://www.witcat.cn/' + req.url,
    data: req.data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function(res){
      console.log(res)
      req.success(res)
    } ,
    fail : function(res){
      console.log(res)
      req.fail(res)
    },
    complete: req.complete
  })
}


module.exports = {
  formatTime: formatTime,
  post : post
}



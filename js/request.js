// 发请求: 到请求的地址属于变化量
// 参数1: 接受传入的url地址  -- 请求地址/接口地址
const get = (url, callback) => {
	const xhr = new XMLHttpRequest()
	xhr.open('GET', url)
	xhr.onload = () => {
		const data = JSON.parse(xhr.response)
		// console.log(data)
		// 触发回调函数,把请求到的数据,传入函数
		callback(data)
	}
	xhr.send()
}
// // 参数1: 接受传入的url地址  -- 请求地址/接口地址
// // 参数2: 回调函数,接受请求完毕后 得到数据
// get(url, (data) => {
// 	console.log('data', data)
// })

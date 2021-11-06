import $C from './config.js'
export default {
	common: {
		method: 'GET',
		header: {
			'content-type': "application/json"
		},
		data: {}
	},
	
	request(options = {}) {
		options.url = $C.webUrl + '/postclass';
		options.method = this.common.method;
		options.header = this.common.header;
		return uni.request(options);
	},
	
	get(url,data = {},option = {}) {
		options.url = url;
		options.data = data;
		options.method = 'GET';
		return uni.request(options);
	}
}
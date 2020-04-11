// 根据用户信息，返回跳转地址
export function getRedirectPath ({ type, avatar }) {
    let url = (type === 'boss') ? '/boss' : '/genius'
    // user.type   /boss /genius
	// user.avatar /bossinfo /geniusinfo 
    if (!avatar) {
        url += 'info'
    }
    return url
}
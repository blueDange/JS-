const axios = {
    get(url) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest()
            xhr.open('GET', url)
            xhr.send(JSON.stringify())
            xhr.onload = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve(JSON.parse(xhr.response))
                } else {
                    reject(xhr.responseText)
                }
            }
        })
    },
    post() {

    },
}


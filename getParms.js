export default function getParameters() {
    let params = window.location.search.substring(1).split(" ");
    console.log(params);
    let obj = {}
    let param
    let i

    for (i in params) {
        if (params[i] === "") continue;
        param = params[i].split("=");
        obj[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
        console.log(obj);
    }

    return obj;
}

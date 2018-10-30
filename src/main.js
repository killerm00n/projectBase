import "./style.css"
const a = 1;
document.body.innerHTML += '2';
if(ENV == "development"){
    console.log("开发模式！")
}else{
    console.log("生产模式")
}
// export default function(){
//     console.log("the answer is 2" + a);
// }
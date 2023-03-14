const getArgs=(args)=>{
  const res={}
  const [executer, file, ...rest] = args
  rest.forEach((el, i, arr) => {
    if (el.charAt(0) == '-') {
      if (i==arr.length-1) {
        res[el.substring(1)] = true
      } else if (arr[i+1].charAt(0) != '-'){
        res[el.substring(1)] = arr[i+1]
      } else{
        res[el.substring(1)] = true
      }
    }
  });
  return res
}


export default getArgs
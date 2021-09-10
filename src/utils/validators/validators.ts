export const required = (value:any)=>{
 if (value) return undefined
 return 'Field is requred'
}

export const maxLengthCreator=(maxLength:any) => (value:any)=>{
 if (value && value.length > maxLength ) return `Max length is ${maxLength} symbol`
 return undefined
}

export const minLength1 = (value:any)=>{
 if (value && value.length <1 ) return 'Min length is 2 symbol'
 return undefined
}

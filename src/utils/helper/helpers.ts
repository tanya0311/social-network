import { UsersPropsType } from "../../redux/users-reducer"

export const updateObjInArray = (items: Array<UsersPropsType>, itemsId:  number, objPropName: string, newObjPropName: {}) => {
   return items.map((u: any) => u[objPropName] === itemsId ? {...u, ...newObjPropName} : u)
}
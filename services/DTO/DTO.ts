const DTO = (data : any) => {

    let formatedData : any = []

    data.map( (item : any) => {
        if (!item.User) {
            return item
        }
        let newItem = item.get({ plain: true })

        Object.assign(newItem, newItem.User)
        delete newItem['User']
        delete newItem['password']

        formatedData.push(newItem)
    })


    console.log(formatedData)
    
    return !formatedData.length ? data : formatedData 
}

const DTObyPK = (item: any) => {
    if (!item.User) {
            
        console.log('No User in this data')
        return item
    }
    let newItem = item.get({ plain: true })

    Object.assign(newItem, newItem.User)
    delete newItem['User']
    delete newItem['password']

    return newItem
}

module.exports = {
    DTO,
    DTObyPK
}
const DTO_ifier = (item : any) => {
    if (!item.User) {
        return item
    }
    let newItem = item.get({ plain: true })

    Object.assign(newItem, newItem.User)
    delete newItem['User']
    delete newItem['password']

    return newItem
}

const DTO = (data : any) => {

    // Pardon pour ce qui suit
    if ( !data.length ) return DTO_ifier(data)

    let formatedData : any = []

    data.map( (item : any) => {
        formatedData.push(DTO_ifier(item))
    })

    return !formatedData.length ? data : formatedData 
}

module.exports = {
    DTO
}
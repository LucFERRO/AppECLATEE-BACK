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

    if ( !data.length ) return DTO_ifier(data)

    return data.map( (item : any) => {
        return DTO_ifier(item)
    })
}

// Faire une fonction pour le all et une pour le singleton

module.exports = {
    DTO
}
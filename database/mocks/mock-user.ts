const users = [
    {
        mail: "luc@f.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur merde",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: true,
        is_pending: false,
        role: "candidat",
        availabilities: ['Noël', 'Juillet', 'Août'],
        degrees: ['DEV WEB LOL'],
        description: 'best front-end EUW',
        avatar: '///'
    },
    {
        mail: "remy@c.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur merde",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: true,
        is_pending: false,
        role: "admin",
        availabilities: ['Noël'],
        description: 'best back-end EUW',
        avatar: '///'
    },
    {
        mail: "pending@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur merde",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: true,
        role: "candidat",
        availabilities: ['Noël'],
        avatar: '///'
    },
    {
        mail: "ghedeon@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur merde",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        is_to_be_completed: true,
        role: "candidat",
        availabilities: ['Noël'],
        avatar: '///'
    },
    {
        mail: "test1@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur merde",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "entreprise",
        availabilities: ['Noël'],
        avatar: '///'
    },
    {
        mail: "test2@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur merde",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: true,
        is_pending: false,
        role: "admin",
        availabilities: ['Noël'],
        avatar: '///'
    },
    {
        mail: "test3@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur merde",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "candidat",
        availabilities: ['Noël'],
        avatar: '///'
    },
    {
        mail: "test4@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur merde",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "candidat",
        availabilities: ['Noël'],
        avatar: '///'
    },
    {
        mail: "test5@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur merde",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "entreprise",
        availabilities: ['Noël'],
        avatar: '///'
    },
    {
        mail: "test6@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur merde",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "candidat",
        availabilities: ['Noël'],
        avatar: '///'
    },
    {
        mail: "test7@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur merde",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "entreprise",
        availabilities: ['Noël'],
        avatar: '///'
    },
    {
        mail: "test8@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur merde",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "candidat",
        availabilities: ['Noël'],
        avatar: '///'
    },
    {
        mail: "test9@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur merde",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "entreprise",
        availabilities: ['Noël'],
        avatar: '///'
    },
    {
        mail: "test10@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur merde",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "candidat",
        availabilities: ['Noël'],
        avatar: '///'
    },
    {
        mail: "test11@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur merde",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "candidat",
        availabilities: ['Noël'],
        avatar: '///'
    },
    {
        mail: "test12@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur merde",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "candidat",
        availabilities: ['Noël'],
        avatar: '///'
    },
    {
        mail: "test13@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur merde",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "candidat",
        availabilities: ['Noël'],
        avatar: '///'
    },
    {
        mail: "test14@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur merde",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "candidat",
        availabilities: ['Noël'],
        avatar: '///'
    },
    {
        mail: "test15@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur merde",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "candidat",
        availabilities: ['Noël'],
        avatar: '///'
    },
];

module.exports = users;

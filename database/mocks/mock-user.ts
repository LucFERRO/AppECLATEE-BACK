const users = [
    {
        user_id: 1,
        mail: "luc@f.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur mer",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: true,
        is_pending: false,
        role: "candidat",
        description: 'best front-end EUW',
        avatar: '///'
    },
    {
        user_id: 2,
        mail: "remy@c.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur mer",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: true,
        is_pending: false,
        role: "admin",
        description: 'best back-end EUW',
        avatar: '///'
    },
    {
        user_id: 3,
        mail: "pending@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur mer",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: true,
        role: "candidat",
        avatar: '///'
    },
    {
        user_id: 4,
        mail: "ghedeon@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur mer",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        is_to_be_completed: true,
        role: "candidat",
        avatar: '///'
    },
    {
        user_id: 5,
        mail: "test1@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur mer",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "entreprise",
    },
    {
        user_id: 6,
        mail: "test2@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur mer",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: true,
        is_pending: false,
        role: "admin",
    },
    {
        user_id: 7,
        mail: "test3@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur mer",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "candidat",
    },
    {
        user_id: 8,
        mail: "test4@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur mer",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "candidat",
    },
    {
        user_id: 9,
        mail: "test5@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur mer",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "entreprise",
        avatar: '///'
    },
    {
        user_id: 10,
        mail: "test6@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur mer",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "candidat",
        avatar: '///'
    },
    {
        user_id: 11,
        mail: "test7@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur mer",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "entreprise",
        avatar: '///'
    },
    {
        user_id: 12,
        mail: "test8@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur mer",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "candidat",
        avatar: '///'
    },
    {
        user_id: 13,
        mail: "test9@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur mer",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "entreprise",
        avatar: '///'
    },
    {
        user_id: 14,
        mail: "test10@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur mer",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "candidat",
        avatar: '///'
    },
    {
        user_id: 15,
        mail: "test11@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur mer",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "candidat",
        avatar: '///'
    },
    {
        user_id: 16,
        mail: "test12@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur mer",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "candidat",
        avatar: '///'
    },
    {
        user_id: 17,
        mail: "test13@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur mer",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "candidat",
        avatar: '///'
    },
    {
        user_id: 18,
        mail: "test14@n.fr",
        password:
            "$2b$10$6ntskVqohGuZOXkdwvyz1.iXi8MeWEG2MIbWoz4aEvgByyJEbM7Pe",
        zip_code: "62200",
        city: "Boulogne sur mer",
        phone_number: "0123456789",
        address: "9 rue Test de la chaudière",
        is_active: false,
        is_pending: false,
        role: "candidat",
        avatar: '////'
    }
];

module.exports = users;

const users = [
  {
    mail: 'luc@f.fr',
    password: '$2b$10$dNBOm5ogx7rFaNDYY.sh2.uLL/9KrG54G5NB.N9t4DfImwwPtRRuK',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: true,
    is_pending: false,
    role: 'candidat'
  },
  {
    mail: 'remy@c.fr',
    password: '$2b$10$dNBOm5ogx7rFaNDYY.sh2.uLL/9KrG54G5NB.N9t4DfImwwPtRRuK',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: true,
    is_pending: false,
    role: 'entreprise'
  },  
  {
    mail: 'pending@n.fr',
    password: '$2b$10$dNBOm5ogx7rFaNDYY.sh2.uLL/9KrG54G5NB.N9t4DfImwwPtRRuK',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: false,
    is_pending: true,
    role: 'candidat'
  },
  {
    mail: 'ghedeon@n.fr',
    password: '$2b$10$dNBOm5ogx7rFaNDYY.sh2.uLL/9KrG54G5NB.N9t4DfImwwPtRRuK',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: false,
    is_pending: false,
    role: 'candidat'
  },
  {
    mail: 'test1@n.fr',
    password: '$2b$10$dNBOm5ogx7rFaNDYY.sh2.uLL/9KrG54G5NB.N9t4DfImwwPtRRuK',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: false,
    is_pending: false,
    role: 'candidat'
  },
  {
    mail: 'test2@n.fr',
    password: '$2b$10$dNBOm5ogx7rFaNDYY.sh2.uLL/9KrG54G5NB.N9t4DfImwwPtRRuK',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: false,
    is_pending: false,
    role: 'candidat'
  },
  {
    mail: 'test3@n.fr',
    password: '$2b$10$dNBOm5ogx7rFaNDYY.sh2.uLL/9KrG54G5NB.N9t4DfImwwPtRRuK',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: false,
    is_pending: false,
    role: 'candidat'
  },
  {
    mail: 'test4@n.fr',
    password: '$2b$10$dNBOm5ogx7rFaNDYY.sh2.uLL/9KrG54G5NB.N9t4DfImwwPtRRuK',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: false,
    is_pending: false,
    role: 'candidat'
  },
  {
    mail: 'test5@n.fr',
    password: '$2b$10$dNBOm5ogx7rFaNDYY.sh2.uLL/9KrG54G5NB.N9t4DfImwwPtRRuK',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: false,
    is_pending: false,
    role: 'candidat'
  },
  {
    mail: 'test6@n.fr',
    password: '$2b$10$dNBOm5ogx7rFaNDYY.sh2.uLL/9KrG54G5NB.N9t4DfImwwPtRRuK',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: false,
    is_pending: false,
    role: 'candidat'
  },
  {
    mail: 'test7@n.fr',
    password: '$2b$10$dNBOm5ogx7rFaNDYY.sh2.uLL/9KrG54G5NB.N9t4DfImwwPtRRuK',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: false,
    is_pending: false,
    role: 'candidat'
  },
  {
    mail: 'test8@n.fr',
    password: '$2b$10$dNBOm5ogx7rFaNDYY.sh2.uLL/9KrG54G5NB.N9t4DfImwwPtRRuK',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: false,
    is_pending: false,
    role: 'candidat'
  },
  {
    mail: 'test9@n.fr',
    password: '$2b$10$dNBOm5ogx7rFaNDYY.sh2.uLL/9KrG54G5NB.N9t4DfImwwPtRRuK',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: false,
    is_pending: false,
    role: 'candidat'
  },
  {
    mail: 'test10@n.fr',
    password: '$2b$10$dNBOm5ogx7rFaNDYY.sh2.uLL/9KrG54G5NB.N9t4DfImwwPtRRuK',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: false,
    is_pending: false,
    role: 'candidat'
  },
  {
    mail: 'test11@n.fr',
    password: '$2b$10$dNBOm5ogx7rFaNDYY.sh2.uLL/9KrG54G5NB.N9t4DfImwwPtRRuK',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: false,
    is_pending: false,
    role: 'candidat'
  },
  {
    mail: 'test12@n.fr',
    password: '$2b$10$dNBOm5ogx7rFaNDYY.sh2.uLL/9KrG54G5NB.N9t4DfImwwPtRRuK',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: false,
    is_pending: false,
    role: 'candidat'
  },
  {
    mail: 'test13@n.fr',
    password: '$2b$10$dNBOm5ogx7rFaNDYY.sh2.uLL/9KrG54G5NB.N9t4DfImwwPtRRuK',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: false,
    is_pending: false,
    role: 'candidat'
  },
{
mail: 'test14@n.fr',
password: '$2b$10$dNBOm5ogx7rFaNDYY.sh2.uLL/9KrG54G5NB.N9t4DfImwwPtRRuK',
zip_code: '62200',
city: 'Boulogne sur merde',
phone_number: '01 23 45 67 89',
is_active: false,
is_pending: false,
role: 'candidat'
},
{
mail: 'test15@n.fr',
password: '$2b$10$dNBOm5ogx7rFaNDYY.sh2.uLL/9KrG54G5NB.N9t4DfImwwPtRRuK',
zip_code: '62200',
city: 'Boulogne sur merde',
phone_number: '01 23 45 67 89',
is_active: false,
is_pending: false,
role: 'candidat'
},
];

module.exports = users;

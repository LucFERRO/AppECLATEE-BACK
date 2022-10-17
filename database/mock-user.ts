const users = [
  {
    mail: 'luc@f.fr',
    password: '1234',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: true,
    is_pending: false,
    role: 'candidat'
  },
  {
    mail: 'remy@c.fr',
    password: '1234',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: true,
    is_pending: false,
    role: 'entreprise'
  },  
  {
    mail: 'pending@n.fr',
    password: '1234',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: false,
    is_pending: true,
    role: 'candidat'
  },
  {
    mail: 'ghedeon@n.fr',
    password: '1234',
    zip_code: '62200',
    city: 'Boulogne sur merde',
    phone_number: '01 23 45 67 89',
    is_active: false,
    is_pending: false,
    role: 'candidat'
  },
];

module.exports = users;

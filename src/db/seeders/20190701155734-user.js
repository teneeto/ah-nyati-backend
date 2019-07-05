module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    firstName: 'John',
    lastName: 'Doe',
    userName: 'JohnDoe',
    email: 'john.doe@andela.com',
    bio: 'local man is stuck in traffic',
    isVerified: true,
    password: 'password',
    verificationToken: '',
    imageUrl: 'image.png'
  }, {
    firstName: 'Cavdy',
    lastName: 'Ghost',
    email: 'cavdyofficials@gmail.com',
    bio: '#ghost',
    isVerified: true,
    password: 'password',
    verificationToken: '',
    imageUrl: 'image.png'
  }, {
    firstName: 'John',
    lastName: 'Doe',
    userName: 'JohnDoe',
    email: 'john.doe2@andela.com',
    bio: 'local man is stuck in traffic',
    isVerified: true,
    password: 'password',
    verificationToken: '',
    imageUrl: 'image.png'
  }
  ], {}),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};

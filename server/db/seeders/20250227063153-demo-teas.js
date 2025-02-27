'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Teas', [ 
      {
        name: 'Дарджилинг',
        cultivationPlace: 'Индия, Дарджилинг',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Tea_Estate%2C_Darjeeling.jpg/1600px-Tea_Estate%2C_Darjeeling.jpg',
        description: 'Чёрный чай с мускатным вкусом.',
        userId:1,
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      {
        name: 'Ассам',
        cultivationPlace: 'Индия, Ассам',
        image: 'https://besttea.ru/images/watermarked/1/detailed/40/BT-6040_09.jpg',
        description: 'Крепкий чёрный чай с солодовым вкусом.',
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Эрл Грей',
        cultivationPlace: 'Китай',
        image: 'https://avatars.mds.yandex.net/i?id=aa50b7bfdf036f6f0d14e2616ce13f0c_l-5288174-images-thumbs&n=13',
        description: 'Чёрный чай с добавлением масла бергамота.',
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Зелёный чай Сенча',
        cultivationPlace: 'Япония',
        image: 'https://avatars.mds.yandex.net/get-mpic/4901709/img_id1340665318999367679.jpeg/orig',
        description: 'Зелёный чай с травянистым вкусом.',
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Белый чай Бай Му Дань',
        cultivationPlace: 'Китай, Фуцзянь',
        image: 'https://avatars.mds.yandex.net/i?id=8e7871c28f05698b48237a1aad197f32_l-5224088-images-thumbs&n=13',
        description: 'Белый чай с нежным цветочным вкусом.',
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Улун Те Гуань Инь',
        cultivationPlace: 'Китай, Фуцзянь',
        image: 'https://avatars.mds.yandex.net/get-mpic/4079169/img_id8844441282345000008.jpeg/orig',
        description: 'Улун с орхидейным ароматом.',
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
       {
        name: 'Пуэр',
        cultivationPlace: 'Китай, Юньнань',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/%22Da_Yi_Gong_Tuo%22_Pu-erh_shou_cha%2C_2010.jpg/1600px-%22Da_Yi_Gong_Tuo%22_Pu-erh_shou_cha%2C_2010.jpg',
        description: 'Ферментированный чай с землистым вкусом.',
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ройбуш',
        cultivationPlace: 'Южная Африка',
        image: 'https://avatars.mds.yandex.net/get-mpic/3732535/img_id3221197829577514487.jpeg/orig',
        description: 'Травяной чай с сладковатым вкусом.',
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Маття',
        cultivationPlace: 'Япония',
        image: 'https://avatars.mds.yandex.net/i?id=10733f065d7d7559fbb4b6b0eba0ac08_l-4825952-images-thumbs&n=13',
        description: 'Порошковый зелёный чай для чайной церемонии.',
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Жасминовый чай',
        cultivationPlace: 'Китай',
        image: 'https://cdn1.ozone.ru/s3/multimedia-w/6558723344.jpg',
        description: 'Зелёный чай с ароматом жасмина.',
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Лапсанг Сушонг',
        cultivationPlace: 'Китай, Фуцзянь',
        image: 'https://avatars.mds.yandex.net/i?id=a29262fe2ffb7d2c36be717d4c119347_l-5876563-images-thumbs&n=13',
        description: 'Копчёный чёрный чай.',
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Габа Чай',
        cultivationPlace: 'Тайвань',
        image: 'https://avatars.mds.yandex.net/i?id=579f1a4749e523e4674ee972fbd89796_l-7662747-images-thumbs&n=13',
        description: 'Чай, богатый гамма-аминомасляной кислотой (GABA).',
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Хуан Шань Мао Фэн',
        cultivationPlace: 'Китай, Аньхой',
        image: 'https://avatars.mds.yandex.net/i?id=86087c719812ff38e68709323b5a13fd397dfe6e-8497168-images-thumbs&n=13',
        description: 'Зеленый чай с гор Хуаншань.',
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Спирулина Чай',
        cultivationPlace: 'Япония',
        image: 'https://evitamin.uz/uploads/dle_seo/cat/270.jpg',
        description: 'Чай из спирулины.',
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Мята перечная',
        cultivationPlace: 'Египет',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Mentha_x_piperita_002.JPG/640px-Mentha_x_piperita_002.JPG',
        description: 'Травяной чай из мяты перечной.',
        userId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },


    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Teas', null, {}); 
  }
};
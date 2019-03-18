var natural = require('natural');
var classifier = new natural.BayesClassifier();

classifier.addDocument('id', 'apakah produk ini ada', 'tanya.produk');
classifier.addDocument('id', 'produk apa saja yang ada', 'tanya.produk');
classifier.addDocument('id', 'apakah ada produk warna ini', 'tanya.produk');

classifier.addDocument('id', 'baju ini masih ada ga', 'tanya.stock');
classifier.addDocument('id', 'produk ini masih ada tidak', 'tanya.stock');
classifier.addDocument('id', 'baju ini masih stocknya masih adakah', 'tanya.stock');
classifier.addDocument('id', 'apakah produk ini masih ada', 'tanya.stock');

classifier.addDocument('id', 'produk yang lagi promo apa ya', 'tanya.discount');
classifier.addDocument('id', 'yang lagi discount apa ya', 'tanya.discount');
classifier.addDocument('id', 'tampil produk yang diskon', 'tanya.discount');
classifier.addDocument('id', 'produk yang diskon apa', 'tanya.discount');
classifier.addDocument('id', 'apakah ada promo hari ini', 'tanya.discount');

classifier.train();
console.log(classifier.getClassifications('produk yang diskon'));

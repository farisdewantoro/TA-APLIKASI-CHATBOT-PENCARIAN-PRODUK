// var natural = require('natural');

const { NlpUtil,NerManager,NlpManager,NlpClassifier,BayesClassifier, } = require('node-nlp');
const Stemmerr = NlpUtil.getStemmer('id');
const tokenizer=NlpUtil.getTokenizer('id');

async function main() {
    const bayes = new BayesClassifier;
    const manager = new NlpManager({
        languages: ['id'],
        useNeural: true,
        // classifier:bayes
    });
   
    manager.addNamedEntityText(
        'produk',
        'baju',
        ['id'],
        ['FADE', 'ZEUS', 'DEFENDER']
    );
    manager.addNamedEntityText(
        'produk',
        'warna',
        ['id'],
        ['merah', 'biru', 'kuning']
    );
    manager.addNamedEntityText(
        'produk',
        'kategori',
        ['id'],
        ['baju', 'celana', 'jeans']
    );
    manager.addNamedEntityText(
        'produk',
        'size',
        ['id'],
        ['m', 's', 'l']
    );
    manager.addNamedEntityText(
        'produk',
        'jeans',
        ['id'],
        ['denim', 'bootcut', 'longsort']
    );
    manager.addNamedEntityText(
        'brand',
        'baju',
        ['id'],
        ['h&m', 'bershka', 'pmp']
    );
    manager.addNamedEntityText(
        'produk',
        ['jacket'],
        ['id'],
        ['pullover', 'hoodie']
    );
    manager.addNamedEntityText(
        'action',
        ['discount'],
        ['id'],
        ['diskon', 'discount','promo']
    );
    manager.addNamedEntityText(
        'action',
        ['pencarian'],
        ['id'],
        ['cari', 'search', 'temukan']
    );

 
  
    manager.addDocument('id', 'produk brand', 'info.produk');
    manager.addDocument('id', 'produk warna', 'info.produk');
    manager.addDocument('id', 'produk size', 'info.produk');
    manager.addDocument('id', 'produk kategori', 'info.produk');
  
    manager.addDocument('id', 'apakah produk ini ada', 'tanya.produk');
    manager.addDocument('id', 'produk apa saja yang ada', 'tanya.produk');
    manager.addDocument('id', 'saya mencari produk', 'tanya.produk');
    manager.addDocument('id', 'apakah ada produk warna ini', 'tanya.produk');

    manager.addDocument('id', 'baju ini masih ada ga', 'tanya.stock');
    manager.addDocument('id', 'produk ini masih ada tidak', 'tanya.stock');
    manager.addDocument('id', 'baju ini masih stocknya masih adakah', 'tanya.stock');
    manager.addDocument('id', 'apakah produk ini masih ada', 'tanya.stock');

    manager.addDocument('id', 'produk yang lagi promo apa ya', 'tanya.discount');
    manager.addDocument('id', 'yang lagi discount apa ya', 'tanya.discount');
    manager.addDocument('id', 'tampil produk yang diskon', 'tanya.discount');
    manager.addDocument('id', 'produk yang diskon apa', 'tanya.discount');
    manager.addDocument('id', 'apakah ada promo hari ini', 'tanya.discount');

    manager.addAnswer('id', 'tanya.discount', "produk yang promo hari ini");
    manager.addAnswer('id', 'tanya.discount', "ini list produk yang lagi diskon");
    manager.addAnswer('id', 'tanya.discount', "hasil produk yang sedang discount");

    manager.addAnswer('id', 'tanya.produk', "ini merupakan informasi produk");
    manager.addAnswer('id', 'tanya.produk', "produk yang anda maksud");
    manager.addAnswer('id', 'tanya.produk', "hasil produk yang anda cari");

    manager.addAnswer('id', 'tanya.stock', "ini stock yang tersedia");
    manager.addAnswer('id', 'tanya.stock', "hasil pencarian stock produk");
    
    manager.addAnswer('id', 'info.produk', "informasi produk berdasarkan warna");
    manager.addAnswer('id', 'info.produk', "informasi produk berdasarkan size");
    manager.addAnswer('id', 'info.produk', "informasi produk berdasarkan brand");
    manager.addAnswer('id', 'info.produk', "informasi produk berdasarkan brand {{brand}} dan warna");
    await manager.train();
    
    const result = await manager.process('id','saya mencari produk yang sedang diskon hari ini apakah ada ?');
    return result;
}
main().then(res=>{
    console.log(res);
   return res;
});



// async function main() {
//     const bayes = new BayesClassifier;
//     const manager = new NlpManager({
//         languages: ['id'],
//         useNeural: true,
//         // classifier:bayes
//     });

//     // manager.addNamedEntityText(
//     //     'sakit',
//     //     'baju',
//     //     ['id'],
//     //     ['FADE', 'ZEUS', 'DEFENDER']
//     // );
//     // manager.addNamedEntityText(
//     //     'produk',
//     //     'warna',
//     //     ['id'],
//     //     ['merah', 'biru', 'kuning']
//     // );
//     // manager.addNamedEntityText(
//     //     'produk',
//     //     'kategori',
//     //     ['id'],
//     //     ['baju', 'celana', 'jeans']
//     // );
//     // manager.addNamedEntityText(
//     //     'produk',
//     //     'size',
//     //     ['id'],
//     //     ['m', 's', 'l']
//     // );
//     // manager.addNamedEntityText(
//     //     'produk',
//     //     'jeans',
//     //     ['id'],
//     //     ['denim', 'bootcut', 'longsort']
//     // );
//     // manager.addNamedEntityText(
//     //     'brand',
//     //     'baju',
//     //     ['id'],
//     //     ['h&m', 'bershka', 'pmp']
//     // );
//     // manager.addNamedEntityText(
//     //     'produk',
//     //     ['jacket'],
//     //     ['id'],
//     //     ['pullover', 'hoodie']
//     // );
//     // manager.addNamedEntityText(
//     //     'action',
//     //     ['discount'],
//     //     ['id'],
//     //     ['diskon', 'discount', 'promo']
//     // );
//     // manager.addNamedEntityText(
//     //     'action',
//     //     ['pencarian'],
//     //     ['id'],
//     //     ['cari', 'search', 'temukan']
//     // );



//     manager.addDocument('id', 'kok kerasanya pusing ya', 'sakit');
//     manager.addDocument('id', 'badan panas panas', 'sakit');
//     manager.addDocument('id', 'kerasanya lemes', 'sakit');
//     manager.addDocument('id', 'badan pegel pegel', 'sakit');

//     manager.addDocument('id', 'badan ringan', 'sehat');
//     manager.addDocument('id', 'tubuh segar', 'sehat');
//     manager.addDocument('id', 'nafas lega', 'sehat');
//     manager.addDocument('id', 'badan fresh', 'sehat');
//     await manager.train();
//     const result = await manager.process('id', 'ga enak badan nih');
//     return result;
// }
// main().then(res => {
//     console.log(res);
//     return res;
// });
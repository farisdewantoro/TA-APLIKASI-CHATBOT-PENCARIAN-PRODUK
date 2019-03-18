const fs = require('fs');

module.exports = async function trainnlp(manager, say) {
    // if (fs.existsSync('./model.nlp')) {
    //     manager.load('./model.nlp');
    //     return;
    // }


    manager.addNamedEntityText(
        'produk',
        'baju',
        ['id'],
        ['FADE', 'ZEUS', 'DEFENDER']
    );
    manager.addNamedEntityText(
        'produkVariant',
        'warna',
        ['id'],
        ['merah', 'biru', 'kuning']
    );
    manager.addNamedEntityText(
        'produkKategori',
        'nama',
        ['id'],
        ['baju', 'celana', 'jeans']
    );
    manager.addNamedEntityText(
        'produkVariant',
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
        ['diskon', 'discount', 'promo']
    );
    manager.addNamedEntityText(
        'action',
        ['pencarian'],
        ['id'],
        ['cari', 'search', 'temukan']
    );

    const fromEntity = manager.addTrimEntity('cariProdukNama');
    fromEntity.addBetweenCondition('id', 'produk', 'dengan');
    fromEntity.addAfterLastCondition('id', 'produk');

    const fromEntityWarna = manager.addTrimEntity('cariProductWarna');
    fromEntityWarna.addBetweenCondition('id', 'warna', 'dong');
    fromEntityWarna.addAfterLastCondition('id', 'warna');

    // manager.slotManager.addSlot('info.action', 'action', true, { id: 'action tidak diketahui' });
    // manager.slotManager.addSlot('info.action', 'produk', true, { id: 'tolong sebutkan nama produknya' });
    // manager.slotManager.addSlot('info.action', 'produkVariant', true, { id: 'produk warna apa ?' });

    manager.addDocument('id', 'produk %brand%', 'info.produk');
    manager.addDocument('id', 'produk %warna%', 'info.produk');
    manager.addDocument('id', 'produk %size%', 'info.produk');
    manager.addDocument('id', 'produk %kategori%', 'info.produk');

    // manager.addDocument('id', '%action% produk %produk% dengan warna %produkVariant% dong', 'info.action');


    manager.addDocument('id', 'apakah produk ini ada', 'tanya.produk');
    manager.addDocument('id', 'produk apa saja yang ada', 'tanya.produk');
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
    say('Training, please wait..');
    const hrstart = process.hrtime();
    await manager.train();
    const hrend = process.hrtime(hrstart);
    console.info('Trained (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    say('Trained!');

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
    manager.addAnswer('id', 'info.produk', "informasi produk berdasarkan brand size dan warna");
    manager.addAnswer('id', 'info.action', "hasil {{action}} produk {{produk}} dengan warna {{produkVariant}}");

};